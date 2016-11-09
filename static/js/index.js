//------------------------------------------------------
// Author: Terry Zhang (Zhang zong pu)
// E-mail: sjtuzzp@foxmail.com
// 
// All rights reserved.
//
//------------------------------------------------------

var isSearched = 0;
var allTimeout = [];

function sendPost(is_pic = false) {
    // console.log(1);
    var value = $("#search-form").val();
    for (var i = 0; i < allTimeout.length; ++i) {
        clearTimeout(allTimeout[i]);
    }
    allTimeout = [];

    console.log("Search: " + value);
    if (!is_pic) {
        // $.ajax({
        //     url: "search", 
        //     data: {"for": "web", "s": value},
        //     success: function(data) {
        //         addResult(data, is_pic);
        //     }
        // });
        var data = '{"content": [{"URL": "http://v.baidu.com", "hl": " \u8ddd\u79bb 906 1 \u4e07 5 \u6821\u82b1 \u7684 \u8d34\u8eab \u9ad8\u624b 882 8 \u4e07 6 \u5c0f \u522b\u79bb 860 2 \u4e07 7 \u7ed3\u5a5a \u4e3a\u4ec0\u4e48 831 3 \u4e07 8 \u65b0 \u8fb9\u57ce \u6d6a\u5b50 778 8 \u4e07 9 \u9ebb\u8fa3 \u53d8\u5f62 <B>\u8ba1</B> 716 6 \u4e07", "title": "\u767e\u5ea6 \u89c6\u9891 \u641c\u7d22 \u5168\u7403 \u6700\u5927 \u4e2d\u6587 \u89c6\u9891 \u641c\u7d22\u5f15\u64ce \n"}], "total": 1}';
        addResult(data, is_pic);
    } else {
        // $.ajax({
        //     url: "search", 
        //     data: {"for": "pic", "s": value},
        //     success: function(data) {
        //         addResult(data, is_pic);
        //     }
        // });
        var data = '{"content": [{"URL": "https://s.taobao.com/search?q=%E8%A1%A3%E6%9C%8D%E5%A5%B3&rs=up&rsclick=2&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search1.alicdn.com/img/bao/uploaded/i4/i1/635900780/TB2QIx6tVXXXXXSXXXXXXXXXXXX_!!635900780.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u5973 \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E8%A1%A3%E6%9C%8D%E5%A5%B3&rs=up&rsclick=2&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search1.alicdn.com/img/bao/uploaded/i4/i3/TB1qnacNXXXXXcnapXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u5973 \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E8%A1%A3%E6%9C%8D&imgfile=&js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20161024&ie=utf8", "imgurl": "http://g-search1.alicdn.com/img/bao/uploaded/i4/i4/TB1lDMSNFXXXXbIXpXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://www.taobao.com/sitemap.php?id=sitemap2", "imgurl": "http://g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i4/167710306440656014/TB2bohfaSmK.eBjSZPfXXce2pXa_!!0-saturn_solar.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://www.taobao.com/sitemap.php?id=sitemap2", "imgurl": "http://g-search2.alicdn.com/img/bao/uploaded/i4/i1/TB1YzrPNpXXXXc_XFXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E8%A1%A3%E6%9C%8D&imgfile=&js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20161024&ie=utf8", "imgurl": "http://g-search2.alicdn.com/img/bao/uploaded/i4/i2/TB1ACkWNXXXXXXjXXXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E8%A1%A3%E6%9C%8D%E5%A5%B3&rs=up&rsclick=2&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search2.alicdn.com/img/bao/uploaded/i4/i2/TB1XNF_NXXXXXbvXXXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u5973 \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E9%B9%BF%E6%99%97%E5%90%8C%E6%AC%BE%E8%A1%A3%E6%9C%8D&rs=up&rsclick=9&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search2.alicdn.com/img/bao/uploaded/i4/i3/1658269220/TB2wzYtmXXXXXX.XpXXXXXXXXXX_!!1658269220.jpg_180x180.jpg", "urltitle": "tfboys \u540c\u6b3e \u8863\u670d \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://www.taobao.com/sitemap.php?id=sitemap2", "imgurl": "http://g-search2.alicdn.com/img/bao/uploaded/i4/i3/TB1fBAzMVXXXXXBXpXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E8%A1%A3%E6%9C%8D%E7%94%B7&rs=up&rsclick=1&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search3.alicdn.com/img/bao/uploaded/i4/i1/TB1SJtuNXXXXXXBXXXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u7537 \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E8%A1%A3%E6%9C%8D%E7%94%B7&rs=up&rsclick=1&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search3.alicdn.com/img/bao/uploaded/i4/i1/TB1YzrPNpXXXXc_XFXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u7537 \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://www.taobao.com/sitemap.php?id=sitemap2", "imgurl": "http://g-search3.alicdn.com/img/bao/uploaded/i4/i2/TB1ACkWNXXXXXXjXXXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E9%B9%BF%E6%99%97%E5%90%8C%E6%AC%BE%E8%A1%A3%E6%9C%8D&rs=up&rsclick=9&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search3.alicdn.com/img/bao/uploaded/i4/i3/1789811513/TB29CGpXseK.eBjSszgXXczFpXa_!!1789811513.jpg_180x180.jpg", "urltitle": "tfboys \u540c\u6b3e \u8863\u670d \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://www.taobao.com/sitemap.php?id=sitemap2", "imgurl": "http://g-search3.alicdn.com/img/bao/uploaded/i4/i3/TB14LpuNXXXXXbGaXXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E8%A1%A3%E6%9C%8D%E7%94%B7&rs=up&rsclick=1&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search3.alicdn.com/img/bao/uploaded/i4/i3/TB1fBAzMVXXXXXBXpXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u7537 \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E8%A1%A3%E6%9C%8D%E7%94%B7&rs=up&rsclick=1&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search3.alicdn.com/img/bao/uploaded/i4/i3/TB1QVPrNpXXXXXfXFXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u7537 \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E9%B9%BF%E6%99%97%E5%90%8C%E6%AC%BE%E8%A1%A3%E6%9C%8D&rs=up&rsclick=9&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search3.alicdn.com/img/bao/uploaded/i4/i3/TB1RfpaJXXXXXXDXVXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "tfboys \u540c\u6b3e \u8863\u670d \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E9%B9%BF%E6%99%97%E5%90%8C%E6%AC%BE%E8%A1%A3%E6%9C%8D&rs=up&rsclick=9&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search3.alicdn.com/img/bao/uploaded/i4/i4/1789811513/TB2IoIEkXXXXXXSXXXXXXXXXXXX_!!1789811513.jpg_180x180.jpg", "urltitle": "tfboys \u540c\u6b3e \u8863\u670d \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E8%A1%A3%E6%9C%8D%E5%A5%B3&rs=up&rsclick=2&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search3.alicdn.com/img/bao/uploaded/i4/i4/306104195/TB2UaTWaKTyQeBjSspmXXazkXXa_!!306104195.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u5973 \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E9%B9%BF%E6%99%97%E5%90%8C%E6%AC%BE%E8%A1%A3%E6%9C%8D&rs=up&rsclick=9&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search3.alicdn.com/img/bao/uploaded/i4/i4/674352342/TB2i2QGlXXXXXXFXpXXXXXXXXXX_!!674352342.jpg_180x180.jpg", "urltitle": "tfboys \u540c\u6b3e \u8863\u670d \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E8%A1%A3%E6%9C%8D%E7%94%B7&rs=up&rsclick=1&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search3.alicdn.com/img/bao/uploaded/i4/i4/TB1lDMSNFXXXXbIXpXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u7537 \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?type=similar&app=i2i&rec_type=&uniqpid=-1609672793&nid=525042344242", "imgurl": "http://tps://img.alicdn.com/bao/uploaded/i3/TB1fBAzMVXXXXXBXpXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg", "urltitle": "2016 \u79cb\u88c5 \u65b0\u6b3e \u7eaf\u68c9 \u4fee\u8eab \u957f\u8896 t \u6064 \u7537 \u5706\u9886 \u9752\u5e74 \u7537\u88c5 \u97e9\u7248 \u6253\u5e95 \u886b \u6f6e\u4e0a \u8863\u670d tmall com \u5929\u732b \n"}, {"URL": "https://s.taobao.com/search?q=%E8%A1%A3%E6%9C%8D&imgfile=&js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20161024&ie=utf8", "imgurl": "http://g-search1.alicdn.com/img/bao/uploaded/i4/i1/TB1svrsNFXXXXXCaXXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E8%A1%A3%E6%9C%8D&imgfile=&js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20161024&ie=utf8", "imgurl": "http://g-search1.alicdn.com/img/bao/uploaded/i4/i4/TB1IDRYLpXXXXXUaXXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E9%B9%BF%E6%99%97%E5%90%8C%E6%AC%BE%E8%A1%A3%E6%9C%8D&rs=up&rsclick=9&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search2.alicdn.com/img/bao/uploaded/i4/i1/674352342/TB2vtVgXX15V1Bjy1XbXXaNcVXa_!!674352342.jpg_180x180.jpg", "urltitle": "tfboys \u540c\u6b3e \u8863\u670d \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://www.taobao.com/sitemap.php?id=sitemap2", "imgurl": "http://g-search2.alicdn.com/img/bao/uploaded/i4/i1/TB1svrsNFXXXXXCaXXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://www.taobao.com/sitemap.php?id=sitemap2", "imgurl": "http://g-search2.alicdn.com/img/bao/uploaded/i4/i4/TB1IDRYLpXXXXXUaXXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E8%A1%A3%E6%9C%8D%E5%A5%B3&rs=up&rsclick=2&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search3.alicdn.com/img/bao/uploaded/i4/i1/TB1aoUYKVXXXXbsXVXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u5973 \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E8%A1%A3%E6%9C%8D%E7%94%B7&rs=up&rsclick=1&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search3.alicdn.com/img/bao/uploaded/i4/i1/TB1svrsNFXXXXXCaXXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u7537 \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E9%B9%BF%E6%99%97%E5%90%8C%E6%AC%BE%E8%A1%A3%E6%9C%8D&rs=up&rsclick=9&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search3.alicdn.com/img/bao/uploaded/i4/i2/TB10chvIpXXXXcvXFXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "tfboys \u540c\u6b3e \u8863\u670d \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E8%A1%A3%E6%9C%8D%E5%A5%B3&rs=up&rsclick=2&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search3.alicdn.com/img/bao/uploaded/i4/i2/TB1oaQuKpXXXXcVXpXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u5973 \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://s.taobao.com/search?q=%E8%A1%A3%E6%9C%8D%E7%94%B7&rs=up&rsclick=1&preq=%E8%A1%A3%E6%9C%8D", "imgurl": "http://g-search3.alicdn.com/img/bao/uploaded/i4/i4/TB1IDRYLpXXXXXUaXXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg", "urltitle": "\u8863\u670d \u7537 \u6dd8\u5b9d \u641c\u7d22 \n"}, {"URL": "https://detail.tmall.com/item.htm?id=537677079213&ns=1&abbucket=0", "imgurl": "http://tps://img.alicdn.com/bao/uploaded/i1/TB1svrsNFXXXXXCaXXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg", "urltitle": "\u4e1d\u5149\u68c9 \u957f\u8896 t \u6064 \u7537 \u5706\u9886 \u70eb\u91d1 \u8863\u670d \u7537\u58eb \u79cb\u88c5 \u6253\u5e95 \u886b \u9752\u5e74 \u97e9\u7248 \u5927\u7801 \u4f53\u6064 \u6f6e tmall com \u5929\u732b \n"}], "total": 33}';
        addResult(data, is_pic);
    }
}

