$ErrorActionPreference = "Stop"

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$out = Join-Path $root "content_inventory\wp_rest"
New-Item -ItemType Directory -Force -Path $out | Out-Null

$base = "https://www.samioglou.gr/wp-json/wp/v2"
$endpoints = @("types", "posts", "pages", "media", "menu-items")

foreach ($endpoint in $endpoints) {
    $allItems = @()
    $page = 1
    while ($true) {
        $uri = if ($endpoint -eq "types") {
            "$base/$endpoint"
        } else {
            "$base/${endpoint}?per_page=100&page=$page"
        }

        Write-Host "Fetching $uri"
        try {
            $response = Invoke-WebRequest -Uri $uri -UseBasicParsing
        } catch {
            if ($endpoint -eq "types" -or $page -eq 1) {
                Write-Host "Skipped $endpoint`: $($_.Exception.Message)"
            }
            break
        }

        $json = $response.Content | ConvertFrom-Json
        if ($endpoint -eq "types") {
            $json | ConvertTo-Json -Depth 100 | Set-Content -Path (Join-Path $out "$endpoint.json") -Encoding UTF8
            break
        }

        if ($null -eq $json -or $json.Count -eq 0) {
            break
        }

        $allItems += $json
        $totalPages = [int]($response.Headers["X-WP-TotalPages"] | Select-Object -First 1)
        if ($page -ge $totalPages) {
            break
        }
        $page += 1
    }

    if ($endpoint -ne "types") {
        $allItems | ConvertTo-Json -Depth 100 | Set-Content -Path (Join-Path $out "$endpoint.json") -Encoding UTF8
    }
}

Write-Host "Done. Output: $out"
