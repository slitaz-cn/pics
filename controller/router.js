var file = require("../models/file.js");
var formidable = require("formidable");
var path = require("path");
var fs = require("fs");
var sd = require("silly-datetime");

exports.showIndex = function (req, res, next) {
  file.getAllAlbums(function (err, allAlbums) {
    if (err) {
      next();
      return;
    }
    res.render("index", {
      albums: allAlbums,
    });
  });
};

exports.showAlbum = function (req, res, next) {
  var albumName = req.params.albumName;
  file.getAllImagesByAlbumName(albumName, function (err, imagesArray) {
    if (err) {
      next();
      return;
    }
    res.render("album", {
      albumname: albumName,
      images: imagesArray,
    });
  });
};

exports.showUp = function (req, res) {
  file.getAllAlbums(function (err, albums) {
    res.render("up", {
      albums: albums,
    });
  });
};

exports.doPost = function (req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = path.normalize(__dirname + "/..");
  form.parse(req, function (err, fields, files, next) {
    if (err) {
      next();
      return;
    }
    var size = parseInt(files.picture.size);
    if (size > 2000000) {
      res.send("图片尺寸应该小于2M");
      fs.unlink(files.picture.path);
      return;
    }
    var ttt = sd.format(new Date(), "YYYYMMDDHHmmss");
    var ran = parseInt(Math.random() * 89999 + 10000);
    var extname = path.extname(files.picture.name);
    var floder = fields.floder;
    var oldpath = files.picture.path;
    var newpath = path.normalize(
      __dirname + "/../uploads/" + floder + "/" + ttt + ran + extname
    );

         fs.rename(oldpath, newpath, function(err){
             if(err){
                 res.send("改名失败");
                 return;
             }
             res.send("成功");
         });
    });
  return;
};
