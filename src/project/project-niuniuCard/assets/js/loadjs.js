(function () {
  //图片变大的方法
  return new Promise((resolve) => {
    var target = document.getElementsByTagName("script")[0];
    var js = document.createElement("script");
    js.src = "https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/smallCourse/pages/js/previewImage.min.js";
    target.parentNode.insertBefore(js, target);
    js.onload = () => {
      resolve(true);
    };
  });
})();