'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = getApp();
exports.default = Page({
    data: {
        t1: ['上大学之前，我总是记不住你和我爸的生日\n上大学之后，每次过生日时却又没办法回来\n', '想了很久要送什么生日礼物\n我决定送我妈这样一封信\n这封信它没什么特别\n只是记录了最近生活的一些点点滴滴\n'],
        t2: [['17年12月27日', '感冒了，我妈让我找点雪梨汤喝，对嗓子有好处'], ['17年12月29日', '突然想吃很多东西，列了个清单给我妈'], ['18年1月6日', '下雪了，我妈想给我买衣服哈哈结果我自己买了'], ['18年2月2日', '给我妈推荐了旅行青蛙'], ['18年3月1日', '我妈给我买了件苹果，顺便了解了下课表'], ['18年3月17日', '说是把妞妞给我邮寄过来了哈哈，收到了一大堆零食'], ['18年3月20日', '婆婆过生日'], ['18年4月6日', '哇我妈给我发了很长一段的健康话题心得'], ['18年4月30日', '妈去看车了'], ['18年5月20日', '给我发了520节日红包hhhh'], ['18年6月21日', '想吃粽子咨询我妈，可惜了，没有黄糖'], ['18年7月5日', '给我推荐《我不是药神》，还要了两张妞妞的照片哈哈哈感觉妞妞很鸡贼'], ['18年7月18日', '给我妈分享我打植物大战僵尸'], ['18年7月26日', '全名K歌录了一首分享给我妈'], ['18年9月2日', '看图找黑豆游戏哈哈'], ['18年9月13日', '领取牛奶补贴，我妈带着婆婆开新车去江西旅游了'], ['18年9月30日', '收到我妈给的生日礼物，一大波红包呢'], ['18年11月5日', '大姨爹生日，上课没看到我妈电话，结果打给坐我右边的小波了hhhh'], ['18年11月9日', '给我买了三件衣服，室友劝我还是别自己买了，自己买的太丑了哈哈'], ['18年11月19日', '让我妈远程帮我拍了一下tensorflow书'], ['18年12月12日', '哈哈想给我买鞋，结果我又提前自己买了'], ['19年1月17日', '来西安送我去美国'], ['19年2月3日', '派出去卖辣椒，结果买完落超市了hhhh'], ['19年4月10日', '我妈了解了一下大创进展，对于我买Apple Pencil瞬间报销']],
        t3: ['大概就是这样吧\n还有好多其他有意思的事情\n印象最深的就是小学写作文的时候了哈哈\n还有一次暑假的时候和小吕\n每天看我妈打一关植物大战僵尸\n初中的时候每天早上还抱我起来偷菜hhhh\n'],
        t4: ['妈啊，其实我挺担心你会很无聊\n你又不喜欢打牌，也不经常和朋友出去玩\n你总说没关系\n可是这是你的人生啊\n不要总是为我考虑了\n我已经很幸运了得到你们这么多支持\n从小学坚持教育我到高中\n每天自己活得开心才是你最应该考虑的事情\n我有时候真希望\n你能和那些每天都出去玩的家长一样\n也许你真的不喜欢打牌，不喜欢出去玩\n但你一定有自己喜欢做的事\n叫上我爸或者不叫也行哈哈\n也可以叫上三孃或者大孃嘛\n祝你今后每天能开开心心的\n这句话看似很简单但却真的很难\n希望我妈能真的做到哈\n'],
        t5: ['再过两天就是母亲节了\n这个小程序算是一个小礼物吧\n本来收信功能母亲节才开放的\n但是今天很特别\n这封信提前到了\n这个礼物可能会没有收到香水口红那么隆重\n但是这个页面是单独为你写的彩蛋\n其他人是看不到的哦\n'],
        color: ['#4285F4', '#EA4335', '#FBBC05', '#4285F4', '#34A853', '#4285F4', '#EA4335', '#FBBC05', '#4285F4', '#34A853', '#4285F4', '#EA4335', '#FBBC05', '#4285F4', '#34A853', '#4285F4', '#EA4335', '#FBBC05', '#4285F4', '#34A853', '#4285F4', '#EA4335', '#FBBC05', '#4285F4']
    },
    read_next: function read_next() {
        wx.redirectTo({
            url: '../home/index'
        });
    }
});