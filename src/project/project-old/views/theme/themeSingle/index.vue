<template>
  <div class="theme_single_page">
    <div ref="main" id="main_png" class="theme_single_page_backgroundImg">
      <div class="backgroundImg"></div>
      <div class="content">
        <div class="theme_title">
          <div class="theme_title_icon"></div>
          <div class="theme_title_txt">{{tradeDate}}</div>
          <div class=" theme_title_txt_end">——来自股牛牛股票</div>
        </div>
        <div class="theme_content">
          <div class="theme_content_head">
            <div class="theme_content_head_sname">{{stockInfo.sName}}</div>
            <div class="theme_content_head_fNowPrice" :class="{'txtred':stockInfo.fChgRatio>0,'txtgreen':stockInfo.fChgRatio<0,'txtblack':stockInfo.fChgRatio==0}">{{stockInfo.fNowPrice}}</div>
            <div class="theme_content_head_fChgRatio" :class="{'backred':stockInfo.fChgRatio>0,'backgreen':stockInfo.fChgRatio<0,'backblack':stockInfo.fChgRatio==0}">{{stockInfo.fChgRatio_str}}</div>
          </div>
          <div class="theme_content_stockinfo">
            <div class="theme_content_stockinfo_scode">{{stockInfo.sCode}}</div>
            <div class="theme_content_stockinfo_tsinfo backb-border" :class="{'txtred red-border':stockInfo.type=='B','txtgreen green-border':stockInfo.type=='S'}">{{stockInfo.tsinfo}}</div>
          </div>
          <div v-show="vecThemeInfo.length>0" class="line"></div>
          <div v-show="vecThemeInfo.length>0" class="theme_tc_title">
            <div class="theme_tc_title_img">
              <!-- <div>题材亮点</div> -->
              <div class="theme_tc_title_backimg">题材亮点</div>
            </div>
            <div class="theme_tc_title_num">({{vecThemeInfo.length}}个)</div>
          </div>
          <div v-show="vecThemeInfo.length>0" class="theme_tc_content" v-for="(item,index) in vecThemeInfo" :key="index">
            <div class="theme_tc_content_title">{{item.sBlockName}}</div>
            <div class="theme_tc_content_content" v-html="item.sText"></div>
            <!-- <div class="theme_tc_content_content1">{{item.sText2}}</div> -->
          </div>

          <div v-if="!showZNLD">
            <div v-show="znldArr.length>0" class="line"></div>
            <div v-show="znldArr.length>0" class="theme_tc_title">
              <div class="theme_zn_title_img">
                <!-- <div>其他亮点</div> -->
                <div class="theme_zn_title_backimg">其他亮点</div>
              </div>
              <div class="theme_tc_title_num">({{znldArr.length}}个)</div>
            </div>
            <div v-show="znldArr.length>0" class="theme_zn_content">
              <div class="theme_zn_content_item" v-for="(item) in znldArr" :key="item.iformulaId||item.sFactorId">{{item.sFactorName || item.sPoolName}}</div>
            </div>
          </div>
          <div v-else>
            <div v-show="showZNLD" class="theme_tc_title">
              <div class="theme_zn_title_img">
                <!-- <div>其他亮点</div> -->
                <div class="theme_zn_title_backimg">其他亮点</div>
              </div>
              <div class="theme_tc_title_num">({{znldArr.length}}个)</div>
            </div>
            <div v-show="showZNLD" class="theme_zn_content_card" v-for="(item) in znldArr" :key="item.sFactorId||item.iformulaId">
              <div class="theme_zn_content_card_item">
                <div class="theme_zn_content_card_item_title">{{item.sFactorName || item.sPoolName}}</div>
                <div v-show="item.sFactorType!==undefined" class="theme_zn_content_card_item_jt">
                  <div>{{item.sFactorType}}</div>
                </div>
              </div>
              <div class="theme_zn_content_card_item_content" v-html="item.sText"></div>
              <!-- <div class="theme_zn_content_card_item_content1">{{item.sText2}}</div> -->
            </div>
          </div>
        </div>
        <div class="theme_footer">
          <img src="../../../assets/images/thmemImg/footer.png" />
          <!-- <div class="theme_footer_img"></div>
          <div class="theme_footer_title">轻松查询个股题材热点及行业地位,3秒</div>
          <div class="theme_footer_title1">定位行业龙头</div>
          <div class="theme_footer_qrimg">
            <div class="theme_footer_qrimg_img"></div>
          </div> -->

        </div>
        <div class="space" :class="{displayStyle:showSpace}"></div>
        <div data-html2canvas-ignore class="theme_copy" @click="html2Photo2">
          <div class="theme_copy_img"></div>
          <div class="theme_copy_txt">点击此处复制图片(可分享好友）</div>
        </div>
        <!-- <div data-html2canvas-ignore class="testImg">
          <img :src="imgurl" />
        </div> -->
        <!-- <div data-html2canvas-ignore class="widthDemo"></div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { POST, POST_New } from '../../../network/http'
// import html2canvas from 'html2canvas';
import dayjs from 'dayjs';
import { Toast } from 'vant';
const _address = 'https://weapp.upchina.com/weeduapi/'
// const _address = 'http://192.168.8.229:3007/'
export default {
  data() {
    return {
      stockInfo: {
        sName: '',
        sCode: '',
        fNowPrice: '0.00',
        fChgRatio: 0.00,
        fChgRatio_str: '+0.00%',
        tsinfo: '暂无信号'
      },
      vecThemeInfo: [],
      znldArr: [],
      vecHitFactor: [],
      showZNLD: false,//只有智能亮点
      imgurl: '',
      tradeDate: '',
      showSpace: false,
    };
  },
  created() {
    this.$nextTick(() => {
      // 禁用右键
      document.oncontextmenu = new Function("event.returnValue=false");
      // 禁用选择
      document.onselectstart = new Function("event.returnValue=false");
    });

  },
  async mounted() {
    console.time('hqresult')
    let hqresult = await this.getHq([{ "shtSetcode": parseInt(this.$route.params.market), "sCode": this.$route.params.scode }]);
    console.timeEnd('hqresult')
    let _info = this.stockInfo;
    _info.sName = hqresult[0].name;
    _info.sCode = hqresult[0].code;
    _info.fNowPrice = hqresult[0].m1["0"].toFixed(2);
    _info.fChgRatio = hqresult[0].m1["8"];
    _info.fChgRatio_str = hqresult[0].m1["8"] < 0 ? `${hqresult[0].m1["8"].toFixed(2)}%` : hqresult[0].m1["8"] == 0 ? '0.00%' : `+${hqresult[0].m1["8"].toFixed(2)}%`;
    this.stockInfo = _info;
    this.getData();
    console.time('getZB')
    let zbresult = await this.getZB([{ "stockCode": this.$route.params.scode, "market": parseInt(this.$route.params.market) }]);
    console.timeEnd('getZB')
    _info.type = zbresult.type;
    _info.tsinfo = zbresult.type === 'B' ? `五星买点：买入${zbresult.day}天` : `五星卖点：卖出${zbresult.day}天`;
    this.stockInfo = _info;

    this.getTradeTime();
  },
  methods: {
    getData: async function () {
      let url = 'https://prx.upchina.com/json/index_zn_factor/stockZNFactor';
      let data = {
        "stReq": {
          "stk":
          {
            "shtSetcode": parseInt(this.$route.params.market),
            "sCode": this.$route.params.scode,
            "sName": ""
          }
        }
      }
      let res = await POST_New(url, data);
      if (res[0]) {
        let { vecThemeInfo, vecHitFactor, vecSelectedPool } = res[0].stRsq;
        vecThemeInfo.forEach(item => {
          let _text = `行业地位｜${item.sText}`.replace(/，/g, ',');
          if (item.sText === '') {
            _text = "该股在题材内暂无行业地位排名";
          }
          let num = this.dgGetWidth(_text) - 2;
          item.sText = this.mySplit(_text, 18);
          // item.sText1 = _text.slice(0, num);
          // item.sText2 = _text.slice(num, _text.length).length > num ? `${_text.slice(num, (num * 2) - 1)}...` : _text.slice(num, num * 2);
        });
        vecHitFactor.forEach(item => {
          let _text = item.sText.replace(/，/g, ',');
          let num = this.dgGetWidth(_text) - 2;
          item.sText = this.mySplit(_text, 18);

          // item.sText1 = _text.slice(0, num);
          // item.sText2 = _text.slice(num, num * 2).length < item.sText.length - _text.slice(0, num).length ? `${_text.slice(num, (num * 2) - 1)}...` : _text.slice(num, num * 2);
        });
        vecSelectedPool.forEach(item => {
          let _text = item.sText.replace(/，/g, ',');
          let num = this.dgGetWidth(_text) - 2;
          item.sText = this.mySplit(_text, 18);
          // item.sText1 = _text.slice(0, num);
          // item.sText2 = _text.slice(num, num * 2).length < item.sText.length - _text.slice(0, num).length ? `${_text.slice(num, (num * 2) - 1)}...` : _text.slice(num, num * 2);
        });
        this.vecThemeInfo = vecThemeInfo;
        this.vecHitFactor = vecHitFactor;
        this.znldArr = vecHitFactor.concat(vecSelectedPool);

        if (this.vecThemeInfo.length === 0 && this.znldArr.length > 0) {
          this.showZNLD = true;
        }
      }
    },
    /**
 * 切割数组
 * str 字符串
 * leng 每一段字符串的长度
 * n 需要展示多少行
 */
    mySplit(str, leng, n = 50) {
      if (!str) { return }
      let str1 = '';
      let index = 0; // 计数： 截取字符串长度
      while (index < str.length) {
        let str2 = str.slice(index, str.length);
        let strItem = this.cutStr(str2, leng * 2)
        index += strItem.length;
        str1 += `<div> ${strItem}</div>`
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
    },
    dgGetWidth: function (str) {
      let bzWidth = 216; //document.querySelector('.widthDemo').getBoundingClientRect().width - 32;
      let _str = '';
      for (const key in str) {
        if (this.getTextWidth(_str) <= bzWidth) {
          _str += str[key];
        }
      }
      return _str.length;
    },
    getTextWidth: function (str = '') {
      const dom = document.createElement('span');
      dom.style.display = 'inline-block';
      dom.style.fontSize = "0.26rem";
      dom.textContent = str;
      document.body.appendChild(dom);
      const width = dom.clientWidth;
      document.body.removeChild(dom);
      return width;
    },
    getTradeTime: async function () {
      let url = 'https://gateway.uptougu.com/json/hq_marketdata/getMarketTradeCale';
      var time = new Date();
      time.setDate(time.getDate() - 15);
      let startTime = dayjs(time).format('YYYYMMDD');
      let endTime = dayjs(new Date()).format('YYYYMMDD');
      let data = {
        "stReq": {
          "vMarketUnit": [{
            "shtMarket": 0,
            "iStart": Number(startTime),
            "iEnd": Number(endTime)
          }]
        }
      }

      let res = await POST_New(url, data);
      if (res[0]) {
        let resutl = res[0].stRsp.mapTradeCale[0];
        if (resutl.length > 0) {
          let _date = `${resutl[resutl.length - 1].iDate}`;
          this.tradeDate = `${_date.slice(4, 6)}月${_date.slice(6, 8)}日更新`;
        }
      }
    },
    getZB: async function (arr) {
      let url = `${_address}hq/getStockZB`;
      let inparam = {
        "stockArr": arr
      }
      let res = await POST_New(url, inparam);
      return res[0].data[0];
    },
    getHq: async function (arr) {
      let url = 'https://gateway.uptougu.com/json/hq_marketdata_web/stockHqSimple';
      let data = { "stReq": { "vStock": arr, "vBitmap": [128, 128] } }
      let res = await POST_New(url, data);
      return res[0].stRsp.vStockHq;
    },
    // 绘制图片
    html2Photo2() {
      this.showSpace = true;
      let that = this;
      window.html2canvas(this.$refs.main, {
        scale: 2,
        allowTaint: true,
        useCORS: true,
        onrendered: async function (canvas) {
          that.imgurl = canvas.toDataURL();
          console.log(canvas.toDataURL());
          let src = await that.loadImg(canvas);
          let num = 0;
          if (src.length % 1000 === 0) {
            num = src.length / 1000
          }
          else {
            num = parseInt(src.length / 1000) + 1;
          }
          that.dgSendData(num, src, 0);
        }
      })
    },
    //递归调用
    dgSendData: function (count, str) {
      upNativeComm.exec('bmp_clipboard', {
        base64_data: "", step: 0
      });
      for (let i = 0; i < count; i++) {
        let value = str.slice((i * 1000), (i + 1) * 1000);
        let _value = i == count - 1 ? 1 : 0;
        upNativeComm.exec('bmp_clipboard', {
          base64_data: value, step: 1
        });
      }
      upNativeComm.exec('bmp_clipboard', {
        base64_data: "", step: 2, callback: (code, opt) => {
          if (code == 1) {
            Toast('您已成功复制图片，CTRL+V可以查看分享');
          }
          else {
            Toast('复制失败,请重新点击')
          }
          this.showSpace = false;
        }
      });
    },
    // 加水印
    loadImg(canvas) {
      return new Promise((resolve, reject) => {
        const context = canvas.getContext('2d');
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = "https://cdn.upchina.com/front/2022theme/production/img/water.png";
        img.onload = function () {
          context.fillStyle = context.createPattern(img, 'repeat');
          context.fillRect(0, 0, canvas.width, canvas.height);
          let src = canvas.toDataURL().slice(22);
          resolve(src);
        }
      });
    },
  }
};
</script>
<style>
@font-face {
  font-family: "东信和平";
  src: url("../../../assets/font/wzch.ttf");
}
body {
  /* background-color: #ff805b; */
  font-family: Microsoft YaHei;
}
::-webkit-scrollbar {
  display: none;
}
.theme_single_page {
  width: 100vw;
  height: auto;
  position: relative;
  overflow: hidden;
  overflow-y: auto;
  font-family: Microsoft YaHei;
}
.theme_single_page_backgroundImg {
  width: 100vw;
  height: auto;
  /* background-color: #ff805b; */
}
.backgroundImg {
  width: 100vw;
  height: 5.46rem;
  background: url("../../../assets/images/thmemImg/background.png") no-repeat;
  background-size: 100%;
}
.content {
  width: 100vw;
  /* min-height: 100vh; */
  margin-top: -273px;
  background-color: #ff805b;
}
.theme_title {
  height: 0.28rem;
  display: flex;
  align-items: center;
  padding: 0.62rem 0.5rem 0 0.5rem;
}
.theme_title_icon {
  width: 0.24rem;
  height: 0.24rem;
  background: url("../../../assets/images/thmemImg/time.png") no-repeat
    center/100% 100%;
  margin-top: 0.02rem;
}
.theme_title_txt {
  font-size: 0.28rem;
  color: #fff;
  margin-left: 0.08rem;
}
.theme_title_txt_end {
  font-size: 0.24rem;
  color: #fff;
  margin-left: auto;
}
.theme_content {
  width: calc(100vw - 0.4rem);
  min-height: calc(100vh - 4.2rem);
  /* background-image: linear-gradient(180deg, #ffd9d9 0%, #ffffff 9%); */
  background-color: #fff;
  border-radius: 0.2rem;
  padding-bottom: 0.3rem;
  margin: 0.6rem auto 0 auto;
}
.theme_content_head {
  width: 100%;
  line-height: 0.46rem;
  display: flex;
  padding: 0 0.5rem;
}
.theme_content_head_sname {
  font-family: "东信和平";
  font-size: 0.46rem;
  color: #111;
  /* font-weight: bold; */
  margin-top: 0.4rem;
}
.theme_content_head_fNowPrice {
  font-family: Microsoft YaHei;
  font-size: 0.3rem;
  height: 0.46rem;
  line-height: 0.46rem;
  margin-left: auto;
  margin-top: 0.4rem;
}
.theme_content_head_fChgRatio {
  font-family: Microsoft YaHei;
  width: 1.5rem;
  height: 0.46rem;
  line-height: 0.46rem;
  text-align: center;
  font-size: 0.26rem;
  margin-left: 0.16rem;
  margin-top: 0.4rem;
  border-radius: 0.04rem;
}
.theme_content_stockinfo {
  font-family: Microsoft YaHei;
  width: 100%;
  height: 0.38rem;
  line-height: 0.38rem;
  display: flex;
  padding: 0 0.5rem;
  margin-top: 0.24rem;
}
.theme_content_stockinfo_scode {
  font-size: 0.3rem;
  color: #111;
}
.theme_content_stockinfo_tsinfo {
  width: fit-content;
  height: 0.38rem;
  color: #ff353e;
  border: 0.01rem solid #ff353e;
  border-radius: 0.04rem;
  margin-left: auto;
  font-size: 0.22rem;
  padding: 0 0.08rem;
}
.backred {
  background-color: #ff353e;
  color: #fff;
}
.backgreen {
  background-color: #03aa54;
  color: #fff;
}
.backblack {
  background-color: #98999a;
  color: #fff;
}

.txtred {
  color: #ff353e;
}
.txtgreen {
  color: #03aa54;
}
.txtblack {
  color: #98999a;
}
.red-border {
  border: 1px solid #ff353e;
}
.green-border {
  border: 1px solid #03aa54;
}
.black-border {
  border: 1px solid #98999a;
}
.line {
  width: 100%;
  height: 0.01rem;
  margin: 0 auto;
  background-color: #f0f0f0;
  margin-top: 0.36rem;
}
.theme_tc_title {
  width: 100%;
  display: flex;
  margin-top: 0.4rem;
  padding: 0 0.5rem;
  font-family: Microsoft YaHei;
}
.theme_tc_title_img {
  /* width: 1.38rem;
  height: 0.4rem; */
  /* font-weight: bold; */
  font-size: 0.32rem;
  color: #111;
  /* background: url("../../../assets/images/thmemImg/tcrd.png") center/100% 100%; */
}
.theme_zn_title_img {
  /* width: 1.38rem;
  height: 0.4rem; */
  /* font-weight: bold; */
  font-size: 0.32rem;
  color: #111;
  /* background: url("../../../assets/images/thmemImg/hsbj.png") center/100% 100%; */
}
.theme_tc_title_backimg {
  /* width: 1.08rem;
  height: 0.2rem; */
  background: url("../../../assets/images/thmemImg/tcldback.png") no-repeat
    bottom left;
  padding-bottom: 0.05rem;
  background-size: 90% 40%;
}
.theme_zn_title_backimg {
  /* width: 1.08rem;
  height: 0.2rem; */
  background: url("../../../assets/images/thmemImg/znldback.png") no-repeat
    bottom left;
  padding-bottom: 0.05rem;
  background-size: 90% 40%;
  /* margin-top: -7px;
  margin-left: 4px; */
}
.theme_tc_title_num {
  width: fit-content;
  font-size: 0.32rem;
  color: #111;
  /* margin-top: -0.06rem; */
}
.theme_tc_content {
  width: calc(100vw - 1.4rem);
  /* height: 1.8rem; */
  border: 0.01rem solid #fed0d3;
  border-radius: 0.12rem;
  background-image: linear-gradient(-44deg, #fff0f0 0%, #ffffff 100%);
  margin: 0.24rem auto 0 auto;
  font-family: Microsoft YaHei;
}
.theme_zn_content {
  width: calc(100vw - 1.4rem);
  display: flex;
  flex-wrap: wrap;
  margin: 0 0.28rem;
  /* grid-template-columns: auto auto auto;
  grid-column-gap: 0.19rem;
  grid-row-gap: 0.2rem; */
}
.theme_zn_content:first-child {
  margin-left: 0.2rem;
}
.theme_tc_content_title {
  width: fit-content;
  height: 0.3rem;
  line-height: 0.3rem;
  font-size: 0.3rem;
  /* font-weight: bold; */
  color: #111;
  margin: 0.3rem 0 0 0.3rem;
}
.theme_tc_content_content {
  /* height: 0.72rem; */
  white-space: nowrap;
  font-size: 0.26rem;
  color: #666;
  margin: 0.24rem 0.3rem 0 0.3rem;
  text-align: left;
  padding-bottom: 0.3rem;
}
.theme_tc_content_content div {
  margin-top: 2px;
}
.theme_tc_content_content:first-child {
  margin-top: 0;
}
.theme_zn_content_card_item_content div {
  margin-top: 2px;
}
.theme_zn_content_card_item_content:first-child {
  margin-top: 0;
}
.theme_tc_content_content1 {
  font-size: 0.26rem;
  color: #666;
  margin: 0 0.3rem;
  text-align: left;
}
.theme_zn_content_item {
  line-height: 0.56rem;
  background-color: #fff6e4;
  font-size: 0.24rem;
  color: #83561a;
  text-align: center;
  margin-left: 0.2rem;
  margin-top: 9px;
  padding: 0 0.1rem;
}
.theme_footer {
  width: 100%;
  /* height: 2.48rem; */
  background-color: #fff;
  border-top-left-radius: 0.6rem;
  margin-top: 0.2rem;
  /* background: url("../../../assets/images/thmemImg/footer.png") no-repeat
    center/100% 100%; */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.theme_footer img {
  width: 100%;
}
.theme_footer_img {
  width: 3.98rem;
  height: 0.42rem;
  background: url("../../../assets/images/thmemImg/gnngp.png") no-repeat
    center/100% 100%;
  margin: 0 0 0 0.3rem;
}
.theme_footer_title {
  /* width: 5.4rem; */
  text-align: left;
  font-size: 0.24rem;
  color: #111;
  margin: 0.16rem 0 0 0.3rem;
}
.theme_footer_title1 {
  text-align: left;
  font-size: 0.24rem;
  color: #111;
  margin: 0.1rem 0 0 0.3rem;
}
.theme_footer_qrimg {
  /* width: 1.16rem;
  height: 1.16rem; */
  /* border: 1px solid #f33729; */
  border-radius: 0.12rem;
  position: absolute;
  right: 0.3rem;
  top: 0.3rem;
  padding: 0.05rem;
}
.theme_footer_qrimg_img {
  width: 2rem;
  height: 2rem;
  background: url("../../../assets/images/thmemImg/qr.png") no-repeat center;
  background-size: 100% 100%;
}
.theme_zn_content_card {
  width: calc(100vw - 1.4rem);
  /* height: 1.8rem; */
  margin: 0.24rem auto 0 auto;
  border: 0.01rem solid #ffe0c8;
  border-radius: 0.16rem;
  background-image: linear-gradient(135deg, #fffffe 0%, #fff4e7 100%);
}
.theme_zn_content_card_item {
  width: 100%;
  height: 0.3rem;
  font-size: 0.3rem;
  text-align: left;
  padding: 0.4rem 0 0 0.3rem;
  display: flex;
  align-items: center;
}
.theme_zn_content_card_item_title {
  height: 0.3rem;
  line-height: 0.3rem;
}
.theme_zn_content_card_item_jt {
  width: 1.35rem;
  height: 0.35rem;
  line-height: 0.35rem;
  background: url("../../../assets/images/thmemImg/jt.png") no-repeat
    center/100% 100%;
  margin-left: 0.16rem;
}
.theme_zn_content_card_item_jt div {
  font-size: 0.2rem;
  color: #ff5500;
  margin-left: 0.29rem;
  /* margin-top: 2px; */
}
.theme_zn_content_card_item_content {
  white-space: nowrap;
  width: 100%;
  /* height: 0.72rem; */
  font-size: 0.26rem;
  color: #666;
  padding: 0.24rem 0.3rem 0.3rem 0.3rem;
  text-align: left;
  margin-top: 0.24rem;
}
.theme_zn_content_card_item_content1 {
  width: 100%;
  font-size: 0.26rem;
  color: #666;
  padding: 0 0.3rem;
  text-align: left;
}
.theme_copy {
  width: 100%;
  color: #fff;
  background-color: #2f343a;
  font-size: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  cursor: pointer;
}
.theme_copy_img {
  width: 0.24rem;
  height: 0.24rem;
  background: url("../../../assets/images/thmemImg/icon_edit.png") no-repeat
    center/100% 100%;
  margin-right: 0.06rem;
}
.testImg {
  width: 100vw;
  height: auto;
}
.testImg img {
  width: 100%;
  height: 100%;
}
.widthDemo {
  width: calc(100vw - 1.4rem);
  height: 0.2rem;
  margin: 0 auto;
}
.space {
  height: 0.8rem;
  background-color: #fff;
}
.displayStyle {
  display: none;
}
</style>
