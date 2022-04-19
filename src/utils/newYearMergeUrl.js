// 五合一,地址合一
import $tools from "./tools";
const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'production') {
    if ($tools.isTerminal('isInGNNApp') || $tools.isTerminal('isInGPTApp')) {
        location.href = 'https://cdn.upchinaproduct.com/front/2022/01/newYear/index.html#/'
    } else if ($tools.isTerminal('weixin')) {
        location.href = 'https://workwx.upchina.com/share/start.html?pageid=84'
    } 
}