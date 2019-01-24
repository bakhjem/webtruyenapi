var express = require("express");
var router = express.Router();
const request = require("request-promise");
const cheerio = require("cheerio");
var cookieParser = require("cookie-parser");

/* GET users listing. */
router.get("/", function(req, res, next) {
  var truyendata = {};
  var truyen = req.query.truyen;
  var pages = req.query.page;
  const URL =
    "https://truyenvip.vn/truyen/";

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
  var novelsname = null;
  var mota = null;
  var timeupdate = null;
  var theloai = null;
  var cover = null;
  var idtacgia = null;
  var tentruyen = null;
  var tacgia = null;
  var totalpages = null;
  getPageContent(URL + truyen+'?trang='+pages).then($ => {
    var page = $('.numbpage').text();
    totalpages = page.slice(page.search('/ ') + 2);
    cover = $(".detail-thumbnail img").attr('src');
    tentruyen = $(".detail-right h1").text();
    tacgia = $("ul.w3-ul li h2").text();
    var link = $("ul.w3-ul li h2 a").attr('href');
    idtacgia = link.slice(link.search('/tac-gia/')+9);
    theloai = $(".detail-info ul li:nth-child(2) a").text();
    mota = $("article").html();
    $("#divtab ul li").each(function(result) {
        $(this)
        .find("h4 a")
        .each(function() {
          tenchuong = $(this).text();
        
        var link =  $(this).attr('href');
        idchuong = link.slice(link.search('/doc-truyen/')+12);
        // console.log(idchuong);
        });
        $(this)
        .find("span")
        .each(function() {
          timeupdate = $(this).text();
        });
        data.push({
            tenchuong: tenchuong,
            idchuong: idchuong,
            timeupdate: timeupdate
        })
        // console.log(result)
    })
    truyendata = {
      totalpages: totalpages,
      tentruyen: tentruyen,
      idtruyen: truyen,
      page: pages,
      cover: cover,
      tacgia: tacgia,
      idtacgia: idtacgia,
      theloai: theloai,
      mota: mota,
      chuong: data
  }
    res.send(JSON.stringify(truyendata));
  });
  
});

module.exports = router;
