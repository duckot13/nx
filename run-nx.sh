#!/bin/bash
# Wrapper to run nx tasks inside a target template repo with required env.
# Usage: run-nx.sh <repo-dir> <nx-args...>
set -uo pipefail
REPO="$1"
shift
cd "$REPO" || exit 99
export NX_NO_CLOUD=true
export NX_DAEMON=false
export CI=false
exec "$REPO/node_modules/.bin/nx" "$@"
