# Source from the launcher on the host, where Tailscale is installed (not inside Docker).
tailscale_cli=tailscale
if ! command -v "$tailscale_cli" >/dev/null && [ -x /Applications/Tailscale.app/Contents/MacOS/Tailscale ]; then
  tailscale_cli=/Applications/Tailscale.app/Contents/MacOS/Tailscale
fi
if command -v "$tailscale_cli" >/dev/null && command -v python3 >/dev/null; then
  if tailnet_identity=$("$tailscale_cli" status --json 2>/dev/null | python3 -c '
import json, sys
status = json.load(sys.stdin)
if status.get("BackendState") != "Running":
    sys.exit(1)
node = status["Self"]
user = (status.get("User") or {}).get(str(node.get("UserID")), {})
ips = node.get("TailscaleIPs") or []
print(node.get("DNSName", "").rstrip(".") or node.get("HostName", ""))
print(ips[0] if ips else "")
print(user.get("LoginName", ""))
' 2>/dev/null); then
    export TAILNET_NODE="$(printf '%s\n' "$tailnet_identity" | head -n 1)"
    export TAILNET_IP="$(printf '%s\n' "$tailnet_identity" | awk 'NR == 2')"
    export TAILNET_USER="$(printf '%s\n' "$tailnet_identity" | awk 'NR == 3')"
  fi
fi
if [ -z "${TAILNET_IP:-}" ]; then
  echo 'Tailscale identity unavailable (check Tailscale CLI connection and python3); using the configured worker name.' >&2
fi
