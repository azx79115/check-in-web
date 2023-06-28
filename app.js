const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const router = require("./routes");

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(
  express.static("public", {
    setHeaders: (res, path) => {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);
app.use(router);

app.listen(port, () => {
  console.log("App is running on server");
});
