#!/bin/bash
set -e

BRANCH=$1

if [ -z "$BRANCH" ]; then
  echo "❌ Please provide a branch name: ./reset-demo.sh boot-shelf"
  exit 1
fi

echo "🔄 Setting up demo branch: $BRANCH..."

git checkout main
git checkout -b $BRANCH
git push -u origin $BRANCH
git apply --index demo-changes.patch

echo "✅ Done — branch '$BRANCH' is ready with files staged in VS Code"
