# audit.ps1 - Hook script that writes all JSON input to /tmp/agent-audit.log
# Designed for Cursor Hooks auditing

# Read JSON input from stdin
$jsonInput = [Console]::In.ReadToEnd()

# Create timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Log file
$logFile = "./.cursor/hooks/agent-audit.log"

# Create directory if needed
$dir = Split-Path $logFile
if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
}

# Write log entry
Add-Content -Path $logFile -Value "[$timestamp] $jsonInput"

exit 0