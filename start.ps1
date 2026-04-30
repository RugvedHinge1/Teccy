# ============================================================
# Teccy - Start All Servers
# Run from: c:\Users\home\Downloads\math.py1
# ============================================================

$rootDir = "C:\Users\home\Downloads\math.py1"
$appDir  = "$rootDir\math.py\math.py"

Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  TECCY — Starting All Servers" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# ── 1. Kill anything already using our ports (clean slate) ──
Write-Host "[1/4] Clearing ports 8080, 5000, 8501..." -ForegroundColor Yellow
@(8080, 5000, 8501) | ForEach-Object {
    $port = $_
    $pids = netstat -ano | Select-String ":$port\s" | ForEach-Object {
        ($_ -split '\s+')[-1]
    } | Sort-Object -Unique
    foreach ($p in $pids) {
        if ($p -match '^\d+$') {
            Stop-Process -Id $p -Force -ErrorAction SilentlyContinue
        }
    }
}
Start-Sleep -Seconds 1
Write-Host "   Ports cleared." -ForegroundColor Green

# ── 2. Frontend — http.server from math.py1 root on port 8080 ──
Write-Host ""
Write-Host "[2/4] Starting Frontend on http://localhost:8080 ..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command",
    "cd '$rootDir'; python -m http.server 8080" `
    -WindowStyle Normal
Start-Sleep -Seconds 1
Write-Host "   Frontend: http://localhost:8080/math.py/math.py/index.html" -ForegroundColor Green

# ── 3. Backend — Flask diagnosis API on port 5000 ──
Write-Host ""
Write-Host "[3/4] Starting Backend (Diagnosis API) on http://localhost:5000 ..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command",
    "cd '$appDir'; .\antigravity_venv\Scripts\python.exe python\diagnosis_api.py" `
    -WindowStyle Normal
Start-Sleep -Seconds 1
Write-Host "   Backend:  http://localhost:5000/api/health" -ForegroundColor Green

# ── 4. Questions Model — Streamlit on port 8501 ──
Write-Host ""
Write-Host "[4/4] Starting Questions Model (Streamlit) on http://localhost:8501 ..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command",
    "cd '$appDir'; .\antigravity_venv\Scripts\python.exe -m streamlit run python\question.py --server.port 8501" `
    -WindowStyle Normal
Start-Sleep -Seconds 2

# ── Done ──
Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  ALL SERVERS STARTED!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Homepage      : http://localhost:8080/math.py/math.py/index.html" -ForegroundColor White
Write-Host "  Practice Mode : http://localhost:8501" -ForegroundColor White
Write-Host "  Backend API   : http://localhost:5000/api/health" -ForegroundColor White
Write-Host "  Greenhouse    : http://localhost:8080/gamification/gamesection/greenhouse/greenhouse.html" -ForegroundColor White
Write-Host "  General Store : http://localhost:8080/gamification/gamesection/generalstore/generalstore.html" -ForegroundColor White
Write-Host "  Almanac       : http://localhost:8080/gamification/gamesection/Almanac/almanac.html" -ForegroundColor White
Write-Host ""
