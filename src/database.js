const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://facu:facu@cluster0.bo19d.mongodb.net/facu?retryWrites=true&w=majority",
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    }
  )

  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error(err));
