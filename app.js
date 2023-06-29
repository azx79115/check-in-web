const express = require("express");
const app = express();
const port = 3000;
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const router = require("./routes");
const path = require("path");
const mime = require("mime");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

// 樣板引擎
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: ".hbs",
  handlebars: Handlebars,
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
  },
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
//body資料
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
//套用快閃訊息
app.use(flash());
//res.local
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});
//路由
app.use(router);

// 伺服器
app.listen(port, () => {
  console.log("App is running on server");
});
