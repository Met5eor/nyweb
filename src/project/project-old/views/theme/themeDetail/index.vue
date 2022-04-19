<template>
  <div>
    <div ref="main" class="main bg">
      <div class="header">
        <div class="d-flex a-center header-date">
          <img class="icon-date" src="./img/date.png" alt="">
          <div>{{themeInfo.updataDate}}更新</div>
          <div class="header-title font-22">——来自股牛牛股票</div>
        </div>
        <div class="bg-header-white">
          <div class="bg-header d-flex a-center j-sb">
            <div class="header-name">{{themeInfo.sName}}</div>
            <div class="header-num" :class="themeInfo.dChgRatio>0?'bg-red':themeInfo.dChgRatio<0?'bg-green': ''">
              {{themeInfo.dChgRatio | parseNum}}</div>
          </div>
        </div>
      </div>
      <div class="content bg-white">
        <!-- 题材投资逻辑 -->
        <div class="invest-logic">
          <div class="invest-logic-title">题材投资逻辑</div>
          <div class="bg-invest-logic-desc">
            <div class="invest-logic-desc p-rel">
              <img class="p-abs" src="./img/font.png" alt="">
              <div class="p-rel" v-html="themeInfo.sDriveEvent">
                {{themeInfo.sDriveEvent}}</div>
            </div>
          </div>
        </div>
        <!-- 题材图谱 -->
        <div class="theme-tree" v-show="isShowTree">
          <div class="theme-tree-title">题材图谱</div>
          <div class="theme-tree-header d-flex a-center j-sb">
            <div>题材名称</div>
            <div>最新涨幅</div>
          </div>
          <div class="theme-tree-desc">
            <div class="theme-tree-item">
              <div class="d-flex a-center first-layer">
                <img class="icon-open" src="./img/open.png" alt="">
                <div class="theme-name d-flex a-center">{{treeList.sname}}</div>
                <img src="./img/now_theme.png" class="icon-now" alt="" v-show="themeInfo.iBlkLevel==1">
                <div class="range" :class="treeList.fChgRatio>0?'red':treeList.fChgRatio<0?'green':''">
                  {{treeList.fChgRatio | parseNum}}</div>
              </div>
              <div class="theme-tree-item" v-for="(tItem, index) in treeList.child" :key="index">
                <div class="d-flex a-center second-layer">
                  <img class="icon-open" v-show="tItem.children" src="./img/open.png" alt="">
                  <div class="theme-name d-flex a-center">{{tItem.sname}}</div>
                  <img src="./img/now_theme.png" class="icon-now" alt="" v-show="themeInfo.iBlkLevel==2&&themeInfo.sCode == tItem.scode">
                  <div class="range" :class="tItem.fChgRatio>0?'red':tItem.fChgRatio<0?'green':''">
                    {{tItem.fChgRatio | parseNum}}</div>
                </div>
                <div class="theme-tree-item d-flex a-center third-layer" v-if="tItem.child">
                  <div class="theme-name d-flex a-center">{{tItem.child.sname}}</div>
                  <img src="./img/now_theme.png" class="icon-now" alt="" v-show="themeInfo.iBlkLevel==3">
                  <div class="range" :class="tItem.child.fChgRatio>0?'red':tItem.child.fChgRatio<0?'green':''">
                    {{tItem.child.fChgRatio | parseNum}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="theme-tree-tip">* 共 {{treeLength}} 个子题材，可在App中查看全部</div>
        </div>
        <!-- 成分股 -->
        <div class="stock">
          <div class="stock-title">成分股</div>
          <div class="stock-header d-flex a-center">
            <div class="stock-name">名称/代码</div>
            <div class="stock-flex-3">最新涨幅</div>
            <div class="stock-flex-3">五星买卖点</div>
            <div class="stock-flex-3">近十日涨幅</div>
          </div>
          <div class="stock-desc">
            <div v-for="item in stockListdetail" :key="item.sCode" class="stock-item">
              <div class="d-flex a-center">
                <div class="stock-name">
                  <div class="stock-desc-name">{{item.sName}}</div>
                  <div class="stock-desc-code">{{item.sCode}}</div>
                </div>
                <div class="stock-flex-3" :class="item.sRange>0?'red': item.sRange<0?'green':''">
                  {{item.sRange | parseNum}}</div>
                <div class="stock-flex-3" :class="item.type == 'B'? 'red': item.type == 'S'?'green':''">
                  {{item.tipinfo}}</div>
                <div class="stock-flex-3" :class="item.sTenRange>0?'red': item.sTenRange<0?'green':''">
                  {{item.sTenRange | parseNum}}</div>
              </div>
              <div class="d-flex stock-item-sub">
                <div>地位：</div>
                <div class="flex-1" v-html="item.mRxReason||'该股在题材内暂无行业地位排名'">{{item.mRxReason}}</div>
              </div>
            </div>
          </div>
          <div class="stock-footer">* 共 {{stockLength}} 只成分股，可在App中查看全部</div>
        </div>
      </div>
      <img src="./img/bottom.png" alt="" class="icon-bottom">
      <!-- <div class="footer bg-white d-flex j-sb a-center">
                <div class="footer-left-logo">
                    <img src="./img/logo.png" alt="" class="footer-logo">
                    <div class="logo-sub">获取全部最新题材机会及成分股</div>
                </div>
                <div class="footer-qr">
                    <img src="./img/qr.png" alt="">
                </div>
            </div> -->
    </div>
    <div class="div-bottom" :class="isTocanvas?'d-none':''"></div>
    <div @click="html2Photo" class="bottom-btn">点击此处复制图片(可好友分享)</div>
    <!-- <div data-html2canvas-ignore class="testImg">
            <img :src="imgurl" />
        </div> -->
  </div>
</template>

<script>
  import {POST} from '../../../network/http';
  import {Toast} from 'vant';
  const baseUrl = false ? 'https://weeduapi.test.upchina.com' : 'https://weapp.upchina.com/weeduapi';
  export default {
    data() {
      return {
        isTocanvas: false,
        // isElli: true, // 顶部题材投资逻辑多行展开、关闭
        options: {}, // options获取参数
        themeInfo: { // 题材基础信息
          dChgRatio: 0, // 板块涨幅 
        },
        isShowTree: true, // 是否展示题材树
        treeList: [], // 题材树
        treeLength: 0,
        stockHq: [], // 成分股行情获取
        stockList: [], // 复盘成分股
        stockZb: [], // 五星买卖点
        stockLength: 0, // 成分股总数量
        imgurl: ''
      };
    },
    async created() {
      this.$nextTick(() => {
          // 禁用右键
          document.oncontextmenu = new Function("event.returnValue=false");
          // 禁用选择
          document.onselectstart = new Function("event.returnValue=false");
      });
      let defaultOption = {
        shtSetcode: parseInt(this.$route.query.market),
        sCode: this.$route.query.sCode
      }
      let options = defaultOption;
      this.options = options;
      this.getdata(options);
      this.getStockList(options);
      this.getThemeTree();
    },
    mounted() {},
    computed: {
      // 成分股信息：
      stockListdetail() {
        // 入选理由
        let rList = this.stockList;
        let arr1 = rList.map(x => ({
          sCode: x.sCode,
          mRxReason: this.mySplit(x.mRxReason[this.options.sCode], 19),
        }))
        // 股票行情
        let arr2 = this.stockHq;
        // 五星买卖点
        let arr3 = this.stockZb;
        // 数组合并
        const obj = [...arr1, ...arr2, ...arr3].reduce((pre, cur) => {
          if (!pre[cur.sCode]) {
            pre[cur.sCode] = cur;
          } else {
            Object.keys(cur).forEach(key => {
              pre[cur.sCode][key] = cur[key];
            });
          }
          return pre;
        }, {});
        let arr = Object.values(obj);
        arr.sort((a, b) => {
          return b.sRange - a.sRange
        });
        return arr.splice(0, 3);
      },
    },
    methods: {
      // 获取题材基本信息
      async getdata(options) {
        let url = 'hq_fupan_guniuniu/getBlockBasicData';
        let data = {
          "stReq": {
            "vecBlk": [options],
            "iCmd": 2
          }
        }
        let [res, err] = await POST(url, data);
        if (res) {
          let result = res.vecDateData[0].vecData[0].stBlkBasic;
          let info = {
            sName: result.blk.sName, //板块名称
            sCode: result.blk.sCode, //板块代码
            iMarket: result.blk.iMarket, //市场
            eType: result.blk.eType, //类别 1:行业 2:地域 3:概念 4:其他
            dChgRatio: result.dChgRatio, // 板块涨幅
            showDriveEvent: result.sDriveEvent, // 驱动事件
            iBlkLevel: result.iBlkLevel, // 板块级别
          }
          // 投资逻辑
          info.sDriveEvent = this.mySplit(result.sDriveEvent, 20);
          let updataDate = res.vecDateData[0].iDate + '';
          let month = updataDate.slice(4, 6);
          let day = updataDate.slice(6, 8);
          let parseDate = month + '月' + day + '日';
          info.updataDate = parseDate;
          this.themeInfo = info;
        }
      },
      // 获取成分股
      async getStockList(reqData) {
        let url = "hq_fupan_guniuniu/getBlockStockData";
        let data = {
          "stReq": {
            "vecBlk": [reqData]
          }
        }
        let [res, err] = await POST(url, data);
        if (res) {
          let result = res.vecDateBlkStk[0].vecBlkStk[0].vecStk;
          this.stockLength = result.length;
          this.stockList = result;
          await this.getstockInfo(this.stockList);
          this.getStockZb(this.stockList);
        }
      },
      // 获取行情
      async getstockInfo(list) {
        let arr = list.map(x => ({
          shtSetcode: x.iMarket,
          sCode: x.sCode
        }))
        let url = 'hq_marketdata_web/stockHqSimple';
        let data = {
          "stReq": {
            "vStock": arr,
            "eColumn": 2,
            "vBitmap": [32, 128, 0, 0, 0, 0, 1]
          }
        };
        let [res, err] = await POST(url, data);
        this.stockHq = res.vStockHq.map(x => ({
          sCode: x.code,
          sName: x.name,
          sRange: x.m1[8], // 涨跌幅
          sTenRange: x.m1[55] // 近10日涨幅
        }))
      },
      // 获取五星买卖点
      async getStockZb(list) {
        let url = baseUrl + '/hq/getStockZB';
        let arr = list.map(x => ({
          stockCode: x.sCode,
          market: x.iMarket
        }))
        let data = {
          stockArr: arr
        }
        let [res, err] = await POST(url, data);
        if (res) {
          let list = res.data.map(x => ({
            sCode: x.stockCode,
            type: x.type,
            tipinfo: x.tipinfo
          }))
          this.stockZb = list;
        }
      },
      // 获取题材树
      async getThemeTree() {
        let url = baseUrl + '/hq/getBlockTsLevel';
        let data = '{"stReq":{"vBlockCode":[]}}';
        let [res, err] = await POST(url, data);
        let treeList = res.data;
        let tree = {};
        let nowObj = treeList.find(x => x.scode == this.options.sCode);
        let iBlkLevel = this.themeInfo.iBlkLevel; //特色板块的级别
        if (iBlkLevel == 1) {
          let child = treeList.filter((x) => {
            return x.pid == nowObj.scode
          })
          if (child.length != 0) {
            nowObj.child = child.splice(0, 2);
            tree = nowObj;
          } else {
            this.isShowTree = false; // 没有二级题材 不展示题材树
          }
        } else if (iBlkLevel == 2) {
          let cObj = treeList.find(x => x.pid == nowObj.scode);
          if (cObj) nowObj.child = cObj;
          let pObj = treeList.find(x => x.scode == nowObj.pid);
          if (pObj) {
            pObj.child = [nowObj];
            tree = pObj;
          } else {
            tree = nowObj;
          }
        } else if (iBlkLevel == 3) {
          let pObj = treeList.find(x => x.scode == nowObj.pid);
          if (pObj) {
            pObj.child = nowObj;
          }
          let pgObj = treeList.find(x => x.scode == pObj.pid);
          if (pgObj) {
            pgObj.child = [pObj]
          }
          tree = pgObj;
        }
        this.treeList = tree;
        // 当前题材的所有2级3级题材总数
        let arr2 = this.filterArray(treeList);
        let item = arr2.find(x => x.scode == tree.scode);
        this.treeLength = item && item.allCount;
      },
      filterArray(arr) {
        let map = {};
        arr.forEach(v => {
          v.allCount = 0;
          map[v.scode] = v;
        });
        let treeData = [];
        arr.forEach(child => {
          const mapItem = map[child.pid];
          if (mapItem) {
            (mapItem.children || (mapItem.children = [])).push(child);
            mapItem.allCount++;
          } else {
            treeData.push(child);
          }
        });
        treeData.forEach(item => {
          item.children && item.children.forEach(v => {
            item.allCount += v.allCount;
          });
        });
        return treeData;
      },
      // 绘制图片
      html2Photo() {
        // return
        let that = this;
        that.isTocanvas = true;
        window.html2canvas(this.$refs.main, {
          scale: 2,
          allowTaint: true,
          useCORS: true,
          async onrendered(canvas) {
            // console.log(canvas)
            // that.imgurl = canvas.toDataURL();
            let src = await that.loadImg(canvas);
            let num = 0;
            if (src.length % 1000 === 0) {
              num = src.length / 1000
            } else {
              num = parseInt(src.length / 1000) + 1;
            }
            that.dgSendData(num, src, 0);
          }
        })
      },
      // 加水印
      loadImg(canvas) {
        return new Promise((resolve, reject) => {
          let _that = this;
          const context = canvas.getContext('2d');
          var img = new Image();
          img.setAttribute('crossOrigin', 'anonymous');
          img.src = "https://cdn.upchina.com/front/2022theme/production/img/water.png";
          img.onload = function () {
            context.fillStyle = context.createPattern(img, 'repeat');
            context.fillRect(0, 0, canvas.width, canvas.height);
            //  _that.$refs.main.appendChild(canvas)
            let src = canvas.toDataURL().slice(22);
            resolve(src);
          }
        });
      },
      //递归调用
      dgSendData: function (count, str) {
        // debugger
        upNativeComm.exec('bmp_clipboard', {
          base64_data: "",
          step: 0
        });
        for (let i = 0; i < count; i++) {
          let value = str.slice((i * 1000), (i + 1) * 1000);
          let _value = i == count - 1 ? 1 : 0;
          upNativeComm.exec('bmp_clipboard', {
            base64_data: value,
            step: 1
          });
        }
        upNativeComm.exec('bmp_clipboard', {
          base64_data: "",
          step: 2,
          callback: (code, opt) => {
            this.isTocanvas = false;
            if (code == 1) {
              Toast('您已成功复制图片，CTRL+V可以查看分享')
            } else {
              Toast('复制失败,请重新点击')
            }

          }
        });
      },
      /**
       * 切割数组
       * str 字符串
       * leng 每一段字符串的长度
       * n 需要展示多少行
       */
      mySplit(str, leng, n = 50) {
        if(!str){return}
        let str1 = '';
        let index = 0; // 计数： 截取字符串长度
        let m = 0; // 行数
        while (index < str.length) {
          m++;
          if(m > 5) {
            return str1.substr(0, str1.length-7) + '...</div>';
          }
          let str2 = str.slice(index, str.length);
          let strItem = this.cutStr(str2, leng * 2)
          index += strItem.length;
          str1 += `<div> ${strItem}</div>`;
        }
        return str1;
      },
      cutStr(str, L) {
        var result = '',
          strlen = str.length, // 字符串长度
          chrlen = str.replace(/[^\x00-\xff]/g, '**').length; // 字节长度
        if (chrlen <= L) {
          return str;
        }
        for (var i = 0, j = 0; i < strlen; i++) {
          var chr = str.charAt(i);
          if (/[\x00-\xff]/.test(chr)) {
            j++; // ascii码为0-255，一个字符就是一个字节的长度
          } else {
            j += 2; // ascii码为0-255以外，一个字符就是两个字节的长度
          }
          if (j < L) { // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
            result += chr;
          } else { // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
            return result;
          }
        }
      }
    },
    watch: {
      // isElli: {
      //     handler(val, old) {
      //         if (val) {
      //             this.themeInfo.sDriveEvent = this.mySplit(this.themeInfo.showDriveEvent, 20, 2);
      //         } else {
      //             this.themeInfo.sDriveEvent = this.mySplit(this.themeInfo.showDriveEvent, 20);

      //         }
      //     },

      // }
    }
  };
</script>

<style scoped lang="less">
  @font-face {
    font-family: "东信和平";
    src: url("../../../assets/font/wzch.ttf");
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .d-flex {
    display: flex;
  }

  .d-none {
    display: none;
  }

  .a-center {
    align-items: center;
  }

  .j-sb {
    justify-content: space-between;
  }

  .flex-1 {
    flex: 1;
  }

  .p-rel {
    position: relative;
  }

  .p-abs {
    position: absolute;
    top: 0;
    left: 0;
    width: 0.62rem;
    height: 0.4rem;
  }

  .font-22 {
    font-size: 0.22rem;
  }

  .font-24 {
    font-size: 0.24rem;
  }

  .font-28 {
    font-size: 0.28rem;
  }

  .h-color {
    color: #964f00;
  }

  .bg {
    background: #ff805b;
  }

  .bg-white {
    background: #fff;
  }

  .red {
    color: #ff353e !important;
    border: 0;
  }

  .green {
    color: #03aa54 !important;
    border: 0;
  }

  .bg-red {
    background: #ff353e !important;
  }

  .bg-green {
    background: #03aa54 !important;
  }

  img {
    display: block;
  }

  .elli-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; //行数
    overflow: hidden;
  }

  .main {
    text-align: left;
    color: #999;
    font-family: "Microsoft YaHei";
  }

  .header {
    background: url("./img/bg.png") no-repeat;
    background-size: 100%;

    .bg-header-white {
      margin: 0 0.2rem;
      background: #fff;
      border-radius: 0.2rem 0.2rem 0 0;
    }

    .bg-header {
      background: url("./img/bg-title.png") no-repeat;
      background-size: 100%;
      border-radius: 0.2rem 0.2rem 0 0;
      padding: 0.4rem 0.3rem;
      border-bottom: 1px solid #f0f0f0;
    }

    .header-title {
      font-size: 0.24rem;
      margin-left: auto;
    }

    .header-name {
      font-family: "东信和平";
      font-size: 0.46rem;
      color: #111;
    }

    .header-num {
      width: 1.5rem;
      height: 0.46rem;
      background: #98999a;
      text-align: center;
      border-radius: 0.04rem;
      line-height: 0.46rem;
      font-weight: 600;
      font-size: 0.26rem;
      color: #fff;
    }

    .header-date {
      font-size: 0.28rem;
      color: #fff;
      padding: 0.6rem 0.5rem 0.3rem;
    }

    .icon-date {
      width: 0.24rem;
      height: 0.24rem;
      margin-right: 0.08rem;
    }
  }

  /* content */
  .content {
    border-radius: 0 0 0.2rem 0.2rem;
    margin: 0 0.2rem;
  }

  .invest-logic {
    padding: 0.4rem 0.3rem 0.3rem;
    border-bottom: 1px solid #f0f0f0;

    .invest-logic-title {
      width: 2rem;
      white-space: nowrap;
      font-size: 0.32rem;
      font-weight: 500;
      color: #111;
      margin-bottom: 0.24rem;
      background: url("./img/bg-h1.png") no-repeat bottom left;
      background-size: 78% 40%;
      padding-bottom: 0.05rem;
    }

    .bg-invest-logic-desc {
      background: #fff1ed;
      border: 1px solid rgba(255, 197, 180, 0.5);
      border-radius: 12px;
    }

    .invest-logic-desc {
      padding: 0.24rem 0.3rem;
      background: url("./img/bg-lg.png") no-repeat;
      background-size: 100% 100%;
      border-radius: 12px;
      overflow: hidden;
      font-size: 0.26rem;
      color: #666;
      text-align: justify;
      line-height: 0.36rem;
      white-space: nowrap;
    }
  }

  .theme-tree {
    border-bottom: 1px solid #f0f0f0;
    padding: 0.4rem 0.3rem 0;

    .theme-tree-title {
      width: 1.3rem;
      font-size: 0.32rem;
      font-weight: 500;
      color: #111;
      margin-bottom: 0.24rem;
      background: url("./img/bg-h1.png") no-repeat bottom left;
      background-size: 80% 40%;
      padding-bottom: 0.05rem;
    }

    .theme-tree-header {
      margin: 0.24rem 0 0.1rem;
      color: #999;
      font-size: 0.24rem;
    }

    .theme-tree-desc {
      .theme-tree-item {
        font-size: 0.3rem;
        color: #2086ff;

        .first-layer,
        .second-layer,
        .third-layer {
          border-bottom: 1px solid #f0f0f0;
          padding: 0.2rem 0 0.24rem;
        }

        .second-layer {
          margin-left: 0.48rem;
        }

        .third-layer {
          margin-left: 1.2rem;
        }

        .theme-name {
          transform: translate(0, 0.03rem);
        }

        .icon-now {
          width: 1.06rem;
          height: 0.32rem;
          margin-left: 0.12rem;
          transform: translate(0, 0.03rem);
        }
      }

      .icon-open {
        width: 0.3rem;
        height: 0.3rem;
        margin-right: 0.16rem;
        transform: translate(0, 0.04rem);
      }

      .theme-tree-item:first-child {
        color: #111;
      }

      .range {
        flex: 1;
        text-align: right;
        color: #98999a;
        font-weight: 500;
      }
    }

    .theme-tree-tip {
      font-size: 0.24rem;
      color: #999;
      padding: 0.24rem 0;
    }
  }

  .stock {
    padding: 0.4rem 0.26rem 0;

    .stock-title {
      width: 1rem;
      white-space: nowrap;
      font-size: 0.32rem;
      font-weight: 500;
      color: #111;
      margin-bottom: 0.24rem;
      background: url("./img/bg-h1.png") no-repeat bottom left;
      background-size: 63% 40%;
      padding-bottom: 0.05rem;
    }

    .stock-header {
      font-size: 0.24rem;
      color: #999;
      line-height: 0.54rem;
    }

    .stock-name {
      flex: 4;
    }

    .stock-flex-3 {
      flex: 3;
      text-align: center;
      color: #98999a;
    }

    .stock-flex-2 {
      flex: 2;
      text-align: right;
    }

    .stock-item {
      padding: 0.2rem 0 0.28rem;
      border-bottom: 1px solid #f0f0f0;

      .stock-item-sub {
        font-size: 0.26rem;
        color: #999;
        line-height: 0.36rem;
        margin-top: 0.2rem;
      }
    }

    .stock-desc-name {
      font-size: 0.32rem;
      color: #111;
      margin-bottom: 0.1rem;
    }

    .stock-desc-code {
      font-size: 0.22rem;
      color: #999;
    }

    .stock-desc {

      .stock-flex-2,
      .stock-flex-3 {
        font-size: 0.3rem;
        font-weight: 500;
      }
    }

    .stock-footer {
      font-size: 0.24rem;
      color: #999;
      padding: 0.24rem 0;
    }
  }

  .icon-bottom {
    width: 100%;
    transform: translate(0, 0.2rem);
  }

  // .footer {
  //     margin-top: 0.2rem;
  //     border-radius: 0.6rem 0 0 0;
  //     border-radius: 0.6rem 0 0 0;
  //     padding: 0.3rem 0.36rem 0.6rem 0.53rem;
  //     font-size: 0.3rem;
  //     color: #111;
  //     line-height: 0.36rem;

  //     .footer-left-logo {
  //         width: 4.7rem;

  //         .logo-sub {
  //             margin-top: 0.16rem;
  //             letter-spacing: 0;
  //         }
  //     }

  //     .footer-logo {
  //         width: 4.38rem;
  //         height: 0.42rem;
  //     }

  //     .footer-qr {
  //         width: 1.84rem;
  //         height: 1.84rem;
  //         overflow: hidden;

  //         img {
  //             width: 100%;
  //             height: 100%;
  //         }
  //     }
  // }

  .bottom-btn {
    background: #2e343b;
    color: #fff;
    text-align: center;
    font-size: 0.3rem;
    text-align: center;
    padding: 0.3rem;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    cursor: pointer;
  }

  .div-bottom {
    width: 100%;
    height: 50px;
    background: #fff;
  }

  // .testImg {
  //     width: 100vw;
  //     height: auto;
  // }

  // .testImg img {
  //     width: 100%;
  //     height: 100%;
  // }
</style>