from __future__ import annotations

import json
from pathlib import Path

from playwright.sync_api import TimeoutError as PlaywrightTimeoutError
from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "inspiration"
OUT.mkdir(exist_ok=True)

SITES = [
    {
        "name": "VIP Pro Moving",
        "url": "https://vippromoving.com/",
    },
    {
        "name": "SOS Moving LA",
        "url": "https://www.sosmovingla.net/",
    },
    {
        "name": "Central Coast Moving",
        "url": "https://centralcoastmoving.com/",
    },
    {
        "name": "Safebound Moving",
        "url": "https://www.safeboundmoving.com/",
    },
]


SCRIPT = r"""
() => {
  const isVisible = (el) => {
    const style = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 20 && rect.height > 20;
  };

  const normColor = (value) => {
    if (!value || value === 'transparent' || value === 'rgba(0, 0, 0, 0)') return null;
    return value;
  };

  const classHints = (el) =>
    [...el.classList]
      .filter(Boolean)
      .filter((name) => !/[a-z0-9]{18,}/i.test(name))
      .slice(0, 6);

  const textStats = (el) => {
    const text = (el.innerText || '').replace(/\s+/g, ' ').trim();
    const words = text ? text.split(' ').length : 0;
    return { chars: text.length, words };
  };

  const semanticSections = [...document.querySelectorAll('header, main > section, section, footer')]
    .filter(isVisible)
    .filter((el) => el.getBoundingClientRect().height > 60);

  const largeBands = [...document.querySelectorAll('body > *, main > *, #__next > *, [id="root"] > *, [class*="page" i] > *')]
    .filter(isVisible)
    .filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.height > 120 && rect.width > innerWidth * 0.65;
    });

  const sectionCandidates = [...new Set([...semanticSections, ...largeBands])]
    .sort((a, b) => (a.getBoundingClientRect().top + window.scrollY) - (b.getBoundingClientRect().top + window.scrollY))
    .slice(0, 40);

  const colors = {};
  const fonts = {};
  [...document.querySelectorAll('body, header, main, section, article, a, button, input, form, h1, h2, p')]
    .filter(isVisible)
    .slice(0, 600)
    .forEach((el) => {
      const style = getComputedStyle(el);
      [normColor(style.backgroundColor), normColor(style.color), normColor(style.borderColor)]
        .filter(Boolean)
        .forEach((color) => { colors[color] = (colors[color] || 0) + 1; });
      const font = style.fontFamily.split(',')[0].replaceAll('"', '').trim();
      if (font) fonts[font] = (fonts[font] || 0) + 1;
    });

  const cardLike = [...document.querySelectorAll('article, [class*="card" i], [class*="service" i], [class*="item" i]')]
    .filter(isVisible)
    .filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width > 120 && rect.height > 90 && rect.height < 900;
    })
    .slice(0, 80)
    .map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        classes: classHints(el),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        hasImage: !!el.querySelector('img, picture, video'),
        hasButtonOrLink: !!el.querySelector('a, button'),
        text: textStats(el),
      };
    });

  const sections = sectionCandidates.map((el, index) => {
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    const cards = [...el.querySelectorAll('article, [class*="card" i], [class*="service" i], [class*="item" i]')]
      .filter(isVisible);
    const directLayout = getComputedStyle(el).display;
    const childLayouts = [...el.children].slice(0, 12).map((child) => getComputedStyle(child).display);
    return {
      index,
      tag: el.tagName.toLowerCase(),
      classes: classHints(el),
      top: Math.round(rect.top + window.scrollY),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      display: directLayout,
      childDisplays: childLayouts,
      hasBackgroundImage: style.backgroundImage && style.backgroundImage !== 'none',
      bgColor: normColor(style.backgroundColor),
      imageCount: el.querySelectorAll('img, picture, video').length,
      formCount: el.querySelectorAll('form').length,
      buttonLinkCount: el.querySelectorAll('a, button').length,
      headingCount: el.querySelectorAll('h1,h2,h3').length,
      cardLikeCount: cards.length,
      text: textStats(el),
    };
  });

  const header = document.querySelector('header') || document.querySelector('[class*="header" i], nav');
  const headerStyle = header ? getComputedStyle(header) : null;
  const headerRect = header ? header.getBoundingClientRect() : null;

  const imageRatios = [...document.images]
    .filter((img) => img.complete && img.naturalWidth > 0 && isVisible(img))
    .slice(0, 80)
    .map((img) => ({
      width: img.naturalWidth,
      height: img.naturalHeight,
      ratio: Math.round((img.naturalWidth / Math.max(img.naturalHeight, 1)) * 100) / 100,
      renderedWidth: Math.round(img.getBoundingClientRect().width),
      renderedHeight: Math.round(img.getBoundingClientRect().height),
    }));

  const forms = [...document.forms].filter(isVisible).map((form) => ({
    fields: [...form.querySelectorAll('input, select, textarea')].map((field) => ({
      tag: field.tagName.toLowerCase(),
      type: field.getAttribute('type') || field.tagName.toLowerCase(),
      required: field.hasAttribute('required'),
    })),
    buttonCount: form.querySelectorAll('button, input[type="submit"]').length,
  }));

  const navLinks = header ? [...header.querySelectorAll('a')].filter(isVisible) : [];
  const menuButtons = header ? [...header.querySelectorAll('button')].filter(isVisible) : [];

  return {
    url: location.href,
    viewport: { width: innerWidth, height: innerHeight },
    document: {
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      overflowX: document.documentElement.scrollWidth > innerWidth,
    },
    header: header ? {
      tag: header.tagName.toLowerCase(),
      classes: classHints(header),
      height: Math.round(headerRect.height),
      position: headerStyle.position,
      bgColor: normColor(headerStyle.backgroundColor),
      navLinkCount: navLinks.length,
      menuButtonCount: menuButtons.length,
    } : null,
    sections,
    forms,
    cardLikeSample: cardLike,
    imageRatios,
    topColors: Object.entries(colors).sort((a, b) => b[1] - a[1]).slice(0, 14),
    topFonts: Object.entries(fonts).sort((a, b) => b[1] - a[1]).slice(0, 8),
  };
}
"""


def inspect_site(page, site: dict[str, str], width: int, height: int) -> dict:
    page.set_viewport_size({"width": width, "height": height})
    try:
        page.goto(site["url"], wait_until="networkidle", timeout=65000)
    except PlaywrightTimeoutError:
        page.goto(site["url"], wait_until="domcontentloaded", timeout=65000)
        page.wait_for_timeout(5000)

    page.wait_for_timeout(1000)
    data = page.evaluate(SCRIPT)
    data["siteName"] = site["name"]
    data["sourceUrl"] = site["url"]
    return data


def main() -> None:
    results = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        for site in SITES:
            print(f"Inspecting {site['name']} desktop")
            desktop = inspect_site(page, site, 1440, 1000)
            print(f"Inspecting {site['name']} mobile")
            mobile = inspect_site(page, site, 390, 844)
            results.append({"site": site, "desktop": desktop, "mobile": mobile})
        browser.close()

    (OUT / "layout_signals.json").write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {OUT / 'layout_signals.json'}")


if __name__ == "__main__":
    main()
