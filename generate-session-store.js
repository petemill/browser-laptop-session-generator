var argv = require('minimist')(process.argv.slice(2), {
  boolean: ['unloadedtabs']
});
const stateGeneration = require('./stateGeneration')
const fs = require('fs')

writeFile = (path, data, options) => new Promise((resolve, reject) => fs.writeFile(path, data, options, (err) => {
  if (err) {
    return reject()
  }
  resolve()
}))

// collect data
const windowCount = argv.windows || 1
const tabsPerWindow = argv.tabs || 10
const tabsUnloaded = argv.unloadedtabs
const writeFileLocation = argv.out

//validate
if (!writeFileLocation) {
  console.error('Must specify a file locatino to write to, using the --out parameter')
  process.exit(1)
}

// required props for state
const state = {
  perWindowState: [],
  firstRunTimestamp: 1510363686014,
}


// main operation
async function generate() {
  // create windows and tabs
  const windowOps = [ ]
  for (let i = 0; i < windowCount; i++) {
    windowOps.push(stateGeneration.getWindowState(tabsPerWindow, stateGeneration.siteCategories[i], tabsUnloaded))
  }
  const framesByWindow = await Promise.all(windowOps)
  state.perWindowState.push(...framesByWindow)
  // done
  return state
}


generate()
// write to disk
.then(async state => {
  await writeFile(writeFileLocation, JSON.stringify(state, null, 2), { encoding: 'utf8' })
  console.log(`Sample state generated and written to ${writeFileLocation}`)
  process.exit(0)
})
// handle error
.catch(err => {
  console.error(err)
  process.exit(1)
})