#!/bin/bash

# The foundation we are moving the demos onto
SOURCE="main"

echo "Fetching latest from origin..."
git fetch origin $SOURCE

# Get all your demo branches
branches=$(git branch --list 'demo-*' | sed 's/*//g' | xargs)

for branch in $branches; do
    echo -e "\n--- Rebasing $branch onto $SOURCE ---"
    git checkout "$branch"
    
    # This is the magic command. It moves the branch to start at the tip of main.
    if git rebase "origin/$SOURCE"; then
        echo "✅ $branch rebased successfully."
        
        # After a rebase, the history is different, so you MUST force push.
        read -p "Force push $branch to GitHub? (y/n): " confirm
        if [[ $confirm == [yY] ]]; then
            git push origin "$branch" --force
        fi
    else
        echo "❌ Conflict detected on $branch."
        echo "This usually happens if main changed the exact lines you deleted."
        echo "Fix the files, then run 'git rebase --continue' or 'git rebase --abort'."
        exit 1
    fi
done

git checkout $SOURCE
echo -e "\nAll branches processed."