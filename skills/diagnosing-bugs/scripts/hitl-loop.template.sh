#!/usr/bin/env bash
# Human-in-the-loop reproduction loop. Copy this file and replace the example.

set -euo pipefail

step() {
  printf '\n>>> %s\n' "$1"
  read -r -p "    [Enter when done] " _
}

capture() {
  local var="$1" question="$2" answer
  printf '\n>>> %s\n' "$question"
  read -r -p "    > " answer
  printf -v "$var" '%s' "$answer"
}

# Replace this example with the minimal manual reproduction.
step "Open the app and sign in."
capture REPRODUCED "Perform the failing action. Did the exact bug occur? (y/n)"
capture OBSERVATION "Paste the error or describe the observed result:"

printf '\n--- Captured ---\n'
printf 'REPRODUCED=%s\n' "$REPRODUCED"
printf 'OBSERVATION=%s\n' "$OBSERVATION"
