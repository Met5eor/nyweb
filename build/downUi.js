
//文件下载
var fs = require("fs");
var path = require("path");
var request = require("request");
getfileByUrl('https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/202224ui',path.join(dirPath, fileName),'file')
/**
 * 
 * @param {*} url  网络文件url地址
 * @param {*} fileName 	文件名
 * @param {*} dir 下载到的目录
 */
 function getfileByUrl(url,fileName,dir){
    console.log('------------------------------------------------')
    console.log(url)
    console.log(fileName)
    console.log(dir)
    let stream = fs.createWriteStream(path.join(dir, fileName));
    request(url).pipe(stream).on("close", function (err) {
        console.log("文件" + fileName + "下载完毕");
    });
}

function makeDir(dirpath) {
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split("/").forEach(function(dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {　
                if(dirname){
                    pathtmp = dirname;
                }else{
                    pathtmp = "/"; 
                }
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp)) {
                    return false;
                }
            }
        });
    }else{
        deleteFolderFiles(dirpath);
    }
    return true;
}

// //创建文件夹目录
// var dirPath = path.join(__dirname, "ucan-ui");
// if (!fs.existsSync(dirPath)) {
//     fs.mkdirSync(dirPath);
//     console.log("文件夹创建成功");
// } else {
//     console.log("文件夹已存在");
// }

// //循环多线程下载
// for (let i = 0; i < 60; i++) {
//     let fileName = "out" + intToString(i, 3) + ".ts";
//     let url = "https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/202224ui" + fileName;
//     let stream = fs.createWriteStream(path.join(dirPath, fileName));
//     request(url).pipe(stream).on("close", function (err) {
//         console.log("文件[" + fileName + "]下载完毕");
//     });
// }

// //整数转字符串，不足的位数用0补齐
// function intToString(num, len) {
//     let str = num.toString();
//     while (str.length < len) {
//         str = "0" + str;
//     }
//     return str;
// }