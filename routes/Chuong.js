var express = require("express");
var router = express.Router();
const request = require("request-promise");
const cheerio = require("cheerio");
var cookieParser = require("cookie-parser");

/* GET users listing. */
router.get("/", function(req, res, next) {
  var truyendata = {};
  var chuong = req.query.chuong;
  
  const URL =
    "https://truyenvip.vn/doc-truyen/";

  const getPageContent = uri => {
    const options = {
      uri,
      headers: {
        "User-Agent": "Request-Promise"
      },
      transform: body => {
        return cheerio.load(body);
      }
    };

    return request(options);
  };
  var data = [];
  var idtruyen = null;
  var chuongtruoc = null;
  var timeupdate = null;
  var theloai = null;
  var idchuong = null;
  var tenchuong = null;
  var tentruyen = null;
  var tacgia = null;
  var tenchap = null;
  var noidungchuong = null;
  var danhsachchuong = [];
  getPageContent(URL +chuong).then($ => {
    tentruyen = $(".chapter-header h1").text();
    var link =  $(".chapter-header h1 a").attr('href');
    idtruyen = link.slice(link.search('/truyen/')+8);
    tenchuong = $(".chapter-header h3").text();
    tacgia = $(".chapter-header h2").text();

    $("#getListChapter option").each(function(result) {
        
             idchuong = $(this).attr('value');
             tenchap = $(this).text();
        danhsachchuong.push({
            tenchuong: tenchap,
            idchuong: idchuong
        })
        
    })
    // console.log(danhsachchuong);
    noidungchuong = $("#content").html();

    data = {
      tentruyen: tentruyen,
      idtruyen: idtruyen,
      tenchuong: tenchuong,
      idchuong: chuong,
      tacgia: tacgia,
      noidungchuong: noidungchuong,
      danhsachchuong: danhsachchuong
    }

    res.send(JSON.stringify(data));
  });
  
});

module.exports = router;
