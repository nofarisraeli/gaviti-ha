const mongoose = require("mongoose");
const DB_URI = "mongodb+srv://app:pass@cluster0.fkb37.mongodb.net/gaviti-ha?retryWrites=true&w=majority"
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.on("connected", () => {
  console.log("Mongoose default connection open to " + DB_URI);
});

// When the connection is disconnected
db.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  db.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});