const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const router = require("./routes");
const path = require("path");
const mime = require("mime");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

app.use(express.urlencoded({ extended: true }));
// 載入靜態資料
app.use(
  express.static("public", {
    setHeaders: (res, path) => {
      const mimeType = mime.getType(path);
      if (mimeType) {
        res.set("Content-Type", mimeType);
      }
    },
  })
);

// session認證
app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize()); // 初始化Passport
app.use(passport.session()); // 啟動session功能
app.use(flash());
// 樣板引擎
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

//路由
app.use(router);

// 伺服器
app.listen(port, () => {
  console.log("App is running on server");
});
