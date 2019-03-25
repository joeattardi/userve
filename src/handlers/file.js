const fs = require('fs-extra');

exports.sendFile = async function sendFile(resourcePath, request, response) {
  const fileContents = await fs.readFile(resourcePath);

  response.end(fileContents);
};
