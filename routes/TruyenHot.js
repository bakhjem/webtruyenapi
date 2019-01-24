var express = require("express");
var router = express.Router();
const request = require("request-promise");
const cheerio = require("cheerio");
var cookieParser = require("cookie-parser");

/* GET users listing. */
router.get("/", function(req, res, next) {
  var truyen = [];
  var pages = req.query.page;
  const URL =
    "https://truyenvip.vn/the-loai/truyen-duoc-xem-nhieu-nhat";

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
  var lasterchapter = null;
  var timeupdate = null;
  var chuongmoi = null;
  var cover = null;
  var idtacgia = [];
  var tentruyen = null;
  var tacgia = null;
  var totalpages = null;
  getPageContent(URL +'?trang='+ pages).then($ => {
    
    var page = $('.numbpage').text();
    totalpages = page.slice(page.search('/ ') + 2);
    var ten = $('.title-left h1 a').text();
    $(".list-content .list-row-img").each(function(result) {
        $(this)
        .find("a img")
        .each(function() {
          cover = $(this).attr('data-src');
        // console.log(cover);
        //   console.log(idnovel);
        });
        $(this)
        .find(".row-info h3 a")
        .each(function() {
          tentruyen = $(this).text();
          var link =  $(this).attr('href');
          idtruyen = link.slice(link.search('/truyen/')+8);
        
        });
        $(this)
        .find(".row-info span.row-author a")
        .each(function() {
          tacgia = $(this).text();
          var link =  $(this).attr('href');
          idtacgia = link.slice(link.search('/tac-gia/')+9);
        //   console.log(idnovel);
        });
        $(this)
        .find(".row-number .row-chapter")
        .each(function() {
          chuongmoi = $(this).text();
        });
        $(this)
        .find(".row-number .row-time")
        .each(function() {
          timeupdate = $(this).text();
        // console.log(timeupdate);
        //   console.log(idnovel);
        });
        data.push({
            idtruyen:idtruyen,
            tentruyen:tentruyen,
            cover:cover,
            tacgia:tacgia,
            idtacgia:idtacgia,
            chuongmoi:chuongmoi,
            timeupdate:timeupdate
        })
    })
    console.log(totalpages);
    truyen.push({
        totalpages: totalpages,
        page: pages,
        ten: ten,
        data: data
    })

    res.send(JSON.stringify(truyen));
  });
});

module.exports = router;
