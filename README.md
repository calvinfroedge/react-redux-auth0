# Motivation

This project was borne out of the need to quickly spin up a new environment for authoring React + Redux components.

The hope is that you can essentially run `npm install && npm run development` and have a work panel with hot reloading for building your component interactively.

`react`, `webpack`, and `redux` are all used. Running `npm run development` starts a webpack dev server, and you can get to work building out your component!

When you're ready to run tests, you can run `npm test`.

If you want to customize the project to point at your github / npm repo, after `npm install` just customize this readme, clear out git commits from this project:

```
rm -rf .git
git init 
git add .
```

and run...

```js
PROJECT_NAME=foo-bar PROJECT_DESCRIPTION='A really cool project' GITHUB_USERNAME=foo AUTHOR_NAME="Calvin Froedge" AUTHOR_EMAIL=calvinfroedge@gmail.com npm run customize
``` 

# Important Commands

## `npm test`

Run tests (files in test folder named `TESTNAME.spec.js`) using mocha / expect.

## `npm build`

Builds for es, commonjs, umd. This is ignored in git, but will be included in npm package.

## `npm run development`

Starts the dev server. Go to `localhost:3000` to see your new component with live reload. You can pass `PORT` environment variable to customize this.

# When you're ready to publish...

Make sure you clean up the files you don't need! Here's a quick command:

`rm .gitconfig .webpack.config.js .package.json`
