(function () {
  /*设置html的font-size函数*/
  function setREM() {
    var html = document.documentElement;
    var htmlW = html.clientWidth;

    if (htmlW > 640 && htmlW < 1100) {
      htmlW = 640;
    }
    /*当设计稿为750px*/
    html.style.fontSize = htmlW / 7.5 + "px";
  }
  setREM();
  /*监听窗口变化动态设置html的font-size值*/
  window.addEventListener("resize", setREM, false);
})();