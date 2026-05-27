#!/bin/bash
set -e

echo "🔄 Resetting to demo state..."

git reset --soft demo-forgot-pw
git add .

echo "✅ Done — files are staged and ready to commit in VS Code"
