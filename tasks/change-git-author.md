# Task: Change All Git Commit Authors to Eugen Soloviov <suenot@gmail.com>

## Goal
Change the author and committer information for all commits in the repository to:

- **Name:** Eugen Soloviov
- **Email:** suenot@gmail.com

## Reasoning
- The project must reflect correct authorship for all historical commits.
- This is required for accurate attribution and project rebranding.
- All files and commit history must remain consistent after the change.
- The solution must be cross-platform and not depend on macOS, Homebrew, pip, or any external tools.

## Steps

1. **Backup the repository**
   - Before rewriting history, make a backup: `git clone --mirror <repo> <repo-backup>`

2. **Rewrite all commit authors and committers (cross-platform)**
   - Use the built-in git filter-branch command (works on all platforms):

     ```sh
     git filter-branch --env-filter '
         export GIT_AUTHOR_NAME="Eugen Soloviov"
         export GIT_AUTHOR_EMAIL="suenot@gmail.com"
         export GIT_COMMITTER_NAME="Eugen Soloviov"
         export GIT_COMMITTER_EMAIL="suenot@gmail.com"
     ' --tag-name-filter cat -- --branches --tags
     ```
   - This will rewrite all commits to have the specified author and committer, regardless of the original author.

3. **Force-push the rewritten history**
   - Push the changes to the remote repository:
     ```sh
     git push --force --all
     git push --force --tags
     ```
   - All collaborators will need to re-clone or reset their local copies.

## Paths Checked
- No code or content files are changed by this operation, only git history.
- All files in the repository will retain their content, but commit hashes will change.

## Notes
- This operation is destructive to git history. Only perform if you understand the consequences.
- Never edit `.env` files as per project policy.
- After completion, verify that all commits show the correct author using `git log`.
- This method is fully cross-platform and does not require any external dependencies beyond git itself.

## Troubleshooting

### If you see a TypeError or crash with --name-callback/--email-callback:
- This is a known bug in some versions of git-filter-repo.
- Workaround: Use a mapping file for author and committer replacement.

#### Example mapping file (authors.txt):
```
* <*>=Eugen Soloviov <suenot@gmail.com>
```

#### Command:
```sh
git filter-repo --force --mailmap authors.txt
```

If this fails, use the legacy git filter-branch method (see below). 