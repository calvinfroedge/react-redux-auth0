import fs from 'fs';

let { PROJECT_NAME, PROJECT_DESCRIPTION, GITHUB_USERNAME, AUTHOR_NAME, AUTHOR_EMAIL } = process.env;

if(!PROJECT_NAME || !PROJECT_DESCRIPTION || !GITHUB_USERNAME || !AUTHOR_NAME || !AUTHOR_EMAIL){
  console.error('Must provide PROJECT_NAME, PROJECT_DESCRIPTION, GITHUB_USERNAME, AUTHOR_NAME, AUTHOR_EMAIL as environment variables!');
  process.exit();
}

RegExp.quote = function(str) {
  return str.replace(/([.?*+^$[\]\\(){}-])/g, "\\$1");
};

String.prototype.replaceAll = function(search, replace)
{
  var re = new RegExp(RegExp.quote(search),"g");
  return this.replace(re, replace);
};

let oldName = 'react-redux-workbench';
let packageJSON = fs.readFileSync('./.package.json').toString();
let oldVersion = '"version": "'+JSON.parse(packageJSON).version+'"';
let newVersion = '"version": "0.0.1"';
let gitConfig = fs.readFileSync('./.gitconfig').toString();
let webpackConfig = fs.readFileSync('./.webpack.config.js').toString();
let projectName = PROJECT_NAME;
let repo = [GITHUB_USERNAME, `${projectName}`].join('/');
let gitConfigNew = gitConfig.replaceAll(`calvinfroedge/${oldName}`, repo);
let file = projectName.replaceAll(' ', '-').toLowerCase();
let packageJSONNEW = packageJSON.replaceAll(oldName, file).replaceAll('Calvin Froedge', AUTHOR_NAME).replaceAll('calvinfroedge@gmail.com', AUTHOR_EMAIL).replaceAll('description-customize-me', PROJECT_DESCRIPTION).replaceAll(oldVersion, newVersion);
let webpackConfigNEW = webpackConfig.replaceAll('ReactReduxWorkbench', projectName.replaceAll(' ', '')).replaceAll(oldName, file);
fs.writeFileSync('./.git/config', gitConfigNew);
fs.writeFileSync('./package.json', packageJSONNEW);
fs.writeFileSync('./webpack.config.js', webpackConfigNEW);
console.info('Wrote updates to package.json, .git/config, and wepback.config.js.\n');
