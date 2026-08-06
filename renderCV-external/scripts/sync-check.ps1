# Verificar sincronizacion entre CV EN y ES
# Uso: .\scripts\sync-check.ps1  (desde renderCV-external)
#
# Compara la estructura de ambos YAML y advierte si hay
# diferencias en la cantidad de items, highlights, o secciones.

param()

$enFile = "Diego_Silva_CV_EN.yaml"
$esFile = "Diego_Silva_CV_ES.yaml"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectDir = Split-Path -Parent $scriptDir

Push-Location $projectDir
try {
    $en = Get-Content $enFile -Raw
    $es = Get-Content $esFile -Raw

    Write-Host "=== CV Sync Check ===" -ForegroundColor Cyan
    Write-Host ""

    $checks = @{
        "Sections"         = @(
            ([regex]::Matches($en, '^\s{4}\w+:', 'Multiline')).Count,
            ([regex]::Matches($es, '^\s{4}\w+:', 'Multiline')).Count
        )
        "Top-level items"  = @(
            ([regex]::Matches($en, '^\s{6}- ', 'Multiline')).Count,
            ([regex]::Matches($es, '^\s{6}- ', 'Multiline')).Count
        )
        "Highlight items"  = @(
            ([regex]::Matches($en, '^\s{10}- "', 'Multiline')).Count,
            ([regex]::Matches($es, '^\s{10}- "', 'Multiline')).Count
        )
    }

    $issues = 0

    foreach ($check in $checks.GetEnumerator()) {
        $name = $check.Key
        $enCount = $check.Value[0]
        $esCount = $check.Value[1]
        $match = if ($enCount -eq $esCount) { "OK" } else { "MISMATCH" }
        $color = if ($match -eq "OK") { "Green" } else { "Red" }

        Write-Host "  $name : EN=$enCount  ES=$esCount  [$match]" -ForegroundColor $color
        if ($match -ne "OK") { $issues++ }
    }

    Write-Host ""
    if ($issues -eq 0) {
        Write-Host "Structurally in sync. Remember to translate content, not just copy structure." -ForegroundColor Green
    } else {
        Write-Host "Found $issues structural difference(s). Both files must have the same number of items." -ForegroundColor Red
        Write-Host "Edit the file with fewer items and add the missing entries with translations." -ForegroundColor Yellow
    }
}
finally {
    Pop-Location
}
