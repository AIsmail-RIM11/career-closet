#!/usr/bin/env bash
# Publish this static site to the existing GitHub Pages gh-pages branch.
set -euo pipefail
cd "$(dirname "$0")"
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo 'Run this script inside your cloned Git repository.' >&2
  exit 1
fi
if ! git remote get-url origin >/dev/null 2>&1; then
  echo 'The Git repository has no origin remote.' >&2
  exit 1
fi
for path in index.html styles.css app.js data.js assets/qr.js assets/favicon.svg; do
  if [[ ! -f "$path" ]]; then echo "Missing website file: $path" >&2; exit 1; fi
done
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo 'Commit and push your source-code changes to main before publishing.' >&2
  exit 1
fi
TMP_DIR="$(mktemp -d "${TMPDIR:-/tmp}/career-closet-pages.XXXXXX")"
cleanup() { git worktree remove --force "$TMP_DIR" >/dev/null 2>&1 || true; rmdir "$TMP_DIR" >/dev/null 2>&1 || true; }
trap cleanup EXIT
git fetch origin gh-pages >/dev/null 2>&1 || true
if git rev-parse --verify refs/remotes/origin/gh-pages >/dev/null 2>&1; then
  git worktree add --detach "$TMP_DIR" refs/remotes/origin/gh-pages >/dev/null
else
  git worktree add --detach "$TMP_DIR" HEAD >/dev/null
fi
git -C "$TMP_DIR" rm -rq --ignore-unmatch .
cp index.html styles.css app.js data.js "$TMP_DIR/"
mkdir -p "$TMP_DIR/assets"
cp assets/qr.js assets/favicon.svg "$TMP_DIR/assets/"
touch "$TMP_DIR/.nojekyll"
git -C "$TMP_DIR" add -A
if git -C "$TMP_DIR" diff --cached --quiet; then
  echo 'GitHub Pages already has these website files.'
else
  git -C "$TMP_DIR" -c user.name="${GIT_AUTHOR_NAME:-Career Closet}" -c user.email="${GIT_AUTHOR_EMAIL:-pages@users.noreply.github.com}" commit -m 'Publish Career Closet static website' >/dev/null
  git -C "$TMP_DIR" push origin HEAD:refs/heads/gh-pages
  echo 'Published. Check https://aismail-rim11.github.io/career-closet/'
fi
