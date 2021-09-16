const package = require('./package.json');

// To get this key:
// - In Chrome, pack your extension and load it
// - Navigate to ~/Library/Application Support/Google/Chrome/Default/Extensions/<id>/<version>
// - Get the key from the manifest.json file
// - Save the key.pem file generated in the root of the project
const publicKey = '';

module.exports = (buffer, includeKey = false) => {
  let manifest = {
    ...JSON.parse(buffer.toString()),
    version: package.version,
    author: package.author,
    description: package.description
  };
  if (includeKey && publicKey.length) {
    manifest = {
      ...manifest,
      key: publicKey
    };
  }
  return JSON.stringify(manifest, null, 2);
}
