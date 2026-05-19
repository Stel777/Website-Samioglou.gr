from __future__ import annotations

import json
import re
import time
import unicodedata
from dataclasses import asdict, dataclass
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
from xml.etree import ElementTree


BASE_URL = "https://www.samioglou.gr/"
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "content_inventory"
RAW_DIR = OUT / "raw_html"
PAGE_DIR = OUT / "pages"
ASSET_DIR = OUT / "downloaded_assets"
USER_AGENT = "Mozilla/5.0 (compatible; SamioglouContentInventory/1.0)"


@dataclass
class ImageRef:
    src: str
    alt: str = ""
    title: str = ""
    downloaded_to: str | None = None


@dataclass
class LinkRef:
    href: str
    text: str = ""
    internal: bool = False


@dataclass
class PageRecord:
    url: str
    sitemap: str | None
    status: int
    final_url: str
    title: str
    meta_description: str
    h1: list[str]
    h2: list[str]
    h3: list[str]
    text: str
    images: list[ImageRef]
    links: list[LinkRef]
    raw_html_file: str
    markdown_file: str


class PageParser(HTMLParser):
    skip_tags = {"script", "style", "noscript", "svg"}
    block_tags = {
        "address",
        "article",
        "aside",
        "blockquote",
        "br",
        "dd",
        "div",
        "dl",
        "dt",
        "figcaption",
        "figure",
        "footer",
        "form",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "header",
        "hr",
        "li",
        "main",
        "nav",
        "ol",
        "p",
        "section",
        "table",
        "td",
        "th",
        "tr",
        "ul",
    }

    def __init__(self, page_url: str) -> None:
        super().__init__(convert_charrefs=True)
        self.page_url = page_url
        self.title = ""
        self.meta_description = ""
        self.canonical = ""
        self.images: list[ImageRef] = []
        self.links: list[LinkRef] = []
        self.headings: dict[str, list[str]] = {"h1": [], "h2": [], "h3": []}
        self._skip_depth = 0
        self._current_tag: str | None = None
        self._current_heading: str | None = None
        self._heading_parts: list[str] = []
        self._in_title = False
        self._link_href: str | None = None
        self._link_parts: list[str] = []
        self._text_parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_map = {key.lower(): value or "" for key, value in attrs}

        if tag in self.skip_tags:
            self._skip_depth += 1
            return

        if self._skip_depth:
            return

        if tag == "title":
            self._in_title = True

        if tag == "meta" and attrs_map.get("name", "").lower() == "description":
            self.meta_description = clean_inline(attrs_map.get("content", ""))

        if tag == "link" and attrs_map.get("rel", "").lower() == "canonical":
            self.canonical = urljoin(self.page_url, attrs_map.get("href", ""))

        if tag == "img":
            src = attrs_map.get("src") or attrs_map.get("data-src") or attrs_map.get("data-lazy-src")
            if src:
                self.images.append(
                    ImageRef(
                        src=urljoin(self.page_url, src),
                        alt=clean_inline(attrs_map.get("alt", "")),
                        title=clean_inline(attrs_map.get("title", "")),
                    )
                )

        if tag == "a":
            href = attrs_map.get("href", "")
            if href and not href.startswith(("#", "javascript:", "mailto:", "tel:")):
                self._link_href = urljoin(self.page_url, href)
                self._link_parts = []

        if tag in self.headings:
            self._current_heading = tag
            self._heading_parts = []

        if tag in self.block_tags:
            self._text_parts.append("\n")

        self._current_tag = tag

    def handle_endtag(self, tag: str) -> None:
        if tag in self.skip_tags and self._skip_depth:
            self._skip_depth -= 1
            return

        if self._skip_depth:
            return

        if tag == "title":
            self._in_title = False

        if tag == "a" and self._link_href:
            href = self._link_href
            self.links.append(
                LinkRef(
                    href=href,
                    text=clean_inline(" ".join(self._link_parts)),
                    internal=is_internal_url(href),
                )
            )
            self._link_href = None
            self._link_parts = []

        if tag == self._current_heading and self._current_heading:
            text = clean_inline(" ".join(self._heading_parts))
            if text:
                self.headings[self._current_heading].append(text)
            self._current_heading = None
            self._heading_parts = []

        if tag in self.block_tags:
            self._text_parts.append("\n")

    def handle_data(self, data: str) -> None:
        if self._skip_depth:
            return

        text = clean_inline(data)
        if not text:
            return

        if self._in_title:
            self.title += (" " if self.title else "") + text

        if self._current_heading:
            self._heading_parts.append(text)

        if self._link_href:
            self._link_parts.append(text)

        self._text_parts.append(text + " ")

    @property
    def visible_text(self) -> str:
        return clean_block("".join(self._text_parts))


