$ErrorActionPreference = "Stop"

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$output = Join-Path $root "samioglou_scraped_MD.md"
$scraplingHome = Join-Path $root "content_inventory\scrapling_checks\home_rendered.md"

$pages = @(
    @{
        Title = "Scrapling Rendered Homepage"
        Url = "https://www.samioglou.gr/"
        Path = "content_inventory\scrapling_checks\home_rendered.md"
        Note = "Rendered with Scrapling browser fetch using --ai-targeted and --network-idle."
    },
    @{
        Title = "Homepage Structured Scrape"
        Url = "https://www.samioglou.gr/"
        Path = "content_inventory\pages\home.md"
        Note = "Structured HTML scrape from sitemap crawl."
    },
    @{
        Title = "Contact Page"
        Url = "https://www.samioglou.gr/contacts/"
        Path = "content_inventory\pages\contacts.md"
        Note = "Contact details, address, email, phone, hours."
    },
    @{
        Title = "Quote Page"
        Url = "https://www.samioglou.gr/request-a-quote/"
        Path = "content_inventory\pages\request-a-quote.md"
        Note = "Quote request page content."
    },
    @{
        Title = "Fortotaxi"
        Url = "https://www.samioglou.gr/%cf%86%ce%bf%cf%81%cf%84%ce%bf%cf%84%ce%b1%ce%be%ce%af/"
        Path = "content_inventory\pages\cf-86-ce-bf-cf-81-cf-84-ce-bf-cf-84-ce-b1-ce-be-ce-af.md"
        Note = "Main microtransport/fortotaxi service page."
    },
    @{
        Title = "Metafora Grafeiou"
        Url = "https://www.samioglou.gr/%ce%bc%ce%b5%cf%84%ce%b1%cf%86%ce%bf%cf%81%ce%ac-%ce%b3%cf%81%ce%b1%cf%86%ce%b5%ce%af%ce%bf%cf%85/"
        Path = "content_inventory\pages\ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-ce-b3-cf-81-ce-b1-cf-86-ce-b5-ce-af-ce-bf-.md"
        Note = "Dedicated office moving service page."
    },
    @{
        Title = "Metafora Ilektrikis Kouzinas"
        Url = "https://www.samioglou.gr/%ce%bc%ce%b5%cf%84%ce%b1%cf%86%ce%bf%cf%81%ce%ac-%ce%b7%ce%bb%ce%b5%ce%ba%cf%84%cf%81%ce%b9%ce%ba%ce%ae%cf%82-%ce%ba%ce%bf%cf%85%ce%b6%ce%af%ce%bd%ce%b1%cf%82/"
        Path = "content_inventory\pages\ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-ce-b7-ce-bb-ce-b5-ce-ba-cf-84-cf-81-ce-b9-.md"
        Note = "Dedicated electric oven/stove moving service page."
    },
    @{
        Title = "Metafora Kanape"
        Url = "https://www.samioglou.gr/%ce%bc%ce%b5%cf%84%ce%b1%cf%86%ce%bf%cf%81%ce%ac-%ce%ba%ce%b1%ce%bd%ce%b1%cf%80%ce%ad/"
        Path = "content_inventory\pages\ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-ce-ba-ce-b1-ce-bd-ce-b1-cf-80-ce-ad.md"
        Note = "Dedicated sofa moving service page."
    },
    @{
        Title = "Metafora Krevatiou"
        Url = "https://www.samioglou.gr/%ce%bc%ce%b5%cf%84%ce%b1%cf%86%ce%bf%cf%81%ce%ac-%ce%ba%cf%81%ce%b5%ce%b2%ce%b1%cf%84%ce%b9%ce%bf%cf%8d/"
        Path = "content_inventory\pages\ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-ce-ba-cf-81-ce-b5-ce-b2-ce-b1-cf-84-ce-b9-.md"
        Note = "Dedicated bed moving service page."
    },
    @{
        Title = "Metafora Plyntiriou"
        Url = "https://www.samioglou.gr/%ce%bc%ce%b5%cf%84%ce%b1%cf%86%ce%bf%cf%81%ce%ac-%cf%80%ce%bb%cf%85%ce%bd%cf%84%ce%b7%cf%81%ce%af%ce%bf%cf%85/"
        Path = "content_inventory\pages\ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-cf-80-ce-bb-cf-85-ce-bd-cf-84-ce-b7-cf-81-.md"
        Note = "Dedicated washing machine moving service page."
    },
    @{
        Title = "Metafora Stromatos"
        Url = "https://www.samioglou.gr/%ce%bc%ce%b5%cf%84%ce%b1%cf%86%ce%bf%cf%81%ce%ac-%cf%83%cf%84%cf%81%cf%8e%ce%bc%ce%b1%cf%84%ce%bf%cf%82/"
        Path = "content_inventory\pages\ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-cf-83-cf-84-cf-81-cf-8e-ce-bc-ce-b1-cf-84-.md"
        Note = "Dedicated mattress moving service page."
    },
    @{
        Title = "Metafora Trapezarias"
        Url = "https://www.samioglou.gr/%ce%bc%ce%b5%cf%84%ce%b1%cf%86%ce%bf%cf%81%ce%ac-%cf%84%cf%81%ce%b1%cf%80%ce%b5%ce%b6%ce%b1%cf%81%ce%af%ce%b1%cf%82/"
        Path = "content_inventory\pages\ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-cf-84-cf-81-ce-b1-cf-80-ce-b5-ce-b6-ce-b1-.md"
        Note = "Dedicated dining table/furniture moving service page."
    },
    @{
        Title = "Metafora Psygeiou"
        Url = "https://www.samioglou.gr/%ce%bc%ce%b5%cf%84%ce%b1%cf%86%ce%bf%cf%81%ce%ac-%cf%88%cf%85%ce%b3%ce%b5%ce%af%ce%bf%cf%85/"
        Path = "content_inventory\pages\ce-bc-ce-b5-cf-84-ce-b1-cf-86-ce-bf-cf-81-ce-ac-cf-88-cf-85-ce-b3-ce-b5-ce-af-ce-bf-cf-85.md"
        Note = "Dedicated refrigerator moving service page."
    }
)

