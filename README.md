# Art.Works mit meiner eigenen Boilerplate

```bash
npm i react-router
npm i react-router-dom

npm i uuid
npm i pouchdb
npm i --save-dev @types/pouchdb
npm i relational-pouch
npm i pouchdb-find
npm i electron-log

npm i antd-img-crop
npm i dayjs
npm i exif-js
npm i react-countup

npm i recharts
npm i tldraw
# https://github.com/tldraw/tldraw
```

Probleme mit Events?

```js
const onDateModeEvent = (e: RadioChangeEvent) => {
    const { target } = e; //* type guard
    const element = target as HTMLButtonElement;
    if (target) console.log(element.value);
}
```


aus `window.electron.ipcRenderer.` wird `window.app_api.ipc.`

- Markdown + Frontmatter to Json
  - https://github.com/scottstanfield/markdown-to-json#readme

electron-forge versus https://electron-vite.org/
oder gar beides? https://www.electronforge.io/config/plugins/vite

- tldraw Assets lokal nutzen...
  - https://discord.com/channels/859816885297741824/1219426289681694770/1219497107811995739
  - https://gist.github.com/bbudd/2a246a718b7757584950b4ed98109115

- `Type '{ onClick: () => void; }' is not assignable to type 'IntrinsicAttributes & Props'.`
- https://stackoverflow.com/questions/65183883/onclick-not-assignable-to-type-intrinsicattributes-error-in-typescript-react

## App Icon

- https://www.electronforge.io/guides/create-and-add-icons

## Electron Typescript-React-Starter Application 2024

- A minimalistic (as possible) startingpoint, following the official guides, and avoiding some pitfalls.
- It was important to me that all dependent packages are up to date.
- I didn't test the app for all possible and impossible scenarios, only for my very specific requirements.

## Use the Repo

clone git from <https://github.com/cnichte/basic-electron-typescript-react-starter.git>

```bash
npm install
# backup the .gitignore (rename it)
# then remove the git:
rm -rf .git*
# and init your own:
git init
```

run the commands:

```bash
#start the app
npm start
# builds a zip in /out/make/zip/darwin/arm64
# you have to extract the zip an lauch the executable file
npm run make
# publish on github (has to be setup)
npm run publish
```

## Quick ZIP

```bash
zip -r werkverzeichnis-$(date +"%Y-%m-%d").zip . -x '/node_modules/**' '/release/**' '/out/**' '.git/*' '.webpack/*' '.erb/*' '.vscode/*' '*.zip'
```

Should run without errors.

## Update outdated packages

check for outdated packages

```bash
# check 
npm outdated
# or better use: npx npm-check-updates
ncu
# install ncu if absent
npm i npm-check-updates
# Doc: https://github.com/raineorshine/npm-check-updates
```

be careful when updating. I do a quick local backup before updating.

```bash
ncu -u
#or - with space to deselect, and enter to execute
ncu -i
# or
ncu -i --format group
```

In this case updating eslint, causes problems. I have to wait until all installed dependent packages are updated.

```bash
Major   Potentially breaking API changes
❯ ◯ eslint  ^8.0.1  →  ^9.2.0
```

## History

How i set this up...

### Create Project and Install

Guide: [www.electronforge.io](https://www.electronforge.io)

```bash
# in parent folder
npm init electron-app@latest basic-electron-typescript-react-starter -- --template=webpack-typescript
# in folder app-folder
npm install
```

```bash
npm warn deprecated gar@1.0.4: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
npm warn deprecated @npmcli/move-file@2.0.1: This functionality has been moved to @npmcli/fs
npm warn deprecated xterm-addon-search@0.8.2: This package is now deprecated. Move to @xterm/addon-search instead.
npm warn deprecated xterm-addon-fit@0.5.0: This package is now deprecated. Move to @xterm/addon-fit instead.
npm warn deprecated asar@3.2.0: Please use @electron/asar moving forward.  There is no API change, just a package name change
npm warn deprecated xterm@4.19.0: This package is now deprecated. Move to @xterm/xterm instead.
```

```bash
npm install --save-dev @electron-forge/publisher-github
```

ignoring these (for now), and continue with:

```bash
# start the app - works
npm start
# make the app - works
npm run make
# publish on github (has to be setup)
npm run publish
```

make warnings:

```bash
(node:10577) [DEP0174] DeprecationWarning: Calling promisify on a function that returns a Promise is likely a mistake.
(Use `node --trace-deprecation ...` to show where the warning was created)
```

publish has to be setup.

### Add React

Guide: [electronforge.io/guides/framework-integration/react-with-typescript](https://www.electronforge.io/guides/framework-integration/react-with-typescript)

```bash
npm install --save react react-dom
npm install --save-dev @types/react @types/react-dom
```

works

### Adding IPC Support

Guide: [electronjs.org/de/docs/latest/tutorial/ipc](https://www.electronjs.org/de/docs/latest/tutorial/ipc)

works

### Added MariaDB Support

Guide: [github.com/sidorares/node-mysql2](https://github.com/sidorares/node-mysql2)

```bash
npm install --save mysql2
npm install --save-dev @types/node
```

works

#### create a database

This is for Synology Diskstation, but you can also set up a local Docker for example with [Docker-Desktop](https://www.docker.com/products/docker-desktop/), or [create Docker Container in VS-Code](https://code.visualstudio.com/docs/containers/overview).

- Log in to DSM of your Diskstation as admin (this is  Webapp)
- Create the folders with the `File-Station` App: `docker-data/mariadb/data`
  - Its very important that the `data` folder has enough user-rights!
    - in File-Station
    - Select folder `docker-data` on the left
    - In the right pane, select `mariadb`
    - Action > Properties
    - Permissions tab
    - Create
    - Select `Everyone`
    - Assign the rights
    - save
- Launch the `Container-Manager` App
  - Project
  - push the `create` button...
    - Name: mariadb
    - Path: `/volume1/docker-data/mariadb/`
    - The yaml is stored there.
  - Source: Docker-compse yaml `upload` or `create`
  - Copy the following code. Or upload the file with the code:

```yaml
# Use root/password as user/password credentials
# Use user/password as user/password credentials for mydatabase
# you have to create /volume1/docker-data/mariadb/data
version: '3.1'
services:
  db:
    image: mariadb
    restart: always
    environment:
      MARIADB_ROOT_PASSWORD: password
      MYSQL_DATABASE: mydatabase
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    volumes:
      - /volume1/docker-data/mariadb/data:/var/lib/mysql
    ports:
      - "3306:3306"
```

you have to create a example table and add records in the db.

```sql
create table projects(
    project_id int auto_increment,
    project_name varchar(255) not null,
    begin_date date,
    end_date date,
    cost decimal(15,2) not null,
    created_at timestamp default current_timestamp,
    primary key(project_id)
);

INSERT INTO projects (project_id, project_name, begin_date, end_date, cost, created_at) VALUES (1, 'Testprojekt Nummer 1', null, null, 100.00, '2024-05-09 21:00:55');
INSERT INTO projects (project_id, project_name, begin_date, end_date, cost, created_at) VALUES (2, 'Projekt 2', null, null, 50.00, '2024-05-09 21:01:58');
```

works

### Issues (so far)

Warning during `npm run make`

```bash
(node:43477) [DEP0174] DeprecationWarning: Calling promisify on a function that returns a Promise is likely a mistake.
```