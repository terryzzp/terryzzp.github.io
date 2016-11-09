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
        $.ajax({
            url: "search", 
            data: {"for": "web", "s": value},
            success: function(data) {
                addResult(data, is_pic);
            }
        });
    } else {
        $.ajax({
            url: "search", 
            data: {"for": "pic", "s": value},
            success: function(data) {
                addResult(data, is_pic);
            }
        });
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
