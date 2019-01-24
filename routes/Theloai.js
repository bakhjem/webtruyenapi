var express = require("express");
var router = express.Router();
const request = require("request-promise");
const cheerio = require("cheerio");
var cookieParser = require("cookie-parser");

/* GET users listing. */
router.get("/", function(req, res, next) {
  var truyendata = {};
  const URL =
    "https://truyenvip.vn/";

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
  var tentheloai = null;
  var idtheloai = null;
  var totalpages = null;
  getPageContent(URL).then($ => {
    
    $(".sidebar-content ul li").each(function(result) {
        $(this)
        .find("a")
        .each(function() {
          tentheloai = $(this).text();
        
        var link =  $(this).attr('href');
        idtheloai = link.slice(link.search('/the-loai/')+10);
        // console.log(idchuong);
        });
        data.push({
            tentheloai: tentheloai,
            idtheloai: idtheloai
        })
    })
    
    res.send(JSON.stringify(data));
  });
  
});

module.exports = router;
