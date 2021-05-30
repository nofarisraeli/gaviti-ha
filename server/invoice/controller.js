const invoiceModel = require("./model");
const { saveFromJsonToCSV } = require("../utils/csv");

module.exports = {
  searchInvoiceByDates({ startDate, endDate }) {
    const csvFields = ["createdAt", "customerId", "invoiceId"];
    const csvPath = "invoiceResult.csv";

    if (!startDate || !endDate) {
      return;
    }

    invoiceModel
      .find({
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .then((data) => {
        if (!data) return;

        // Save the results in a CSV file + return a download link
         saveFromJsonToCSV(data, { csvFields }, csvPath);
         return csvPath;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
};
