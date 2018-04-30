'use strict'

const shell = require( `shelljs` )
const path  = require( `path` )
const fs    = require( `fs` )

const { version } = require( `../packages/api/package.json` )
const BRANCH      = `release-webapp`
const APP_PATH    = `./packages/web-app`

shell.echo( `beginning API release` )

if ( !shell.which(`git`) ) {
  shell.echo( `Sorry, this script requires git` )
  shell.exit( 1 )
}

const currentBranch = shell.exec( `git branch`, {silent: true} ).grep( /^\*/ )
const branchName    = currentBranch.stdout.replace( /[\*\n\s]/g, `` )

if (branchName !== `master`) {
  shell.echo( `Sorry, you need to be on the master branch` )
  shell.exit( 1 )
}

////////
// INITIALIZING FOLDERS & HELPERS
////////

const originalDir = shell.pwd()
const copydir     = shell.exec(`mktemp -d /tmp/acount-webapp.XXX`, {silent: true})
// stdout come with a linebreak. Remove it for better path joining
const copydirPath = copydir.stdout.replace(`\n`, ``)

const teardown = (exitCode = 0) => {
  shell.cd( originalDir )
  shell.rm( `-Rf`, copydirPath )
  shell.exit( exitCode )
}

shell.echo( `temp dir will be created at: ${copydirPath}`)

////////
// COPYING FILES TO TMP
////////

shell.echo( `begin copy…` )

//----- GIT FILES

shell.echo( `…git files…` )
shell.cp( `-r`, `./.git/.`, path.join(copydirPath, `/.git`) )

//----- DIST FILES

shell.echo( `…web-app files…` )
shell.mkdir( `-p`, path.join(copydirPath, `/server/public`) )
shell.cp( `-r`, `${APP_PATH}/server/public/.`, path.join(copydirPath, `/server/public`) )
shell.cp( `${APP_PATH}/application-server.js`, copydirPath )
shell.cp( `${APP_PATH}/package.json`, copydirPath )
shell.cp( `${APP_PATH}/Procfile`, copydirPath )
shell.cp( `${APP_PATH}/yarn.lock`, copydirPath )
shell.echo( `…copy end` )

////////
// GIT
////////

shell.cd( copydirPath )

//----- SETTING A NEW BRANCH

const tmpBranchName = `${BRANCH}-${version}`
shell.echo( `checking out “${tmpBranchName}” branch` )

// orphan branch for having a clean new branch
const gitCheckout = shell.exec( `git checkout --orphan ${tmpBranchName} `, {silent: true})
if (gitCheckout.code !== 0) {
  shell.echo( `Unable to checkout` )
  shell.echo(gitCheckout.stderr)
  teardown( 1 )
}

//----- ADDING THE FILES

shell.exec( `git add .`, {silent: true} )
shell.exec( `git commit -m "RELEASE – version ${version}"`, {silent: true} )

//----- PUSHING THE FILES

shell.echo( `pushing to “${BRANCH}” branch…` )
const ghPagePush = shell.exec( `git push origin ${tmpBranchName}:${BRANCH} --force`, {silent: true} )
if ( ghPagePush.code !== 0 ) {
  shell.echo( `Error: Git push failed` )
  shell.echo( ghPagePush.stderr )
  teardown( 1 )
}
shell.echo( `…push done!` )

// TEARDOWN
teardown()
