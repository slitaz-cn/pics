var express = require("express");
var router = require("./controller/router.js");

var app = express();

app.set("view engine", "ejs");

app.use("/", express.static("./public"));
app.use("/", express.static("./uploads"));

app.get("/", router.showIndex);
app.get("/:albumName", router.showAlbum);
app.get("/up", router.showUp);
app.post("/up", router.doPost);

app.use(function (req, res) {
  res.render("err");
});

app.listen(8084);
console.log("服务已启动，端口号8084...");
