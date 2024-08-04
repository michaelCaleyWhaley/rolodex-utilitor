const path = require("path");
const fs = require("fs");

async function findFilesAtDir(dirPath, callback) {
  try {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const file of files) {
      if (file.isDirectory()) {
        await filterHTML(`${dirPath}/${file.name}`);
      }

      callback(file.name);
    }
  } catch (err) {
    console.error(err);
  }
}

async function filterHTML(dirPath) {
  await findFilesAtDir(dirPath, (file) => {
    if (file.indexOf("html") === -1) return;
    fs.renameSync(`${dirPath}/${file}`, `${dirPath}/${file.split(".html")[0]}`);
  });
}

(async function () {
  await filterHTML(path.resolve(__dirname, "../out"));
})();
