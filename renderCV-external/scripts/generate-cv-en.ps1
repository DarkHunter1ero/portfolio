# Generar CV en Ingles (EN) -> frontend/public/CV/EN/
# Uso: .\scripts\generate-cv-en.ps1  (desde renderCV-external)
param()

$ErrorActionPreference = "Stop"
$lang = "EN"
$yamlFile = "Diego_Silva_CV_EN.yaml"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectDir = Split-Path -Parent $scriptDir
$publicDir = Join-Path $projectDir "..\frontend\public\CV\$lang"

Write-Host ">>> Generando CV - $lang <<<" -ForegroundColor Cyan

Push-Location $projectDir

try {
    if (Test-Path $publicDir) {
        Write-Host "Limpiando salida anterior: $publicDir" -ForegroundColor Yellow
        Remove-Item -Recurse -Force $publicDir
    }

    if (Test-Path "Diego_Silva_CV.pdf") { Remove-Item -Force "Diego_Silva_CV.pdf" }
    Get-ChildItem -Path "rendercv_output" -File -ErrorAction SilentlyContinue | Remove-Item -Force

    Write-Host "Ejecutando: rendercv render $yamlFile" -ForegroundColor Green

    $oldEncoding = [Console]::OutputEncoding
    [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
    $env:PYTHONIOENCODING = "utf-8"

    try {
        rendercv render $yamlFile 2>&1
        $exitCode = $LASTEXITCODE
    }
    finally {
        [Console]::OutputEncoding = $oldEncoding
    }

    if (-not (Test-Path "Diego_Silva_CV.pdf")) {
        throw "RenderCV no genero el PDF (exit code: $exitCode)"
    }

    Write-Host "PDF generado" -ForegroundColor Green

    New-Item -ItemType Directory -Force -Path $publicDir | Out-Null
    Move-Item -Path "Diego_Silva_CV.pdf" -Destination (Join-Path $publicDir "Diego_Silva_CV.pdf") -Force

    Get-ChildItem -Path "rendercv_output" -File -ErrorAction SilentlyContinue | Remove-Item -Force

    Write-Host "CV $lang -> $publicDir\Diego_Silva_CV.pdf" -ForegroundColor Green
}
finally {
    Pop-Location
}
