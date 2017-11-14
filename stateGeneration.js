const { getPages, byCategory } = require('alexa-top-sites')
const VError = require('verror')

const siteCategories = [
  'Sports',
  'Science',
  'Shopping',
  'News',
  'Computers/Systems',
  'Computers/Data_Formats',
  'Computers/CAD_and_CAM'
]

function getFrame(url, tabsUnloaded) {
  return {
    "showOnRight": false,
    "src": url,
    "lastAccessedTime": 1510599912564,
    "computedThemeColor": "rgb(59, 89, 152)",
    "partition": "persist:default",
    "findDetail": {
      "searchString": "",
      "caseSensitivity": false
    },
    "hasBeenActivated": true,
    "endLoadTime": 1510599914847,
    "navbar": {
      "urlbar": {
        "location": url,
        "suggestions": {
          "selectedIndex": null,
          "searchResults": [],
          "suggestionList": null,
          "shouldRender": false,
          "autocompleteEnabled": false,
          "urlSuffix": "",
          "hasSuggestionMatch": false
        },
        "focused": false,
        "active": false
      }
    },
    "zoomLevel": 0,
    "index": 0,
    "partitionNumber": 0,
    "history": [
      "https://www.facebook.com/BraveSoftware/",
      "https://www.facebook.com/BraveSoftware/"
    ],
    "startLoadTime": 1510599914162,
    "provisionalLocation": url,
    "location": url,
    "fingerprintingProtection": {},
    "title": "Brave Software - 34 Photos - Internet Company -",
  //  "icon": "https://www.facebook.com/rsrc.php/yl/r/H3nktOa7ZMg.ico",
    "isPrivate": false,
    "hrefPreview": "",
    "unloaded": tabsUnloaded,
  }
}

async function getWindowState (frameCount, siteCategory, tabsUnloaded = false) {
  const pageCount = Math.ceil(frameCount / 50)
  try {
    const sites = await getPages(byCategory, siteCategory, pageCount)
    return {
      frames: sites.slice(0, frameCount).map(frameUrl => getFrame(frameUrl, tabsUnloaded))
    }
  }
  catch (e) {
    new VError(e, `Could not retrieve sample site list for category ${category}: `)
    throw e;
  }
}

module.exports = {
  getWindowState,
  siteCategories
}