def request_url(url: str) -> tuple[int, str, bytes, str]:
    req = Request(url, headers={"User-Agent": USER_AGENT})
    with urlopen(req, timeout=30) as response:
        status = getattr(response, "status", 200)
        final_url = response.geturl()
        content_type = response.headers.get("content-type", "")
        data = response.read()
        return status, final_url, data, content_type


def fetch_text(url: str) -> str:
    _, _, data, _ = request_url(url)
    return data.decode("utf-8", errors="replace")


def clean_inline(value: str) -> str:
    return re.sub(r"\s+", " ", unescape(value)).strip()


def clean_block(value: str) -> str:
    lines = [clean_inline(line) for line in value.splitlines()]
    lines = [line for line in lines if line]
    deduped: list[str] = []
    for line in lines:
        if not deduped or deduped[-1] != line:
            deduped.append(line)
    return "\n".join(deduped)


def slugify_url(url: str) -> str:
    parsed = urlparse(url)
    path = parsed.path.strip("/") or "home"
    value = unicodedata.normalize("NFKD", path)
    value = value.encode("ascii", "ignore").decode("ascii")
    value = re.sub(r"[^a-zA-Z0-9]+", "-", value).strip("-").lower()
    if not value:
        value = "page"
    return value[:90]


def is_internal_url(url: str) -> bool:
    host = urlparse(url).netloc.lower()
    return host in {"www.samioglou.gr", "samioglou.gr", ""}


def sitemap_locations(xml_text: str) -> tuple[list[str], list[str]]:
    root = ElementTree.fromstring(xml_text.encode("utf-8"))
    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    sitemaps = [node.text.strip() for node in root.findall(".//sm:sitemap/sm:loc", namespace) if node.text]
    urls = [node.text.strip() for node in root.findall(".//sm:url/sm:loc", namespace) if node.text]
    return sitemaps, urls


def unique(items: Iterable[str]) -> list[str]:
    seen: set[str] = set()
    result: list[str] = []
    for item in items:
        normalized = item.split("#", 1)[0].strip()
        if normalized and normalized not in seen:
            seen.add(normalized)
            result.append(normalized)
    return result


def write_markdown(record: PageRecord) -> None:
    path = ROOT / record.markdown_file
    headings = []
    for tag in ("h1", "h2", "h3"):
        values = getattr(record, tag)
        if values:
            headings.append(f"{tag.upper()}: " + " | ".join(values))

    image_lines = [
        f"- {image.src}" + (f" | alt: {image.alt}" if image.alt else "") + (f" | local: {image.downloaded_to}" if image.downloaded_to else "")
        for image in record.images
    ]
    link_lines = [
        f"- {link.href}" + (f" | text: {link.text}" if link.text else "")
        for link in record.links
    ]

    content = [
        f"# {record.title or record.url}",
        "",
        f"- Source URL: {record.url}",
        f"- Final URL: {record.final_url}",
        f"- Status: {record.status}",
        f"- Meta description: {record.meta_description}",
        *[f"- {line}" for line in headings],
        "",
        "## Visible Text",
        "",
        record.text,
        "",
        "## Images",
        "",
        "\n".join(image_lines) if image_lines else "No images found.",
        "",
        "## Links",
        "",
        "\n".join(link_lines) if link_lines else "No links found.",
        "",
    ]
    path.write_text("\n".join(content), encoding="utf-8")


def download_asset(url: str, used_names: set[str]) -> str | None:
    parsed = urlparse(url)
    if not is_internal_url(url) or not parsed.path:
        return None

    suffix = Path(parsed.path).suffix.lower()
    if suffix not in {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".ico", ".pdf"}:
        return None

    name = Path(parsed.path).name
    if not name:
        return None

    stem = Path(name).stem
    final_name = name
    counter = 2
    while final_name.lower() in used_names:
        final_name = f"{stem}-{counter}{suffix}"
        counter += 1
    used_names.add(final_name.lower())

    destination = ASSET_DIR / final_name
    try:
        _, _, data, _ = request_url(url)
        destination.write_bytes(data)
        return str(destination.relative_to(ROOT)).replace("\\", "/")
    except Exception:
        return None


