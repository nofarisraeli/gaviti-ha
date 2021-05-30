const { parse } = require("json2csv");

const fs = require("fs");
const util = require("util");

module.exports = {
  saveFromJsonToCSV(json, options, savingPath) {
    const finalCsv = parse(json, options);
    fs.writeFileSync(savingPath, finalCsv, {
        encoding: "utf8",
      })
  },
};
