'use strict';

void function () {
    var app = angular.module('tailorIon');

    var gramWeight = function () {
      var num = 110;
      var gram_weight = {};
      gram_weight['100克及以下'] = 100;
      while(num <= 600) {
        var key = num + '克左右';
        gram_weight[key] = num;
        num = num + 10;
      }
      gram_weight['600克以上'] = 650;
      return gram_weight;
    };

    var GRAMWEIGHT = gramWeight();

    var config = {
      GLOBAL_CONFIG: {
          NAME: '我是裁缝',
          DEBUG: true
      },
      PAGE_SIZE: 20,
      SHOP_TYPE: {
        BRAND: '成衣品牌定制部',
        STORE: '定制店',
        CHAIN: '连锁品牌',
        OTHER: '其他'
      },
      CUSTOMCLOTHING_TYPE: {
        SUIT: '西服', SHIRT: '衬衫', TROUSER: '西裤、休闲裤', OVERCOAT: '大衣', JACKET: '夹克', JEANS: '牛仔裤', CASHMERE: '羊绒衫',
        DOWNJACKET: '羽绒服', WEDDING: '婚纱礼服', CHINESE: '旗袍、中式服装', T_SHIRT: 'T恤、POLO衫、卫衣等', COSTUMES: '演出服', OTHER: '其他'
      },
      SALES_STATUS: {
        NORMAL: '正常',
        OOS: '缺货',
        HALT: '已注销'
      },
      APPLY_STATUS: {
        HELLO: '未处理',
        ACCEPTANT: '通过',
        REFUSED: '拒绝'
      },
      FABRIC_TYPE: {
        GYJ: '国产羊毛精纺',
        GYD: '国产羊毛大衣',
        JYJ: '进口羊毛精纺',
        JYD: '进口羊毛大衣',
        JM: '进口棉面料',
        GM: '国产纯棉、棉涤类',
        GY: '国产亚麻',
        JY: '进口亚麻',
        GQ: '国产其他类型面料',
        JQ: '进口其他类型面料'
      },
      FACTORY_TYPE: {
        SUIT: '西服大衣裤子加工', SHIRT: '衬衫加工', JACKET: '夹克加工', CASHMERE: '羊绒衫加工',
        DOWNJACKET: '羽绒服加工', TEE: 'T恤衫加工', POLO: 'Polo衫加工', OTHER: '其他'
      },
      ACCESSORY_TYPE: {
        TIE: '领带', SILKSCARVES: '丝巾', BUTTON: '扣子', SEWINGTHREAD: '缝纫线',
        LINING: '衬布、里布等辅料', NEEDLES: '机针', OTHER: '其他'
      },
      tailoringTypes: {
        'A,B': '西服套装2ps(A+B)',
        'A,B,C': '西服套装3ps(A+B+C)',
        'A,B,B': '西服套装（A+2B）',
        'A,C': '套装（A+C）',
        'B,C': '套装（B+C）',
        'A': '上衣A',
        'B': '裤子B',
        'C': '马甲C',
        'E': '大衣E',
        'D': '衬衫D',
        'G': '礼服G',
        'F': '夹克F'
      },
      specification_clothing_type: {
        'A': '上衣A',
        'B': '裤子B',
        'C': '马甲C',
        'E': '大衣E',
        'D': '衬衫D',
        'G': '礼服G',
        'F': '夹克F'
      },
      CLOTHING_TYPE: {
        '西服套装2ps(A+B)': ['A', 'B'],
        '西服套装3ps(A+B+C)': ['A', 'B', 'C'],
        '西服套装（A+2B）': ['A', 'B', 'B'],
        '套装（A+C）': ['A', 'C'],
        '套装（B+C）': ['B', 'C'],
        '上衣A': ['A'],
        '裤子B': ['B'],
        '马甲C': ['C'],
        '大衣E': ['E'],
        '衬衫D': ['D'],
        '礼服G': ['G'],
        '夹克F': ['F']
      },
      CLOTHING_TOBUY: {
        A: '西服等未采购',
        D: '衬衫未采购',
        OTHER: '其他未采购'
      },
      SETTLEMENT_TYPE: {
        CASH: '现款支付',
        HALF_MONTH: '半月结',
        MONTH: '月结'
      },
      FACTORY_SETTLEMENT_TYPE: {
        CASH: '现款支付',
        ADVANCE : '预付款',
        MONTH: '月结'
      },
      BILL_CYCLE: {
        MONTH: '月账单',
        FIRST_HALF_MONTH: '上半月账单',
        SECOND_HALF_MONTH: '下半月账单'
      },
      ORIGIN_PLACE: [
        '意大利',
        '英国',
        '泰国',
        '法国',
        '中国',
        '土耳其'
      ],
      BREADTH: [
        '148~150cm',
        '140cm',
        '130cm',
        '128cm',
        '120cm',
        '115cm',
        '110cm',
        '90cm'
      ],
      FABRIC_COLOR: [
        '藏蓝', '浅灰色', '深灰色', '黑色', '藏青色', '蓝色', '白色', '玫红',
        '红色', '绿色', '紫色', '粉色', '蓝灰', '宝蓝', '草绿', '深绿',
        '咖啡色', '浅咖啡', '墨绿', '暗紫色', '砖红', '酒红', '桃红', '天蓝',
        '黄色', '米色', '棕色', '褐色', '米黄', '橙色', '卡其色',
        '白底蓝条', '白底红条', '白底紫条', '白底黑条', '白底绿条', '白底灰条', '蓝底白条',
        '紫底白条', '白底蓝格', '白底红格', '白底黑格', '白底绿格', '白底紫格',
        '中灰色', '黑灰色', '紫罗兰', '群青色', '中蓝色', '深蓝色', '军绿色', '黄绿色',
        '蓝绿色', '淡黄色', '中黄色', '桔黄色', '朱红色', '橘红色', '深咖色', '其他'
      ],
      EXPRESS_COM: [
        '顺丰', '申通', 'EMS', '全峰', '圆通', '中通', '宅急送',
        '韵达', '优速', '天天', '如风达', '邮政平邮',
        '百世汇通', '德邦物流', '联邦快递', '德国敦豪快递', '客户自取', '合包'
      ],
      EXPRESS: {
        '顺丰': 'SF', '申通': 'STO', 'EMS': 'EMS', '全峰': 'QFKD', '圆通': 'YTO',
        '中通': 'ZTO', '宅急送': 'ZJS', '韵达': 'YD', '优速': 'UC', '天天': 'HHTT',
        '如风达': 'RFD', '邮政平邮': 'YZPY', '百世汇通': 'HTKY', '德邦物流': 'DBL',
        '联邦快递': 'FEDEX', '德国敦豪快递':'DHL', '客户自取': 'BYSELF', '合包': 'TOGETHER'
      },
      FLOWER_PATTERN: [
        '纯色', '窄竖条纹', '宽竖条纹', '人字纹', '格子', '宽格',
        '细格', '细条纹', '鸟眼', '斜纹', '暗条纹', '横条纹', '灯芯绒',
        '千鸟格', '提花', '针点', '法兰绒', '网纹', '其他'
      ],
      YARN_COUNT: [
        '40支', '50支', '60支', '70支', '80支', '80支双股', '90支', '100支', '100支双股',
        '110支', '110支双股', '120支', '120支双股', '130支', '140支', '140支双股', '150支',
        '160支', '160支双股', '170支', '170支双股', '180支', '200支', '200支双股', '240支双股',
        '290支', '300支', '300支双股', '其他'
      ],
      COMPOSITION: [
        '纯毛', '95%毛5%涤', '90%毛10%羊绒', '70%毛30%羊绒', '50%毛50%羊绒',
        '70% 聚酯纤维 30% 醋酸', '99%棉1%弹力', '75%棉25%莫代尔', '55%醋酸45%粘胶',
        '65%棉32%黏胶 3%弹力', '75 %黏胶 25%羊毛', '52 %醋酸 36%羊毛 12聚酯纤维',
        '60%羊毛40 %醋酸', '55%粘胶45%羊毛', '60%羊毛40 聚酯纤维', '60 %羊毛40%真丝',
        ' 88%粘胶12%羊毛', '80%羊毛20%真丝', '95%羊毛5%山羊绒', '98%羊毛2%山羊绒',
        '70%羊毛30%马海毛', '棉+莱卡',
        '70%毛', '毛绒丝', '50%W', '30%SE', '纯羊绒',
        '20%LI', '50%W, 30%SE, 20%LI', '50%羊毛(毛涤类)', '84%W 16%WM',
        '30%羊毛', '80%羊毛', 'T/R', '亚麻', '纯棉', '棉丝', '棉涤', '棉麻', '棉毛',
        '涤棉', '真丝', '羊毛羊绒', '羊绒', '棉锦弹力', '80%棉左右+锦纶+弹性纤维', '90%丝 +弹性纤维',
        '羊毛粘胶', '84%毛，16%WM(马海毛)', '其他'
      ],
      GRAM_WEIGHT: GRAMWEIGHT,
      CRAFT: ['半毛衬', '全毛衬', '粘合衬', '全手工', '标准', '精工艺', '手工'],
      ORDER_STATUS: {
        PLACED: '已下单，未付款，等待确认运费信息',
        EXPRESSFEE_CONFIRMED: '确认运费等待付款',
        PAYED: '待发货',
        DELIVERED: '已发货',
        SUCCESS: '交易成功'
      },
      ORDER_MANAGE: {
        DELIVERED: '已发货',
        SUCCESS: '确认收货,交易成功'
      },
      STORAGE_STATUS:{
        INIT: '未入库',
        IN: '已入库未通知',
        INNOTI: '已入库已通知',
        OUT: '  已出库'
      },
      PRODUCE_STATUS: {
        READY: '未下单',
        PLACED: '生产中',
        DELIVERED: '已完成'
      },
      PROVIDER_TYPE: {
        factory: '工厂',
        fabric: '面料商',
        accessory: '辅料商'
      },
      FABRIC_UNIT: {
        METER: '米',
        YARD: '码'
      },
      CURRENCY: {
        CNY: '人民币元',
        HKD: '港元',
        SGD: '新加坡元'
      },
      customShop_OrderType : {
        PLACED: '待确认运费',
        EXPRESSFEE_CONFIRMED: '确认运费待付款',
        PAYED: '已付款待发货',
        DELIVERED: '待确认收货',
        SUCCESS: '已确认收货'
      },
      PRIVILEGE: {
        DELIVER: '发货权限',
        IN: '确认面料到厂',
        PARTNER: '确认业务合作关系',
        PRODUCE: '下单分配'
      },
      FABRIC_RECEIVE_STATUS: {
        DELIVERED: '待收货',
        SUCCESS: '已收货'
      },
      SPECIFICATION_GENDER: {
        1: '男装',
        0: '女装'
      },
      not_trousers_parts: {
        neck: '领围', frontLength: '前长', backLength: '后长', length: '衣长', shoulder: '肩宽',
        sleeve: '袖长', chest: '胸围', middleChest: '中腰', sleeveHead: '袖头长', lowerHem: '下摆',
        bicep: '袖肥', cuff: '袖口', frontWidth: '前宽', backWidth: '后宽',
        shoulderOfLongSleeve: '长袖肩宽', shoulderOfShortSleeve: '短袖肩宽',
        yokeOfLongSleeve: '长袖过肩', yokeOfShortSleeve: '短袖过肩'
      },
      trousers_parts: {
        waist: '腰围', ass: '臀围', crotch: '通裆', rise: '立裆', crosspiece: '横档',
        midCrotch: '中档', leg: '裤长', trouserEnds: '脚口', frontRise: '前浪', backRise: '后浪'
      },
      SHOULDER_TYPE: [
        '正常', '轻微溜肩', '中度溜肩', '严重溜肩', '轻微耸肩', '中度耸肩', '严重耸肩'
      ],
      ARM_TYPE: [
        '正常', '靠前', '轻微靠后', '严重靠后'
      ],
      ABDOMEN_TYPE: [
        '正常', '中腹', '大腹'
      ],
      NECK_TYPE: [
        '正常', '短', '长'
      ],
      HIP_TYPE: [
        '正常', '凸臀', '平臀', '坠臀'
      ],
      WAIST_HEIGHT: [
        '正常', '前高1cm', '前高2cm', '前高3cm', '前高4cm', '前低1cm', '前低2cm', '前低3cm', '前低4cm',
        '前低5cm', '前低6cm', '前低7cm', '前低8cm'
      ],
      SPECIAL_TYPE: {
        hunched: '驼背', pigeonBreast: '鸡胸', chestOut: '挺胸', muscular: '肌肉型', forwardShoulder: '前冲肩', breakingShoulder: '后掰肩'
      },
      DRESSING_STYLE: {
        NORMAL: '标准', LOOSE: '宽松', FIT: '收身合体', TIGHT: '紧身'
      },
      FIGURE_TYPE: {
        NORMAL: '标准', THIN: '瘦型', FAT: '肥胖', ROBUST: '健壮'
      },
      NET_SIZE_A_PART: {
        length: '衣长', frontLength: '前长', backLength: '后长', chest: '胸围', middleChest: '中腰',
        lowerHem: '下摆', shoulder: '肩宽', sleeve: '袖长', frontWidth: '前宽', backWidth: '后宽',
        sleeveWidth: '袖肥', cuff: '袖口', firstButton: '首扣距肩', neck: '领围'
      },
      OTHER_A_PART: [
        '左溜肩', '右溜肩', '前中', '后领皱', '前胸围', '后胸围', '后中背撇', '挺胸打开', '凸肚打开', '袖笼深',
        '西服侧缝B', '西服侧缝H', '西服侧缝W', '前腰围', '后腰围', '前臀围', '后臀围', '叠袖', '袖山高', '前N点', '后N点',
        '肚省', '前冲肩'
      ],
      NET_SIZE_B_PART: {
        waist: '腰围', ass: '臀围', crotch: '通裆', rise: '立裆', crosspiece: '横档', bottom: '裤脚口',
        leg: '裤长', insideLeg: '内长', knee: '膝围', frontRise: '前腰高/前浪', backRise: '后腰高/后浪'
      },
      OTHER_B_PART: [
        '平臀', '翘臀', '大裆弯', '前省调整'
      ],
      NET_SIZE_C_PART: {
        frontLength: '前长', backLength: '后长',  waist: '腰围', ass: '臀围', lowerHem: '下摆', shoulder: '肩宽',
        neck: '领围', frontWaist: '前腰节', backWaist: '后腰节'
      },
      OTHER_C_PART: [
        '挺胸打开', '凸肚打开', 'F'
      ],
      NET_SIZE_E_PART: {
        length: '衣长', waist: '腰围', middleChest: '中腰', lowerHem: '下摆', shoulder: '肩宽',
        sleeve: '袖长', upperArm: '上臂围', frontWaist: '前腰节', backWaist: '后腰节', neck: '领围'
      },
      OTHER_E_PART: [
        '左溜肩', '右溜肩', '前中', '后领皱', '前胸围', '后胸围', '后中背撇', '挺胸打开', '凸肚打开', '袖笼深',
        '前腰围', '后腰围', '前臀围', '后臀围', '叠袖', '袖山高', '前N点', '后N点',
        '肚省', '前冲肩'
      ],
      NET_SIZE_D_PART: {
        frontLength: '前长', backLength: '后长', chest: '胸围', middleChest: '中腰', lowerHem: '下摆',
        shoulder: '肩宽', leftSleeve: '左袖长', rightSleeve: '右袖长', neck: '领围', leftWrist: '左手腕围', rightWrist: '右手腕围',
        upperArm: '上臂围', frontWaist: '前腰节', backWaist: '后腰节'
      },
      OTHER_D_PART: [
        '后领窝', '袖山高', '领高'
      ],
      FIGURE_A_E_PART: {
        leftShoulder: '左肩', rightShoulder: '右肩', arm: '手臂', abdomen: '肚子',
        neck: '脖颈', hip: '臀部', hunched: '驼背', pigeonBreast: '鸡胸', chestOut: '挺胸',
        muscular: '肌肉型', forwardShoulder: '前冲肩', breakingShoulder: '后掰肩'
      },
      FIGURE_B_PART: {
        hip: '臀部', waist: '裤腰'
      },
      FIGURE_C_PART: {
        leftShoulder: '左肩', rightShoulder: '右肩', abdomen: '肚子'
      },
      FIGURE_D_PART: {
        leftShoulder: '左肩', rightShoulder: '右肩', arm: '手臂', abdomen: '肚子',
        neck: '脖颈'
      },
      A_STYLE: {
        单排扣: ['无', '一粒', '二粒', '三粒', '四粒', '五粒', '三粒扣段返', '中山装', '暗门禁四粒', '暗门禁五粒', '关门领'],
        双排扣: ['无', '关门领', '二扣一', '四扣一', '四扣二', '六扣一', '六扣二'],
        领型: ['平驳头', '枪驳头', '青果领', '立领', '中山装', '其他特殊'],
        驳头宽: ['0cm', '5.5cm', '6cm', '6.5cm', '7cm', '7.5cm', '8cm', '8.5cm', '9cm', '9.5cm', '10cm', '10.5cm', '11cm', '12cm'],
        开气: ['单开', '双开', '不开'],
        里款式: ['全里', '半里', '观音里'],
        过面: ['直过面', '弯过面', '接过面', '大过面'],
        内兜牙: ['顺色', '撞色', '面料'],
        胸兜: ['无', '普通', '船型', '明贴兜'],
        腰兜: ['直兜带兜盖', '斜兜带兜盖', '直兜双牙', '斜兜双牙', '明贴兜', '兜板', '直兜+零钱兜', '斜兜+零钱兜'],
        袖扣: ['无', '三粒平扣', '四粒平扣', '四粒叠扣', '五粒平扣', '五粒叠扣'],
        袖开衩: ['无', '真衩', '假衩'],
        外珠边: ['正常', '0.5cm', '0.8cm'],
        内珠边: ['顺色', '撞色', '无'],
        色丁: ['无', '仅过面', '过面+兜牙', '过面+兜牙+胸兜', '仅领面'],
        防开叉带: ['无', '有'],
        汗巾: ['无', '三角', '半圆', '桃心', 'U型'],
        袖里: ['顺色', '专用袖里'],
        内部兜: ['里兜+笔兜+烟兜', '里兜+水滴兜+烟兜', '里兜+水滴兜+名片兜+烟兜', '里兜+笔兜']
      },
      B_STYLE: {
        前褶: ['无褶', '单褶', '双褶', '尖褶'],
        裤兜: ['直兜', '斜兜2.5cm', '斜兜3.5cm'],
        裤口: ['正常', '外翻边', '斜脚口', '散口'],
        表兜: ['无', '有'],
        过腰: ['无', '宝剑头', '方头', '圆头'],
        膝里: ['有', '无']
      },
      C_STYLE: {
        款式: ['单排三粒', '单排四粒', '单排五粒', '单排六粒', '双排六扣三'],
        领型: ['平驳头', '枪驳头', '青果领', '无领普通', 'U型无领'],
        后背: ['里料', '本料'],
        后领窝: ['无领托', '有领托'],
        开气: ['侧开叉', '无开叉']
      },
      D_STYLE: {
        领型: ['中八6cm', '中八6.5cm', '中八7cm', '中八7.5cm', '小方领', '温莎7cm', '立领', '尖领7cm', '尖领扣7cm', '尖领暗扣7cm', '礼服领', '一字领7.5cm', '下领双扣', '其他备注注明'],
        袖口: ['圆角一粒(共两粒扣)', '圆角竖排二粒(共四粒扣)', '截角竖排二粒(共四粒扣)', '截角一粒(共两粒扣)'],
        门襟: ['明门襟', '暗门襟', '无门襟'],
        口袋: ['截角', '圆角', '尖角', '无口袋'],
        后背: ['两侧', '工型褶', '无褶', '腰褶'],
        下摆: ['小圆摆', '大圆摆', '直摆']
      },
      E_STYLE: {
        款式: ['单排三粒', '单排四粒', '单排两粒', '双排四扣二', '双排六扣三'],
        领型: ['平驳头', '枪驳头', '立领', '关门领'],
        开气: ['单开叉', '双开叉', '无开叉'],
        腰兜: ['直兜带兜盖', '斜插兜', '明贴兜', '双牙兜', '无兜']
      },
      A_E_POSITION: [
        '上衣左侧口袋上部', '上衣右侧口袋上部', '绣在一小块面料上(5.5×8cm),缝在左笔袋下方里布上', '上衣右侧口袋上部', '绣在一小块面料上(5.5×8cm),缝在右笔袋下方里布上'
      ],
      B_POSITION: [
        '裤腰左内侧', '裤腰右内侧', '右后口袋上方2cm处,左右居中'
      ],
      C_POSITION: [
        '左前面底部', '右前面底部'
      ],
      D_POSITION: [
        '左手袖口外侧', '左手袖口内侧', '右手袖口内侧', '右手袖口外侧', '口袋上方居中', '口袋上方靠近门禁位置',
        '左短袖袖口居中', '右短袖袖口居中'
      ],
      FONT: [
        '花体', '楷体', '宋体'
      ],
      COLOR: [
        '白', '银灰', '浅灰', '顺色', '浅蓝', '蓝', '深蓝', '金色', '黄色', '紫色', '粉色', '黑色', '红色', '绿色'
      ]


    };

    angular.forEach(config, function (key, value) {
        app.constant(value, key);
    });
}();























