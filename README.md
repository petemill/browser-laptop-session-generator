Creates sample persisted data for Brave's browser-laptop.

### How to use

#### Params
`--out` (Required)

File location to write the generated state file to, e.g.
`node generate-session-store.js --out ~/Library/myname/Application\ Support\brave-test/session-store-1`

`--windows`

Amount of windows to create

`--tabs`

Number of tabs per window to create.

Uses alexa top sites to generate URLs to open in the number of tabs and windows you specify. Each window uses sites from a different category (such as Sports, News, Computers) in order to avoid duplication.

`--unloadedtabs`

Whether tabs should be created in the unloaded state. Defaults to **false**.