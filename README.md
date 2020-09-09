# Create accounts

- github
  - goto github.com and create account

# Install programs on local machine

- install nodejs from `https://nodejs.org/en/download/`
- install vscode from `https://code.visualstudio.com/download`
  - start editor to see if it works, if not run from terminal `code --disable-gpu`
- install git from `https://git-scm.com/downloads`
- open terminal
- `git config --global user.name "FIRST_NAME LAST_NAME"` - to set name
- `git config --global user.email "MY_NAME@gmail.com"` - to set email
- create `a` folder next to Desktop folder, just goto terminal and `mkdir a` and `cd a`


# Link local machine to github account

- goto terminal and type `ssh-keygen` and hit enter 10x to finish - to create ssh public and private keys in .ssh directory named `id_rsa.pub` and `id_rsa`
- goto https://github.com/settings/ssh/new
- type in `title` computer name like `lenovo x1 carbon`
- type in `key` contents from `.ssh/id_rsa.pub` file
- click `Add SSH key`


# Create new app

- open terminal
- `git clone https://github.com/kalinicm/nextjs-starter.git newnextapp1` - to clone starter app
- `cd newnextapp1` - to go into new app directory
- `npm install` - to install app modules
- `npm run extensions` - to instal vscode extensions

# Push new app to its own github repo

- goto https://github.com/new
- type in `repository name` repository new name
- click `create repository`
- on next screen we need to find git link like: `git@github.com:USERNAME/NEWREPONAME.git`
- open terminal where new app is located
- `rm .git` - to remove current git
- `git init` - to initi new git
- `git add .` - to add all files to staging
- `git commit -m "initial commit"` - to create commit from staged files
- `git branch -M master` - to set master
- `git remote add origin git@github.com:USERNAME/NEWREPONAME.git` - to add origin
- `git push -u origin master` - to push to github
- now all is set, go and develop the app

# Develop app

- left half of screen
  - open vscode
  - press `ctrl+shift+p` and type `focus terminal` to open new terminal
  - `npm run dev` - to start dev env and use `ctrl+c` to stop it
- right half of screen
  - open in browser index page: http://localhost:3000
  - open in browser recepies page: http://localhost:3000/recepies
- edit code in editor and look at browser for instant update of changes or error if any


# Build for production

- open terminal
- `npm run build` - to build production app
- `npm start` - to start app production build and use `ctrl+c` to stop it

# Deploy to Production

- ... to be added later