// Should add a callback of enter keydown.

function addResult(data, is_pic) {
    if (isSearched == 0) {


        var bigTopic = $("#bigTopic");
        bigTopic.fadeOut("normal", function() {
            bigTopic.css({
                'text-align': 'left',
                'font-size': '50px',
                'padding-left': '30px',
                'float': 'left'
            });
            bigTopic.fadeIn();
        });

        $("#subTopic").fadeOut();

        var form = $('#form');
        form.fadeOut("normal", function() {
            form.css({
                'padding-top': "10px"
            });
            form.fadeIn();
        });

        // Remove the p5 canvas.
        noLoop();
        remove();
    }

    $("#result").remove();
    $("body").append("<div id='result'></div>");
    $("#result").css({
        'margin': '30px 10px 10px 10px',
        'padding': '10px',
        'border-radius': '3px',
        'border': '1.5px solid rgba(0, 0, 0, 0.19)'
    })
    $("#result").fadeOut(10);


    var json = eval ("(" + data + ")");
    var total = json["total"];
    var max_cnt = total > 16 ? 16 : total;
    var contents = json["content"];
    var results = [];

    if (!is_pic) {
        for (var i = 0; i < contents.length; ++i) {
            var url = contents[i]["URL"];
            var hl = contents[i]["hl"];
            var title = contents[i]["title"];

            var oneResult = "<div class='result'><a class='title' href='" + url + "'>" + title.split(' ').join('') + "</a>" +
                "</br>" + hl + "</br><a class='href' href='" + url + "'>" + url + "</a></div>";
            results.push(oneResult);
        }
        for (var i = 0; i < max_cnt; ++i) {
            var name = "res" + i.toString();
            $("#result").append("<div id='" + name + "'></div>");
            name = "#" + name;
            $(name).fadeOut(10);
            $(name).html(results[i]);
            // console.log(1);
            // var t = setTimeout("$(global_name).fadeIn()", 400);
        }
        // No better solutions have been found.
        allTimeout.push(setTimeout('$("#result").fadeIn()', 1000));
        allTimeout.push(setTimeout('$("#res0").fadeIn()', 1000));
        allTimeout.push(setTimeout('$("#res1").fadeIn()', 2000));
        allTimeout.push(setTimeout('$("#res2").fadeIn()', 3000));
        allTimeout.push(setTimeout('$("#res3").fadeIn()', 4000));
        allTimeout.push(setTimeout('$("#res4").fadeIn()', 5000));
        allTimeout.push(setTimeout('$("#res5").fadeIn()', 6000));
        allTimeout.push(setTimeout('$("#res6").fadeIn()', 7000));
        allTimeout.push(setTimeout('$("#res7").fadeIn()', 8000));
        allTimeout.push(setTimeout('$("#res8").fadeIn()', 9000));
        allTimeout.push(setTimeout('$("#res9").fadeIn()', 10000));
        allTimeout.push(setTimeout('$("#res10").fadeIn()', 11000));
        allTimeout.push(setTimeout('$("#res11").fadeIn()', 12000));
        allTimeout.push(setTimeout('$("#res12").fadeIn()', 13000));
        allTimeout.push(setTimeout('$("#res13").fadeIn()', 14000));
        allTimeout.push(setTimeout('$("#res14").fadeIn()', 15000));
        allTimeout.push(setTimeout('$("#res15").fadeIn()', 16000));
    } else {
        for (var i = 0; i < contents.length; ++i) {
            var urltitle = contents[i]["urltitle"];
            var url = contents[i]["URL"];
            var imgurl = contents[i]["imgurl"];

            // var oneResult = "<a class='result'><a class='title' href='" + url + "'>" + urltitle.split(' ').join('') + "</a>" +
            //     "</br><img class='pic' src='" + imgurl + "' alt='" + imgurl + "'></img></div>";
            var oneResult = "<a href='" + url + "'><img src='" + imgurl + "' /><div><span>" + urltitle + "</span></div></a>";
            results.push(oneResult);
        }
        $("#result").append('<ul id="da-thumbs" class="da-thumbs" align="center"></ul>');
        $("#result").css('border', '0px');
        for (var i = 0; i < max_cnt; ++i) {
            var name = "res" + i.toString();
            $("#da-thumbs").append("<li id='" + name + "'></li>");
            name = "#" + name;
            // $(name).fadeOut(10);
            $(name).html(results[i]);
            // console.log(1);
            // var t = setTimeout("$(global_name).fadeIn()", 400);
        }
        allTimeout.push(setTimeout('$("#result").fadeIn()', 1000));
    }
    isSearched = 1;
}
