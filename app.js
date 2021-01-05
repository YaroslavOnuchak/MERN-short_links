const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/links.routes"));
app.use("/t/", require("./routes/redirect.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/0", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUrl"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(` app has been started ${PORT}`));
  } catch (error) {
    console.log("server Error  :>> ", error.message);
    process.exit(1);
  }
}
start();
