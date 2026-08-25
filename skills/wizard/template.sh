#!/usr/bin/env bash
# Interactive setup wizard. Replace the example below the STAGES marker.

set -euo pipefail

if [[ -t 1 ]] && command -v tput >/dev/null 2>&1 && [[ "$(tput colors 2>/dev/null || printf 0)" -ge 8 ]]; then
  BOLD=$(tput bold)
  DIM=$(tput dim)
  RESET=$(tput sgr0)
  BLUE=$(tput setaf 4)
  GREEN=$(tput setaf 2)
  YELLOW=$(tput setaf 3)
else
  BOLD=""
  DIM=""
  RESET=""
  BLUE=""
  GREEN=""
  YELLOW=""
fi

TOTAL_STAGES=0
STAGE_INDEX=0
ENV_FILE="${ENV_FILE:-.env}"
WRITTEN_ENV=()
WRITTEN_SECRETS=()
SKIPPED=()

clear_screen() {
  [[ -t 1 ]] || return 0
  if command -v tput >/dev/null 2>&1; then
    tput clear
  else
    printf '\033[2J\033[3J\033[H'
  fi
}

pause() {
  printf '  %s%s%s ' "$DIM" "${1:-Press Enter to continue}" "$RESET"
  read -r _ || true
}

banner() {
  clear_screen
  printf '\n%s%s  %s%s\n' "$BOLD" "$BLUE" "$1" "$RESET"
  printf '%s  %s stages%s\n\n' "$DIM" "$TOTAL_STAGES" "$RESET"
  pause "Ready to start?"
}

stage() {
  clear_screen
  STAGE_INDEX=$((STAGE_INDEX + 1))
  printf '\n%s%sStage %s/%s: %s%s\n' \
    "$BOLD" "$BLUE" "$STAGE_INDEX" "$TOTAL_STAGES" "$1" "$RESET"
}

say() {
  printf '  %s\n' "$1"
}

step() {
  printf '  - %s\n' "$1"
}

note() {
  printf '  %s%s%s\n' "$DIM" "$1" "$RESET"
}

warn() {
  printf '  %sWARNING: %s%s\n' "$YELLOW" "$1" "$RESET"
}

open_url() {
  local url="$1"
  printf '  %sOpening%s %s\n' "$GREEN" "$RESET" "$url"
  {
    if command -v wslview >/dev/null 2>&1; then
      wslview "$url"
    elif command -v explorer.exe >/dev/null 2>&1; then
      explorer.exe "$url"
    elif command -v xdg-open >/dev/null 2>&1; then
      xdg-open "$url"
    elif command -v open >/dev/null 2>&1; then
      open "$url"
    else
      warn "Open this URL manually: $url"
    fi
  } >/dev/null 2>&1 || warn "Open this URL manually: $url"
}

confirm() {
  local reply=""
  printf '  %s%s [y/N] %s' "$YELLOW" "$1" "$RESET"
  read -r reply || true
  [[ "$reply" =~ ^[Yy]$ ]]
}

existing_value() {
  [[ -f "$ENV_FILE" ]] || return 1
  local line
  line=$(grep -E "^${1}=" "$ENV_FILE" | tail -n 1) || return 1
  printf '%s' "${line#*=}"
}

ask() {
  local key="$1" prompt="$2" current input
  current=$(existing_value "$key" || true)
  if [[ -n "$current" ]]; then
    printf '  %s%s%s %s[Enter keeps current]%s ' "$BOLD" "$prompt" "$RESET" "$DIM" "$RESET"
  else
    printf '  %s%s%s ' "$BOLD" "$prompt" "$RESET"
  fi
  read -r input || true
  [[ -z "$input" && -n "$current" ]] && input="$current"
  printf -v "$key" '%s' "$input"
}

ask_secret() {
  local key="$1" prompt="$2" current input
  current=$(existing_value "$key" || true)
  if [[ -n "$current" ]]; then
    printf '  %s%s%s %s[Enter keeps current]%s ' "$BOLD" "$prompt" "$RESET" "$DIM" "$RESET"
  else
    printf '  %s%s%s ' "$BOLD" "$prompt" "$RESET"
  fi
  read -rs input || true
  printf '\n'
  [[ -z "$input" && -n "$current" ]] && input="$current"
  printf -v "$key" '%s' "$input"
}

write_env() {
  local key="$1" value="$2" tmp
  touch "$ENV_FILE"
  tmp=$(mktemp)
  grep -vE "^${key}=" "$ENV_FILE" >"$tmp" || true
  printf '%s=%s\n' "$key" "$value" >>"$tmp"
  mv "$tmp" "$ENV_FILE"
  WRITTEN_ENV+=("$key")
  printf '  %sWrote%s %s to %s\n' "$GREEN" "$RESET" "$key" "$ENV_FILE"
}

set_secret() {
  local name="$1" value="$2"
  if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1 && \
    printf '%s' "$value" | gh secret set "$name" >/dev/null 2>&1; then
    WRITTEN_SECRETS+=("$name")
    printf '  %sSet%s GitHub secret %s\n' "$GREEN" "$RESET" "$name"
    return
  fi
  SKIPPED+=("GitHub secret $name")
  warn "Could not set GitHub secret $name"
}

set_var() {
  local name="$1" value="$2"
  if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1 && \
    gh variable set "$name" --body "$value" >/dev/null 2>&1; then
    printf '  %sSet%s GitHub variable %s\n' "$GREEN" "$RESET" "$name"
    return
  fi
  SKIPPED+=("GitHub variable $name")
  warn "Could not set GitHub variable $name"
}

finish() {
  clear_screen
  printf '\n%s%sSetup complete%s\n' "$BOLD" "$GREEN" "$RESET"
  ((${#WRITTEN_ENV[@]})) && note "Environment values: ${WRITTEN_ENV[*]}"
  ((${#WRITTEN_SECRETS[@]})) && note "GitHub secrets: ${WRITTEN_SECRETS[*]}"
  if ((${#SKIPPED[@]})); then
    warn "Still requires manual work: ${SKIPPED[*]}"
  fi
  printf '\n'
}

# STAGES: replace this example. Keep TOTAL_STAGES equal to the stage count.

TOTAL_STAGES=1
banner "Service setup"

stage "Create API key"
say "Create a test API key and save it for local development and CI."
open_url "https://example.com/settings/api-keys"
step "Create and copy the test API key."
ask_secret SERVICE_API_KEY "Paste the API key:"
write_env SERVICE_API_KEY "$SERVICE_API_KEY"
set_secret SERVICE_API_KEY "$SERVICE_API_KEY"

finish
