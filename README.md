# Studdy-Buddy
A university project that aims to help reservists in their studies

# to run the project you need to run these commands in the terminal:

1. npm install
2. npm start
3. (in new terminal) git checkout main
4. git pull
5. In the first time: git checkout -b "branch_name", other times: git checkout "branch_name"
if "git checkout" isn't working, maybe u need to do "git fetch" and then "git checkout"
6. git reset origin/main


## git reset --hard origin/main
## git push --force


changes...

# to save updates:

1. (Create new terminal)
2. (git status)
3. git add .
4. git commit -m "here some notes about the changes"
5. git push (which save only in the branch)
6. to save in main: 
  option 1:
  - git checkout main
  - git merge "branch_name"
  - git push
  then return to branch:
  - git checkout "branch_name"
  option 2: 
  - go to github and create pull request
