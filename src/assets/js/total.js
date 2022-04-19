(function () {
  //统计
  var _hmt = _hmt || [];
  window.onload = function () {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?30e0c256bfc8ad60e33fcad5da3ad51d";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
    $('body').on("click", "[data-track]", function () {
      var label = $(this).data("track");
      // BA事件
      _hmt && _hmt.push(["_trackEvent", label, "click"]);
    });
  };
})();
