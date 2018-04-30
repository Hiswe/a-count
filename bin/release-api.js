'use strict'

const shell = require( `shelljs` )
const path  = require( `path` )
const fs    = require( `fs` )

const { version } = require( `../packages/api/package.json` )
const BRANCH      = `release-api`

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
const copydir     = shell.exec(`mktemp -d /tmp/acount-api.XXX`, {silent: true})
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

shell.echo( `…server files…` )
shell.cp( `-r`, `./packages/api/server/.`, path.join(copydirPath, `/server`) )
shell.cp( `./packages/api/package.json`, copydirPath )
shell.echo( `…copy end` )
shell.echo( `…server files…` )
const files = shell.ls( `-AR`, path.join(copydirPath, `/server`) )
shell.echo( files )
// return teardown()
return shell.exit(1)
shell.cd( copydirPath )

// ////////
// // GIT
// ////////

// //----- SETTING A NEW BRANCH

// const tmpBranchName = `${BRANCH}-${version}`
// shell.echo( `checking out “${tmpBranchName}” branch` )

// // orphan branch for having a clean new branch
// const gitCheckout = shell.exec( `git checkout --orphan ${tmpBranchName} `, {silent: true})
// if (gitCheckout.code !== 0) {
//   shell.echo( `Unable to checkout` )
//   shell.echo(gitCheckout.stderr)
//   teardown()
//   shell.exit(1)
// }

// //----- ADDING THE FILES

// shell.exec( `git add .`, {silent: true} )
// shell.exec( `git commit -m "RELEASE – version ${version}"`, {silent: true} )

// //----- PUSHING THE FILES

// shell.echo( `pushing to “${BRANCH}” branch…` )
// const ghPagePush = shell.exec( `git push origin ${tmpBranchName}:${BRANCH} --force`, {silent: true} )
// if ( ghPagePush.code !== 0 ) {
//   shell.echo( `Error: Git push failed` )
//   shell.echo( ghPagePush.stderr )
//   teardown()
//   shell.exit( 1 )
// } else {
//   shell.echo( `…push done!` )
// }

// //----- TAGGING THE VERSION

// if ( bc.skipBump ) {
//   shell.echo( `Skipping pushing tag` )
//   shell.exit( 0 )
// }

// shell.echo( `tagging version…` )
// shell.exec( `git tag v${version}`, {silent: true} )
// const tagPush = shell.exec( `git push --tags`, {silent: true} )
// if ( tagPush.code !== 0 ) {
//   shell.echo( `Error: Git tag push failed` )
//   shell.echo( tagPush.stderr )
//   teardown()
//   shell.exit( 1 )
// } else {
//   shell.echo( `…tag push done!` )
// }

// // TEARDOW
// teardown()
