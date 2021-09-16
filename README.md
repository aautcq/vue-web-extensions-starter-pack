# Vue Web Extension Starter Pack

Google Chrome extension running on Manifest V3 with a popup running on VueJS 3.2.
This README outlines the details of collaborating on this JS application.

## Prerequisites

You will need the following things properly installed on your computer:

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Google Chrome](https://www.google.com/intl/en_en/chrome/)

## Installation

* `git clone https://github.com/aautcq/vue-web-extensions-starter-pack.git`
* change into the new directory
* `npm install`
* Follow the instructions in the `update-manifest.js` file to keep a constant extension id in development and production

## Running / Development

* `npm run dev`

## Google Chrome configuration

* Open Google Chrome
* Go to Settings -> Extensions
* Activate Developer mode
* Click Load unpacked -> open the *vue-web-extension-starter-pack/dist* folder
* *[Facultative]* You can use [Extensions Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid) to facilitate development

### Building

* `npm run buildDev` (development)
* `npm run build` (production)

## Keep a constant extension id through development and prodution

* In Chrome, pack your extension and load it
* Navigate to the `Extensions` folder on your machine (Mac OS: `~/Library/Application Support/Google/Chrome/Default/Extensions/<id>/<version>`)
* Get the `"key"` value from the `manifest.json` file
* Save the `key.pem` file generated in the root of the project

## Known issues

* [Chrome extension CSS effects experience extreme lag on external monitors only](https://bugs.chromium.org/p/chromium/issues/detail?id=971701)
* [Manifest V3: webRequest listeners not called after service worker stops](https://bugs.chromium.org/p/chromium/issues/detail?id=1024211)

## Further Reading / Useful Links

* This extension runs using [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)
* The popup runs on [VueJS](https://v3.vuejs.org/)
