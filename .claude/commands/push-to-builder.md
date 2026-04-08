---
description: Commit current changes and push to Builder.io, then display the preview link
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git diff:*), Bash(git commit:*), Bash(git log:*), Bash(npx builder.io push:*)
---

## Context

- Current git status: !`git status`
- Current git diff: !`git diff HEAD`
- Current branch: !`git branch --show-current`

## Your task

1. **Stage and commit all current changes** using git. Look at the diff above and write a concise, descriptive commit message. Stage all modified/untracked files relevant to the changes and create the commit.

2. **Run the Builder.io push command**:
   ```
   npx builder.io push
   ```
   Run this command and capture all output. The command will interact with Builder.io and return a URL/link when complete.

3. **Display the link** — once the command finishes, extract the URL from the output and present it to the user as a clickable link so they can preview their changes on Builder.io.

If there are no changes to commit, skip to step 2 and run the push command directly.