$lines = New-Object System.Collections.Generic.List[string]
$lines.Add("# Samioglou Scraped Content Markdown")
$lines.Add("")
$lines.Add("This file is the working content bank for the new Samioglou website.")
$lines.Add("")
$lines.Add("- Primary source: https://www.samioglou.gr/")
$lines.Add("- Rendered homepage source: Scrapling browser fetch")
$lines.Add("- Supporting source: full sitemap crawl in content_inventory/")
$lines.Add("- Created: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
$lines.Add("")
$lines.Add("## Important Migration Note")
$lines.Add("")
$lines.Add("The old WordPress site contains many theme/demo pages. This file intentionally includes the Samioglou-specific business pages only: homepage, contact, quote, fortotaxi, and dedicated moving-service pages. The full lossless archive remains in content_inventory/.")
$lines.Add("")
$lines.Add("## Included Sources")
$lines.Add("")
foreach ($page in $pages) {
    $lines.Add("- $($page.Title): $($page.Url)")
}
$lines.Add("")

foreach ($page in $pages) {
    $absolute = Join-Path $root $page.Path
    $lines.Add("---")
    $lines.Add("")
    $lines.Add("## $($page.Title)")
    $lines.Add("")
    $lines.Add("- Source URL: $($page.Url)")
    $localPath = $page.Path -replace "\\", "/"
    $lines.Add("- Local source: $localPath")
    $lines.Add("- Note: $($page.Note)")
    $lines.Add("")
    if (Test-Path $absolute) {
        $content = Get-Content $absolute -Raw -Encoding UTF8
        $lines.Add($content.Trim())
    } else {
        $lines.Add("MISSING LOCAL SOURCE FILE.")
    }
    $lines.Add("")
}

$lines | Set-Content -Path $output -Encoding UTF8
Write-Host "Wrote $output"
Write-Host "Included $($pages.Count) source sections."
