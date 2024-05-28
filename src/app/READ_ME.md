## My App - Art.Works

The idea is, that I build my app upon modularly.

So in the end I get a reusable framework,  
into which I only have to insert other modules 
to create a new application.

My App resides in the Folder `/src/app/`

Directory structure:

* `backend` - Famework backEnd stuff 
* `common` - shared by all modules, as well as (if applicable) frontend an backend.
* `documentation` - The documentation of the app
* `frontend` - Framework frontEnd stuff
* `modules` - All the modules, of the Art.Works app

Modules sit organizationally between frontend and backend because they serve both.

Important files: 

* `MyAppMain.tsx` - Builds the backend
* `MyAppRenderer.tsx` - Builds the frontend

These two files are the entry points (or interface) to the parent Electron Framework.

This is still in planning:

* `moduleRegistry.ts`

## Electron

This is the Electron part:

* `/assets/` - Electron Stuff
* `release/app/build/` - Here I find the built releases
* `/src/main/` - The Electron backend
* `/src/renderer/` - The Electron front end
* `/src/styles/` - Electron styles

## Summary

So it my App breaks down to:

* ([Electron](https://electron.atom.io/) with [React](https://facebook.github.io/react/), [React Router](https://github.com/reactjs/react-router), [Webpack](https://webpack.js.org/) and [React Fast Refresh](https://www.npmjs.com/package/react-refresh)) using [the Electron-React-Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)
    * MyApp Framework
      * MyModules


## Update Packages

1. `npm outdated` - Lists all the outdated Packages
2. open `package.json`
3. Goto https://www.npmjs.com/
4. Loop: Search for every dependencies and devDependencies an check if there is an update..
   1. read the release infos for breaking changes
   2. adjust the version numbers carefully in package.json
   3. npm update packagename --save
   4. repeat

or all at once:

`npm update --save` bzw `npm update --save-dev`
