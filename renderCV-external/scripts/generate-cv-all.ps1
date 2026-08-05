# Generar ambos CVs (ES y EN) - solo PDFs
# Uso: .\scripts\generate-cv-all.ps1  (desde renderCV-external)
param()

$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Generando CVs - ES + EN (solo PDF)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

& "$scriptDir\generate-cv-es.ps1"
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: Fallo la generacion del CV en espanol." -ForegroundColor Red
    exit 1
}

Write-Host ""

& "$scriptDir\generate-cv-en.ps1"
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: Fallo la generacion del CV en ingles." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Ambos CVs generados exitosamente" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
