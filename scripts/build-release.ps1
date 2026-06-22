$ErrorActionPreference = "Stop"

$Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$Desktop = [Environment]::GetFolderPath("Desktop")
$ProjectDir = Split-Path $PSScriptRoot -Parent
$LogFile = Join-Path $Desktop "SSL_CHECKER_BUILD_RELEASE_$Timestamp.txt"

function Log {
    param([string]$Message)
    $Line = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] $Message"
    Write-Host $Line
    Add-Content -Path $LogFile -Value $Line -Encoding UTF8
}

function Fail {
    param([string]$Message)
    Log "ERROR: $Message"
    throw $Message
}

function Invoke-CommandLogged {
    param(
        [string]$Command,
        [string]$WorkingDirectory
    )

    Log "Ejecutando: $Command"

    $Psi = New-Object System.Diagnostics.ProcessStartInfo
    $Psi.FileName = "cmd.exe"
    $Psi.Arguments = "/c $Command"
    $Psi.WorkingDirectory = $WorkingDirectory
    $Psi.UseShellExecute = $false
    $Psi.RedirectStandardOutput = $true
    $Psi.RedirectStandardError = $true
    $Psi.CreateNoWindow = $true

    $Process = New-Object System.Diagnostics.Process
    $Process.StartInfo = $Psi

    [void]$Process.Start()

    $StdOut = $Process.StandardOutput.ReadToEnd()
    $StdErr = $Process.StandardError.ReadToEnd()

    $Process.WaitForExit()

    if ($StdOut) {
        Add-Content -Path $LogFile -Value $StdOut -Encoding UTF8
        Write-Host $StdOut
    }

    if ($StdErr) {
        Add-Content -Path $LogFile -Value $StdErr -Encoding UTF8
        Write-Host $StdErr
    }

    Log "Código de salida: $($Process.ExitCode)"

    if ($Process.ExitCode -ne 0) {
        Fail "El comando falló: $Command"
    }
}

New-Item -Path $LogFile -ItemType File -Force | Out-Null

Log "Inicio build release MPTech SSL Checker"
Log "ProjectDir: $ProjectDir"

Set-Location $ProjectDir

if (-not (Test-Path "package.json")) {
    Fail "No se encuentra package.json."
}

if (-not (Test-Path "src-tauri\Cargo.toml")) {
    Fail "No se encuentra src-tauri\Cargo.toml."
}

$ReleaseDir = Join-Path $ProjectDir "releases"
New-Item -Path $ReleaseDir -ItemType Directory -Force | Out-Null

$FinalExe = Join-Path $ReleaseDir "MPTech-SSL-Checker-v1.0.0-portable.exe"
$FinalHash = "$FinalExe.sha256"

if ((Test-Path $FinalHash) -and (-not (Test-Path $FinalExe))) {
    Remove-Item $FinalHash -Force
    Log "Eliminado SHA256 antiguo sin EXE real."
}

Invoke-CommandLogged -Command "npm install" -WorkingDirectory $ProjectDir
Invoke-CommandLogged -Command "npm run tauri:build" -WorkingDirectory $ProjectDir

$ExeCandidates = Get-ChildItem -Path "src-tauri\target\release" -Filter "*.exe" -File -ErrorAction SilentlyContinue |
    Where-Object {
        $_.Name -notmatch "build-script-build" -and
        $_.Name -notmatch "deps"
    }

if (-not $ExeCandidates) {
    Fail "No se ha encontrado ningún .exe real en src-tauri\target\release."
}

$SourceExe = $ExeCandidates | Sort-Object LastWriteTime -Descending | Select-Object -First 1

if (-not (Test-Path $SourceExe.FullName)) {
    Fail "El EXE fuente no existe: $($SourceExe.FullName)"
}

Copy-Item $SourceExe.FullName $FinalExe -Force

if (-not (Test-Path $FinalExe)) {
    Fail "No se ha podido copiar el EXE final a releases."
}

$Hash = Get-FileHash -Path $FinalExe -Algorithm SHA256
$Hash.Hash | Set-Content -Path $FinalHash -Encoding UTF8

Log "EXE fuente: $($SourceExe.FullName)"
Log "EXE final: $FinalExe"
Log "SHA256: $($Hash.Hash)"
Log "Hash file: $FinalHash"
Log "Build release completado correctamente."

Write-Host ""
Write-Host "Build completado correctamente."
Write-Host "EXE:"
Write-Host $FinalExe
Write-Host ""
Write-Host "SHA256:"
Write-Host $Hash.Hash
Write-Host ""
Write-Host "Log:"
Write-Host $LogFile