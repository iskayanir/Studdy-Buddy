# Studdy-Buddy
A university project that aims to help reservists in their studies

# to run the project you need to run these commands in the terminal:

1. npm install
2. npm start
3. git pull origin main
4. In the first time: git checkout -b "branch_name", other times: git checkout "branch_name"
if "git checkout" isn't working, maybe u need to do "git fetch" and then "git checkout"

# to save updates:

1. (Create new terminal)
2. (git status)
3. git add .
4. git commit -m "here some notes about the changes"
5. git push (which save only in the branch)
6. to save in main: or git push origin main or git checkout main, then git push and then git checkout "branch_name"

ignore for now from this part:
# If you see a message that the remote has been changed, you must do the following:

1. git pull origin main --no-rebase     or      git pull --rebase origin main
2. Close the file that opened for you
3. git push origin main
