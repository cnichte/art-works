# Art.Works

A catalog raisonne application.

* Learn about [the license](LICENSE.MD).
* Based on my boilerplate [basic-electron-typescript-react-starter](https://github.com/cnichte/basic-electron-typescript-react-starter)
* There are a few special features here:
  * uses the `relational-pouch` plugin für `pouchdb`.

The following libraries are included:

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
npm install exifreader --save
https://github.com/mattiasw/ExifReader

npm i react-countup

npm i markdown-to-jsx
npm install react-image-file-resizer

npm i recharts
npm i tldraw
# https://github.com/tldraw/tldraw

npm i -D copy-webpack-plugin

npm install --save i18next i18next-fs-backend
# https://phrase.com/blog/posts/building-an-electron-app-with-internationalization-i18n/
# https://www.i18next.com
# https://github.com/i18next/i18next-fs-backend

# https://github.com/shawnbanasick/electron-react-i18n-boilerplate

# https://github.com/ant-design/ant-design-charts
# https://ant-design-charts.antgroup.com/en/examples
npm install @ant-design/charts

# https://github.com/bvaughn/react-highlight-words
npm i react-highlight-words
# https://github.com/ankeetmaini/react-infinite-scroll-component
npm i react-infinite-scroll-component
```

## Use the Application Repository

clone git from <https://github.com/cnichte/art-works.git>

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

## Coding

Made with VS-Code. Recomended Plugins:

* Better Comments
* Todo Tree
* Wakatime ()

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

## Create an Application 'Released Version' Number in GIT

* Guide: <https://stackoverflow.com/questions/37814286/how-to-manage-the-version-number-in-git>
  * [Semantic Versioning](https://semver.org/)
  * [git-describe Manual Page](https://mirrors.edge.kernel.org/pub/software/scm/git/docs/git-describe.html)

```bash
git tag -a "v1.5.0-beta" -m "version v1.5.0-beta"
# Every new commit after this will auto-increment tag by appending commit number and commit hash
git describe # show that
git show v1.5.0-beta
```

### NPM

---

## Documentation

* src/app/documentation/userdoc
* src/app/documentation/devdoc
* [//carsten-nichte.de/publications/applications/art.works/](https://carsten-nichte.de/publications/applications/art.works/)