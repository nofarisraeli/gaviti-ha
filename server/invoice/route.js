const express = require("express");
const router = express.Router();
const invoiceController = require("./controller");
const path = require("path");

router.post("/search", (req, res, next) => {
  const { startDate, endDate } = req.query;
  invoiceController
    .searchInvoiceByDates({ startDate, endDate })
    .then((file) => {
      if (!file) {
        res.status(400).json();
      } else {
        res.download(path.join(__dirname, csvPath));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
