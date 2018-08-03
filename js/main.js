var cid = "a3e059563d7fd3372b49b37f00a00bcf";
var _shutter;
var _lucidinfo;

function initHash() {
  $(window).hashchange(function() {
    var hash = location.hash;
    var cleanHash = (hash.replace(/^#/, '') || 'blank');

    switch (cleanHash.split("-")[0]) {
      case 'blank':
        _shutter.openContent("home");
        break;
      case 'releases':
        _shutter.openContent("releases");
        break;
      case 'team':
        _shutter.openContent("team");
        break;
      case 'contact':
        _shutter.openContent("contact");
        break;
      default:
        _shutter.openContent("home");
        break;
    }
  });

  $(window).hashchange();
}

function initPage() {
  _shutter = $("#content").shutter({});
  _lucidinfo = $("#content").lucidinfo({});
  _lucidinfo.updateInfo();
  _lucidinfo.addTeam();

  $('#button-home').click(function() {
    _shutter.closeContent("");
  });
  $('#button-releases').click(function() {
    _shutter.closeContent("releases");
  });
  $('#button-team').click(function() {
    _shutter.closeContent("team");
  });
  $('#button-contact').click(function() {
    _shutter.closeContent("contact");
  });
  $("#tickets-mount").click(function() {
    window.open("https://www.eventbrite.com/e/mount-lucid-tickets-46342613003");
  });
}

jQuery.fn.shutter = function(opts) {
  opts = jQuery.extend({}, jQuery.fn.shutter.defs, opts);

  jQuery.fn.shutter.defs = {};

  var instance = this;
  var element = jQuery(this);

  this.initialize = function() {
    return this;
  }

  this.closeContent = function(newHash) {
    $(element).css("flex", "0");
    setTimeout(function() {
      window.location.hash = newHash;
    }, 500)
  }

  this.setButtonActive = function(link) {
    $(".navbar-button").each(function(ind, obj) {
      $(obj).removeClass("active");
    });
    $("#button-" + link).addClass("active");
  }

  this.openContent = function(link) {
    element.get(0).scroll(0, 0);
    this.setContent(link);
    this.setButtonActive(link);
    $(element).css("flex", "1");
    document.getElementById("content").focus();
  }

  this.setContent = function(link) {
    $(".content-page").each(function(ind, obj) {
      $(obj).removeClass("open");
    });
    $("#" + link).addClass("open");
  }

  return this.initialize();
}

jQuery.fn.lucidinfo = function(opts) {
  opts = jQuery.extend({}, jQuery.fn.lucidinfo.defs, opts);
  this.initialize = function() {
    return this;
  }
  jQuery.fn.lucidinfo.defs = {};

  var instance = this;
  var element = jQuery(this);
  var releases = [];
  var lucidmondayID = "203439010";
  var team = {
    0: {
      "name": "Julius Woods",
      "image_url": "https://scontent-sjc3-1.cdninstagram.com/vp/3e291de571e7c42acfaa8866868e146c/5B681EC6/t51.2885-15/sh0.08/e35/p640x640/28151166_1028028727335011_4138822424219090944_n.jpg",
      "subtitle": "CEO",
      "twitter": "https://twitter.com/julius_woods",
      "soundcloud": "https://soundcloud.com/sui-luj",
      "instagram": "https://www.instagram.com/juliuswulius/",
      "image_css": ""
    },
    1: {
      "name": "Callahan",
      "image_url": "https://scontent-sjc3-1.cdninstagram.com/vp/2fae909e92727426f37f08c804f5522e/5C08ECF3/t51.2885-15/sh0.08/e35/s640x640/31890418_592489991131155_6703278771673235456_n.jpg",
      "subtitle": "COO",
      "twitter": "https://twitter.com/cxllxhxn",
      "soundcloud": "https://soundcloud.com/cxllxhxn",
      "instagram": "https://www.instagram.com/calbailz/",
      "image_css": "transform: scale(1.3) translateX(2px);-webkit-filter: grayscale(100%);filter: grayscale(100%);"
    },
    2: {
      "name": "Alex Shortt",
      "image_url": "https://scontent-sjc3-1.cdninstagram.com/vp/f9e17764dadc9cd374897b8acd8c7884/5B629880/t51.2885-19/s150x150/29738095_166266414091863_4833150676991213568_n.jpg",
      "subtitle": "CTO",
      "twitter": "https://twitter.com/_alexshortt",
      "soundcloud": "https://soundcloud.com/alex_shortt",
      "instagram": "https://www.instagram.com/alexander.shortt/",
      "image_css": ""
    },
    3: {
      "name": "Benjamin Ha",
      "image_url": "https://scontent-sjc3-1.cdninstagram.com/vp/b21381963427ab5aa32973697b554fbb/5BD88F4C/t51.2885-15/sh0.08/e35/s640x640/20633978_101478907238454_6036685265920065536_n.jpg",
      "subtitle": "CFO",
      "twitter": "https://twitter.com/_benjaminha",
      "soundcloud": "https://soundcloud.com/benjamin-ha-6",
      "instagram": "https://www.instagram.com/_benjaminha/",
      "image_css": "transform: scale(1.6) translateX(-4px) translateY(7px);-webkit-filter: grayscale(100%);filter: grayscale(100%);"
    }
  }

  this.updateInfo = function(callback) {
    var url = "https://api.soundcloud.com/users/" + lucidmondayID + "/tracks?limit=10000&client_id=" + cid;
    $.get(url, function(data) {
      data.forEach(function(obj, ind) {
        var good = true;
        releases.forEach(function(obj2, ind2) {
          if (obj.id == obj2.id)
            good = false;
          }
        );
        if (good)
          releases.push(obj);
          //_lucidinfo.addTile(obj); _shutter.autoAnimateHeight(1);
        }
      );
      _lucidinfo.createReleasesGrid();
    });

    //loop through artistsUsernames and fill array with info on image, display name, bio, etc
  }

  this.addTile = function(obj) {
    var parent = $("#releases-wrap");
    var titleText = obj.title;
    var artist = obj.title.split(" - ")[0];
    var title = obj.title.split(" - ")[1];

    parent.append('\
            <div class="releases-tile">\
                    <img src="' + obj.artwork_url.replace("large", "t500x500") + '" />\
                    <div class="releases-text">\
                        <h2 style="' + (
      artist == null
      ? "display:none"
      : '') + '">' + artist + '</h2>\
                        <h3 style="' + (
      title == null
      ? "display:none"
      : '') + '">' + title + '</h3>\
                        <p id="track-' + obj.id + '" class="releases-animate-text">' + obj.description + '</p>\
                    </div>\
                    <div class="releases-dots">\
                        <span></span>\
                        <span></span>\
                        <span></span>\
                    </div>\
                </div>\
            ');

  }

  this.createReleasesGrid = function() {
    var delay = 0;
    releases.forEach(function(obj, num) {
      setTimeout(function() {
        _lucidinfo.addTile(obj);
      }, delay);
      if (delay < 150 * 9)
        delay += 150;
      }
    );
  }

  this.addTeam = function() {
    var container = $("#team-container");
    for (obj in team) {
      container.append('\
            <div class="team-grid-column">\
                <div class="team-grid-user">\
                    <div class="team-grid-user__avatar"><img style="' + team[obj].image_css + '" src="' + team[obj].image_url + '" /></div>\
                    <div class="team-grid-user__name">' + team[obj].name + '</div>\
                    <div class="team-grid-user__title">' + team[obj].subtitle + '</div>\
                    <ul class="team-grid-social">\
                        <li class="team-grid-social__item">\
                            <a href="' + team[obj].twitter + '" class="fa fa-twitter" aria-hidden="true">\
                                        \
                            </a>\
                        </li>\
                        <li class="team-grid-social__item">\
                            <a href="' + team[obj].instagram + '" class="fa fa-instagram" aria-hidden="true">\
                                        \
                            </a>\
                        </li>\
                        <li class="team-grid-social__item">\
                            <a href="' + team[obj].soundcloud + '" class="fa fa-soundcloud" aria-hidden="true">\
                                        \
                            </a>\
                        </li>\
                    </ul>\
                </div>\
            </div>\
            ');
    }
  }

  return this.initialize();
}
