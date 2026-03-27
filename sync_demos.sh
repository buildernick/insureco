#!/bin/bash

# 1. Update your local knowledge of the repository
echo "Fetching latest data from origin..."
git fetch origin main

COMMIT_HASH="2cc851e846059d08e589816668700949d034259b"
SUCCESS_BRANCHES=()
FAILED_BRANCHES=()

# 2. Identify all local branches starting with "demo-"
branches=$(git branch --list 'demo-*' | sed 's/*//g' | xargs)

for branch in $branches; do
    echo -e "\n--- Processing: $branch ---"
    
    # Switch and pull
    git checkout "$branch" && git pull origin "$branch"
    
    # Attempt the cherry-pick
    if git cherry-pick -m 1 "$COMMIT_HASH"; then
        echo "✅ Successfully applied changes to $branch"
        SUCCESS_BRANCHES+=("$branch")
    else
        echo "❌ Conflict or error on $branch. Aborting pick..."
        git cherry-pick --abort
        FAILED_BRANCHES+=("$branch")
    fi
done

# 3. Report Summary
echo -e "\n=========================================="
echo "FINISHED: Cherry-pick Summary"
echo "=========================================="
echo "Succeeded: ${#SUCCESS_BRANCHES[@]}"
for b in "${SUCCESS_BRANCHES[@]}"; do echo "  - $b"; done

echo "Failed/Skipped: ${#FAILED_BRANCHES[@]}"
for b in "${FAILED_BRANCHES[@]}"; do echo "  - $b"; done
echo "=========================================="

# 4. Interactive Push Prompt
if [ ${#SUCCESS_BRANCHES[@]} -gt 0 ]; then
    read -p "Would you like to push the successful branches to origin? (y/n): " confirm
    if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
        for branch in "${SUCCESS_BRANCHES[@]}"; do
            echo "Pushing $branch..."
            git push origin "$branch"
        done
        echo "Push complete."
    else
        echo "Push cancelled. Changes remain local only."
    fi
fi

# Return to main
git checkout main