def main() -> None:
    OUT.mkdir(exist_ok=True)
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    PAGE_DIR.mkdir(parents=True, exist_ok=True)
    ASSET_DIR.mkdir(parents=True, exist_ok=True)

    sitemap_index = fetch_text(urljoin(BASE_URL, "sitemap.xml"))
    (OUT / "sitemap.xml").write_text(sitemap_index, encoding="utf-8")
    sitemap_urls, direct_urls = sitemap_locations(sitemap_index)

    sitemap_map: dict[str, str] = {}
    all_page_urls = list(direct_urls)
    for sitemap_url in sitemap_urls:
        print(f"Fetching sitemap: {sitemap_url}")
        xml = fetch_text(sitemap_url)
        sitemap_name = slugify_url(sitemap_url)
        (OUT / f"{sitemap_name}.xml").write_text(xml, encoding="utf-8")
        _, urls = sitemap_locations(xml)
        for page_url in urls:
            sitemap_map[page_url] = sitemap_url
        all_page_urls.extend(urls)
        time.sleep(0.15)

    page_urls = unique(all_page_urls)
    (OUT / "sitemap_urls.txt").write_text("\n".join(page_urls) + "\n", encoding="utf-8")

    records: list[PageRecord] = []
    used_asset_names: set[str] = set()
    all_assets: dict[str, ImageRef] = {}

    for index, url in enumerate(page_urls, start=1):
        print(f"[{index}/{len(page_urls)}] Fetching page: {url}")
        try:
            status, final_url, data, content_type = request_url(url)
        except Exception as exc:
            records.append(
                PageRecord(
                    url=url,
                    sitemap=sitemap_map.get(url),
                    status=0,
                    final_url="",
                    title="",
                    meta_description="",
                    h1=[],
                    h2=[],
                    h3=[],
                    text=f"FETCH ERROR: {exc}",
                    images=[],
                    links=[],
                    raw_html_file="",
                    markdown_file="",
                )
            )
            continue

        if "text/html" not in content_type and "application/xhtml" not in content_type:
            continue

        html = data.decode("utf-8", errors="replace")
        slug = slugify_url(final_url)
        raw_file = RAW_DIR / f"{slug}.html"
        markdown_file = PAGE_DIR / f"{slug}.md"
        raw_file.write_text(html, encoding="utf-8")

        parser = PageParser(final_url)
        parser.feed(html)

        for image in parser.images:
            if image.src not in all_assets:
                image.downloaded_to = download_asset(image.src, used_asset_names)
                all_assets[image.src] = image
                time.sleep(0.05)
            else:
                image.downloaded_to = all_assets[image.src].downloaded_to

        record = PageRecord(
            url=url,
            sitemap=sitemap_map.get(url),
            status=status,
            final_url=final_url,
            title=clean_inline(parser.title),
            meta_description=parser.meta_description,
            h1=parser.headings["h1"],
            h2=parser.headings["h2"],
            h3=parser.headings["h3"],
            text=parser.visible_text,
            images=parser.images,
            links=parser.links,
            raw_html_file=str(raw_file.relative_to(ROOT)).replace("\\", "/"),
            markdown_file=str(markdown_file.relative_to(ROOT)).replace("\\", "/"),
        )
        records.append(record)
        write_markdown(record)
        time.sleep(0.2)

    manifest = {
        "source": BASE_URL,
        "sitemap_count": len(sitemap_urls),
        "page_count": len(records),
        "asset_count": len(all_assets),
        "sitemaps": sitemap_urls,
        "pages": [asdict(record) for record in records],
        "assets": [asdict(asset) for asset in all_assets.values()],
    }
    (OUT / "samioglou_scrape.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    (OUT / "assets_index.json").write_text(
        json.dumps([asdict(asset) for asset in all_assets.values()], ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (OUT / "README.md").write_text(
        "\n".join(
            [
                "# Samioglou Content Inventory",
                "",
                f"- Source: {BASE_URL}",
                f"- Sitemaps discovered: {len(sitemap_urls)}",
                f"- Pages fetched: {len(records)}",
                f"- Unique image/file assets found: {len(all_assets)}",
                "",
                "Key files:",
                "- `samioglou_scrape.json`: full structured scrape.",
                "- `sitemap_urls.txt`: all page URLs discovered through the sitemap.",
                "- `pages/`: one cleaned markdown file per page.",
                "- `raw_html/`: raw HTML copies for lossless reference.",
                "- `downloaded_assets/`: downloaded internal image/file assets.",
                "",
            ]
        ),
        encoding="utf-8",
    )

    print(f"Done. Pages: {len(records)}. Assets: {len(all_assets)}. Output: {OUT}")


if __name__ == "__main__":
    main()
