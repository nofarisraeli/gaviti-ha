const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  createdAt: { type: Date, required: true },
  customerId: { type: String, required: true },
  invoiceId: { type: String, required: true },
});

const invoiceModel = mongoose.model("Invoice", InvoiceSchema);

module.exports = invoiceModel;
