#!/usr/bin/env bash
# 推送到 GitHub 并触发 Pages 部署（需已配置 github 远程凭据）
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

GITHUB_URL="${GITHUB_REMOTE:-https://github.com/Starydesigner/globalwebsitepoki.git}"
GITHUB_BRANCH="${GITHUB_BRANCH:-main}"
CURRENT_BRANCH="$(git branch --show-current)"
SNAPSHOT_BRANCH="github-pages-snapshot"

if ! git remote | grep -qx github; then
  git remote add github "$GITHUB_URL"
else
  git remote set-url github "$GITHUB_URL"
fi

cleanup() {
  git checkout -f "$CURRENT_BRANCH" 2>/dev/null || true
  git branch -D "$SNAPSHOT_BRANCH" 2>/dev/null || true
}

trap cleanup EXIT

git branch -D "$SNAPSHOT_BRANCH" 2>/dev/null || true
git checkout --orphan "$SNAPSHOT_BRANCH"
git add -A
git reset -- .preview-tunnel.log dist/ index.html placeholder.html tech-global.html 2>/dev/null || true
rm -f index.html placeholder.html tech-global.html 2>/dev/null || true
git add -A
git reset -- .preview-tunnel.log dist/ 2>/dev/null || true
git commit -m "chore: GitHub Pages 发布快照

与当前工作区一致的单提交推送，用于触发 Actions 部署。"

echo "→ 推送到 github:${GITHUB_BRANCH}（单提交快照，避免历史大文件）"
git push -u github "${SNAPSHOT_BRANCH}:${GITHUB_BRANCH}" --force

trap - EXIT
cleanup

echo ""
echo "完成。预览: https://starydesigner.github.io/globalwebsitepoki/"
