(function () {
  /*设置html的font-size函数*/
  function setREM() {
    var html = document.documentElement;
    var htmlW = html.clientWidth;
    if (htmlW < 1200) {
      htmlW = 1200;
    }
    /*当设计稿为750px*/
    html.style.fontSize = htmlW / 19.2 + "px";
  }
  setREM();
  /*监听窗口变化动态设置html的font-size值*/
  window.addEventListener("resize", setREM, false);
})();