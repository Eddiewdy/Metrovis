/*
函数功能：绘制地图
在地图上体现不同数量的人口分布
 */
function drawMap() {
  var myChart = echarts.init(document.querySelector("#map"));
  var resize = {
    width: 600,
    height: 680
  };
  myChart.resize(resize);

  var geoCoordMap = {
    '山东': [117.000923, 36.675807],
    '河北': [115.48333, 38.03333],
    '吉林': [125.35000, 43.88333],
    '黑龙江': [127.63333, 47.75000],
    '辽宁': [123.38333, 41.80000],
    '内蒙古': [111.670801, 41.818311],
    '新疆': [87.68333, 43.76667],
    '甘肃': [103.73333, 36.03333],
    '宁夏': [106.26667, 37.46667],
    '山西': [112.53333, 37.86667],
    '陕西': [108.95000, 34.26667],
    '河南': [113.65000, 34.76667],
    '安徽': [117.283042, 31.86119],
    '江苏': [119.78333, 32.05000],
    '浙江': [120.20000, 30.26667],
    '福建': [118.30000, 26.08333],
    '广东': [113.23333, 23.16667],
    '江西': [115.90000, 28.68333],
    '海南': [110.35000, 20.01667],
    '广西': [108.320004, 22.82402],
    '贵州': [106.71667, 26.56667],
    '湖南': [113.00000, 28.21667],
    '湖北': [114.298572, 30.584355],
    '四川': [104.06667, 30.66667],
    '云南': [102.73333, 25.05000],
    '西藏': [91.00000, 30.60000],
    '青海': [96.75000, 36.56667],
    '天津': [117.20000, 39.13333],
    '上海': [121.55333, 31.20000],
    '重庆': [106.45000, 29.56667],
    '北京': [116.41667, 39.91667],
    '台湾': [121.30, 25.03],
    '香港': [114.10000, 22.20000],
    '澳门': [113.50000, 22.20000],
  };
  var dataList = [{
    "name": "北京",
    "value": 302
  }, {
    "name": "天津",
    "value": 492
  }, {
    "name": "河北",
    "value": 1568
  }, {
    "name": "山西",
    "value": 1296
  }, {
    "name": "内蒙古",
    "value": 704
  }, {
    "name": "辽宁",
    "value": 956
  }, {
    "name": "吉林",
    "value": 608
  }, {
    "name": "黑龙江",
    "value": 1047
  }, {
    "name": "上海",
    "value": 418
  }, {
    "name": "江苏",
    "value": 2021
  }, {
    "name": "浙江",
    "value": 1086
  }, {
    "name": "安徽",
    "value": 1925
  }, {
    "name": "福建",
    "value": 1087
  }, {
    "name": "江西",
    "value": 1397
  }, {
    "name": "山东",
    "value": 2011
  }, {
    "name": "河南",
    "value": 2557
  }, {
    "name": "湖北",
    "value": 2688
  }, {
    "name": "湖南",
    "value": 2422
  }, {
    "name": "广东",
    "value": 1742
  }, {
    "name": "广西",
    "value": 1278
  }, {
    "name": "海南",
    "value": 184
  }, {
    "name": "重庆",
    "value": 48856
  }, {
    "name": "四川",
    "value": 40205
  }, {
    "name": "贵州",
    "value": 2856
  }, {
    "name": "云南",
    "value": 1194
  }, {
    "name": "西藏",
    "value": 104
  }, {
    "name": "陕西",
    "value": 1340
  }, {
    "name": "甘肃",
    "value": 1182
  }, {
    "name": "青海",
    "value": 257
  }, {
    "name": "宁夏",
    "value": 264
  }, {
    "name": "新疆",
    "value": 735
  }];
  var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i]["name"]];
      if (geoCoord) {
        res.push({
          name: data[i]["name"],
          value: geoCoord.concat(data[i]["value"])
        });
      }
    }
    console.log(res)
    return res;
  };

  var series = [{
    name: "",
    type: "effectScatter",
    coordinateSystem: "geo",
    zlevel: 2,
    rippleEffect: {
      brushType: "stroke"
    },
    hoverAnimation: true,
    label: {
      normal: {
        position: "right",
        show: false,
        formatter: ""
      }
    },
    symbolSize: (val) => {
      let max = 50000
      let min = 100
      let d = (max - min) / 5
      let a = [min, min + d, min + d * 2, min + d * 3, min + d * 4, max]
      for (let i = 0; i < a.length - 1; i++) {
        tem = val[2]
        if (tem > a[i] && tem < a[i + 1]) {
          return 10 + i * 5
        }
      }
    },
    itemStyle: {
      normal: {
        color: "#288769"
      },
      emphasis: {
        areaColor: "#2B91B7"
      }
    },
    data: convertData(dataList)
  }];
  var option = {
    title:{
      text:' 用户地理位置分布',
      left:'35%',
      textStyle:{
        color:'#ffffff',
        fontSize:'24px'
      }
    },
    tooltip: {
      trigger: "item",
      formatter: function (data) {
        return "省份：" + data.name + "</br>乘客数量：" + data.value[2];
      }
    },
    geo: {
      map: "china",
      left: '12%',
      top: '16%',
      label: {
        emphasis: {
          show: true,
          color: "#fff"
        }
      },
      // 把中国地图放大了1.25倍
      zoom: 1.21,
      //不能放大了
      roam: true,
      itemStyle: {
        normal: {
          // 地图省份的背景颜色
          areaColor: "rgba(52,144,186,0.3)",
          borderColor: "#195BB9",
          borderWidth: 1
        },
        emphasis: {
          areaColor: "rgba(40, 41, 160,0.6)"
        }
      }
    },
    series: series,
    visualMap: { // 视觉映射组件
      type: 'piecewise',
      left: '5%',
      top: '5%',
      splitNumber: 4,
      max: 3000,
      min: 100,
      maxOpen:3000,
      bottom: 20,
      calculable: true,
      inRange: {
        color: ["#55ffff", "#00ff00", "#ffff00", "#F8B448",'#FD665F']
      },
      outOfRange:{
        color:'grey'
      },
      textStyle: {
        color: "#FFF"
      }
    }
  };
  myChart.setOption(option);
  // 监听浏览器缩放，图表对象调用缩放resize函数
  window.addEventListener("resize", function () {
    myChart.resize();
  });
  //监听点击事件
  myChart.on('click',(params)=>{
    if(params.componentType === 'geo'){
      pro_name = params.name;
      $.when(
        $.get('../data/users_pro.json')
      )
      .done(function (data) {
        userVm.users = data[pro_name]
        console.log(users)
      })
    }
  })
}
/**
 *显示乘客路线
 */
function drawUserRoute(userId) {
  if (userId) {
    let lineData = [
      /*一号线的数据*/
      {
        'coords': [
          [0, 490],
          [5, 490],
          [55, 490],
          [105, 490],
          [155, 490],
          [205, 490],
          [255, 490],
          [305, 490],
          [355, 490],
          //衔接1
          [415, 490],
          [415, 440],
          [415, 390],
          [415, 340],
          //衔接2
          [415, 290],
          [465, 290],
          [515, 290],
          [565, 290],
          [615, 290],
          [665, 290],
          [715, 290],
          [765, 290],
          [815, 290],
          [915, 290],
          [1015, 290],
          [1067, 290],
          [1119, 290],
          [1119, 350],
          [1119, 375],
        ]
      },
      /*二号线的数据*/
      {
        'coords': [
          [550, 20],
          [600, 20],
          [450, 20],
          [400, 20],
          [400, 70],
          [400, 120],
          [450, 120],
          [500, 120],
          [550, 120],
          [600, 120],
          [650, 120],
          [700, 120],
          [738.3333333333334, 143.33333333333334],
          [776.6666666666667, 166.66666666666669],
          [815.0, 190.0],
          [815, 240],
          [815, 290],
          //衔接1
          [815, 340],
          [853, 340],
          [891, 340],
          [929, 340],
          [967, 340],
          [1005, 340],
          [1043, 340],
          [1081, 340],
          [1119, 290]
        ]
      },
      /*三号线的数据*/
      {
        'coords': [
          [600, 20],
          [650, 20],
          [700, 20],
          [750, 20],
          [800, 20],
          [850, 20],
          [900, 20],
          [950, 20],
          [1000, 20],
          [1050, 20],
          [1100, 20],
          //衔接一
          [1150, 20],
          [1150, 70],
          [1150, 110],
          [1150, 150],
          [1150, 190],
          //衔接二
          [1150, 230],
          //中间的点
          [1107, 230],
          //[1055, 230],
          //[1015, 230],
          [1067, 230],
          //[1067, 230],
          [1015, 290],
          [930, 340],
          [870, 400],
          [870, 400],
          [870, 440],
          [870, 480],
          [870, 520],
          [870, 520],
          [910, 520],
          [950, 520],
          [990, 520],
          [1030, 560],
          [1030, 592],
          [1030, 624],
          [1030, 656],
          [1030, 688],
          [1030, 720],
          [1030, 752],
          [1030, 752],
          [1085, 752],
          [1140, 752],
          [1195, 752],
          [1250, 752],
          [1305, 752],
          [1360, 752],
          [1360, 810],
          [1360, 858],
          [1360, 858],
          [1400, 858],
          [1440, 858],
          [1480, 858],
          [1520, 858],
          [1580, 858]
        ]
      },
      //四号线的数据
      {
        'coords': [
          [979, 560],
          //衔接一
          [979, 592],
          [1030, 592],
          [1080, 592],
          [1130, 592],
          [1180, 592],
          [1230, 592],
          [1280, 592],
          [1330, 592],
          [1400, 592]
        ]
      },
      //五号线的数据
      {
        'coords': [
          [929, 752],
          [929, 707],
          [929, 662],
          [929, 617],
          [870, 590],
          [820, 590],
          [770, 590],
          [700, 530],
          [700, 480],
          [700, 430],
          [700, 350]
        ]
      },
      //十号线的数据
      {
        'coords': [
          [700, 900],
          [700, 835],
          [700, 785],
          [800, 785],
          [900, 785],
          [1000, 785],
          [1100, 785],
          [1200, 785],
          //衔接一
          [1412, 785],
          [1412, 752],
          [1412, 702],
          //衔接2
          [1412, 660],
          [1372, 660],
          [1312, 660],
          [1252, 660],
          [1192, 660],
          [1132, 660],
          [1030, 592],
          [1030, 560],

          [1082, 528],
          [1082, 480],
          [1082, 448]
        ]
      },
      //11号线前半段数据
      {
        'coords': [
          [10, 662],
          [60, 662],
          [120, 662],
          [180, 662],
          [240, 662],
          [300, 662],
          [360, 662],
          [420, 662],
          [460, 662],
          [510, 662],
          [510, 612],
          [565, 612],
          [620, 612],
          [675, 612],
          [700, 530],
          [700, 480],
          [784, 480],
          [870, 480],
          [995, 480],
          [1080, 480],
          [1118, 480],
          [1120, 440],
          [1120, 385],
          [1118, 350],
          [1250, 350],
          [1305, 350],
          [1355, 290],
          [1355, 235],
          [1355, 180],
          [1355, 120],

        ]
      },
      //11号线后半段数据
      {
        'coords': [
          [510, 662],
          [565, 662],
          [620, 662],
          [675, 662],
          [701, 735],
          [701, 785],
          [701, 835]
        ]
      },
      //环线12号数据
      {
        'coords': [
          [465, 210],
          [465, 290],
          [465, 370],
          [465, 430],
          [465, 490],
          [560, 530],
          [698, 530],
          [800, 560],
          [880, 560],
          [980, 560],
          [1030, 560],
          [1110, 550],
          [1118, 480],
          [1250, 480],
          [1250, 420],
          [1250, 350],
          [1250, 190],
          [1200, 150],
          [1150, 150],
          [1100, 150],
          [950, 158],
          [815, 190],
          [765, 190],
          [705, 190],
          [645, 190],
          [575, 150],
          [465, 210]
        ]
      }
    ]
    let itemData = [
      /* 一号线的点: */

      {
        'name': 'Sta104',
        'value': [5, 490, 0]
      }, {
        'name': 'Sta65',
        'value': [55, 490, 0]
      }, {
        'name': 'Sta49',
        'value': [105, 490, 0]
      }, {
        'name': 'Sta149',
        'value': [155, 490, 0]
      }, {
        'name': 'Sta74',
        'value': [205, 490, 0]
      }, {
        'name': 'Sta128',
        'value': [255, 490, 0]
      }, {
        'name': 'Sta106',
        'value': [355, 490, 0]
      }, {
        'name': 'Sta110',
        'value': [415, 440, 0]
      }, {
        'name': 'Sta97',
        'value': [415, 390, 0]
      }, {
        'name': 'Sta80',
        'value': [415, 340, 0]
      }, {
        'name': 'Sta64',
        'value': [515, 290, 0]
      }, {
        'name': 'Sta150',
        'value': [565, 290, 0]
      }, {
        'name': 'Sta154',
        'value': [615, 290, 0]
      }, {
        'name': 'Sta107',
        'value': [665, 290, 0]
      }, {
        'name': 'Sta83',
        'value': [715, 290, 0]
      }, {
        'name': 'Sta108',
        'value': [765, 290, 0]
      }, {
        'name': 'Sta159',
        'value': [915, 290, 0]
      }, {
        'name': 'Sta1',
        'value': [1067, 290, 0]
      },
      /*二号线的点: */
      {
        'name': 'Sta155',
        'value': [600, 20, 0]
      }, {
        'name': 'Sta51',
        'value': [550, 20, 0]
      }, {
        'name': 'Sta105',
        'value': [450, 20, 0]
      }, {
        'name': 'Sta24',
        'value': [400, 20, 0]
      }, {
        'name': 'Sta139',
        'value': [400, 70, 0]
      }, {
        'name': 'Sta71',
        'value': [400, 120, 0]
      }, {
        'name': 'Sta57',
        'value': [450, 120, 0]
      }, {
        'name': 'Sta76',
        'value': [500, 120, 0]
      }, {
        'name': 'Sta52',
        'value': [550, 120, 0]
      }, {
        'name': 'Sta68',
        'value': [600, 120, 0]
      }, {
        'name': 'Sta151',
        'value': [650, 120, 0]
      }, {
        'name': 'Sta48',
        'value': [700, 120, 0]
      }, {
        'name': 'Sta27',
        'value': [738.3333333333334, 143.33333333333334, 0]
      }, {
        'name': 'Sta81',
        'value': [776.6666666666667, 166.66666666666669, 0]
      }, {
        'name': 'Sta127',
        'value': [815.0, 190.0, 0]
      }, {
        'name': 'Sta123',
        'value': [815, 240, 0]
      }, {
        'name': 'Sta47',
        'value': [815, 290, 0]
      }, {
        'name': 'Sta18',
        'value': [853, 340, 0]
      }, {
        'name': 'Sta79',
        'value': [891, 340, 0]
      }, {
        'name': 'Sta98',
        'value': [929, 340, 0]
      }, {
        'name': 'Sta78',
        'value': [967, 340, 0]
      }, {
        'name': 'Sta53',
        'value': [1005, 340, 0]
      }, {
        'name': 'Sta163',
        'value': [1043, 340, 0]
      }, {
        'name': 'Sta9',
        'value': [1081, 340, 0]
      }, {
        'name': 'Sta129',
        'value': [1119, 350, 0]
      }, /* 三号线的点: */
      {
        'name': 'Sta155',
        'value': [600, 20, 0]
      }, {
        'name': 'Sta143',
        'value': [650, 20, 0]
      }, {
        'name': 'Sta156',
        'value': [700, 20, 0]
      }, {
        'name': 'Sta61',
        'value': [750, 20, 0]
      }, {
        'name': 'Sta50',
        'value': [800, 20, 0]
      }, {
        'name': 'Sta119',
        'value': [850, 20, 0]
      }, {
        'name': 'Sta66',
        'value': [900, 20, 0]
      }, {
        'name': 'Sta12',
        'value': [950, 20, 0]
      }, {
        'name': 'Sta161',
        'value': [1000, 20, 0]
      }, {
        'name': 'Sta21',
        'value': [1050, 20, 0]
      }, {
        'name': 'Sta133',
        'value': [1100, 20, 0]
      }, {
        'name': 'Sta22',
        'value': [1150, 70, 0]
      }, {
        'name': 'Sta138',
        'value': [1150, 110, 0]
      }, {
        'name': 'Sta41',
        'value': [1150, 150, 0]
      }, {
        'name': 'Sta30',
        'value': [1150, 190, 0]
      }, {
        'name': 'Sta67',
        'value': [1107, 230, 0]
      }, {
        'name': 'Sta144',
        'value': [1067, 230, 0]
      }, {
        'name': 'Sta144',
        'value': [1067, 230, 0]
      }, {
        'name': 'Sta5',
        'value': [1067, 290, 0]
      }, {
        'name': 'Sta98',
        'value': [930, 340, 0]
      }, {
        'name': 'Sta29',
        'value': [870, 400, 0]
      }, {
        'name': 'Sta29',
        'value': [870, 400, 0]
      }, {
        'name': 'Sta126',
        'value': [870, 440, 0]
      }, {
        'name': 'Sta115',
        'value': [870, 480, 0]
      }, {
        'name': 'Sta115',
        'value': [870, 520, 0]
      }, {
        'name': 'Sta115',
        'value': [870, 520, 0]
      }, {
        'name': 'Sta40',
        'value': [910, 520, 0]
      }, {
        'name': 'Sta131',
        'value': [950, 520, 0]
      }, {
        'name': 'Sta39',
        'value': [990, 520, 0]
      }, {
        'name': 'Sta135',
        'value': [1030, 560, 0]
      }, {
        'name': 'Sta100',
        'value': [1030, 624, 0]
      }, {
        'name': 'Sta167',
        'value': [1030, 656, 0]
      }, {
        'name': 'Sta135',
        'value': [1030, 688, 0]
      }, {
        'name': 'Sta113',
        'value': [1030, 720, 0]
      }, {
        'name': 'Sta141',
        'value': [1030, 752, 0]
      }, {
        'name': 'Sta141',
        'value': [1030, 752, 0]
      }, {
        'name': 'Sta142',
        'value': [1085, 752, 0]
      }, {
        'name': 'Sta158',
        'value': [1140, 752, 0]
      }, {
        'name': 'Sta44',
        'value': [1195, 752, 0]
      }, {
        'name': 'Sta117',
        'value': [1250, 752, 0]
      }, {
        'name': 'Sta147',
        'value': [1305, 752, 0]
      }, {
        'name': 'Sta42',
        'value': [1360, 752, 0]
      }, {
        'name': 'Sta35',
        'value': [1360, 810, 0]
      }, {
        'name': 'Sta109',
        'value': [1360, 858, 0]
      }, {
        'name': 'Sta109',
        'value': [1360, 858, 0]
      }, {
        'name': 'Sta33',
        'value': [1400, 858, 0]
      }, {
        'name': 'Sta112',
        'value': [1440, 858, 0]
      }, {
        'name': 'Sta153',
        'value': [1480, 858, 0]
      }, {
        'name': 'Sta125',
        'value': [1520, 858, 0]
      },
      /* 四号线的点: */
      {
        'name': 'Sta84',
        'value': [979, 560, 0]
      }, {
        'name': 'Sta134',
        'value': [1030, 592, 0]
      }, {
        'name': 'Sta134',
        'value': [1080, 592, 0]
      }, {
        'name': 'Sta59',
        'value': [1130, 592, 0]
      }, {
        'name': 'Sta19',
        'value': [1180, 592, 0]
      }, {
        'name': 'Sta62',
        'value': [1230, 592, 0]
      }, {
        'name': 'Sta165',
        'value': [1280, 592, 0]
      }, {
        'name': 'Sta58',
        'value': [1330, 592, 0]
      },
      /* 五号线的点: */
      {
        'name': 'Sta54',
        'value': [929, 752, 0]
      }, {
        'name': 'Sta23',
        'value': [929, 707, 0]
      }, {
        'name': 'Sta56',
        'value': [929, 662, 0]
      }, {
        'name': 'Sta23',
        'value': [929, 617, 0]
      }, {
        'name': 'Sta56',
        'value': [870, 590, 0]
      }, {
        'name': 'Sta69',
        'value': [820, 590, 0]
      }, {
        'name': 'Sta16',
        'value': [770, 590, 0]
      }, {
        'name': 'Sta37',
        'value': [700, 530, 0]
      }, {
        'name': 'Sta132',
        'value': [700, 480, 0]
      }, {
        'name': 'Sta96',
        'value': [700, 430, 0]
      },
      /* 六号线的点: */
      {
        'name': 'Sta28',
        'value': [60, 662, 0]
      }, {
        'name': 'Sta124',
        'value': [120, 662, 0]
      }, {
        'name': 'Sta99',
        'value': [180, 662, 0]
      }, {
        'name': 'Sta166',
        'value': [240, 662, 0]
      }, {
        'name': 'Sta36',
        'value': [300, 662, 0]
      }, {
        'name': 'Sta122',
        'value': [360, 662, 0]
      }, {
        'name': 'Sta77',
        'value': [420, 662, 0]
      }, {
        'name': 'Sta140',
        'value': [460, 662, 0]
      }, {
        'name': 'Sta111',
        'value': [510, 662, 0]
      }, {
        'name': 'Sta13',
        'value': [510, 612, 0]
      }, {
        'name': 'Sta70',
        'value': [565, 612, 0]
      }, {
        'name': 'Sta55',
        'value': [620, 612, 0]
      }, {
        'name': 'Sta20',
        'value': [675, 612, 0]
      }, {
        'name': 'Sta23',
        'value': [700, 530, 0]
      }, {
        'name': 'Sta56',
        'value': [700, 480, 0]
      }, {
        'name': 'Sta118',
        'value': [784, 480, 0]
      }, {
        'name': 'Sta115',
        'value': [870, 480, 0]
      }, {
        'name': 'Sta162',
        'value': [995, 480, 0]
      }, {
        'name': 'Sta114',
        'value': [1080, 480, 0]
      }, {
        'name': 'Sta15',
        'value': [1118, 480, 0]
      }, {
        'name': 'Sta86',
        'value': [1120, 440, 0]
      }, {
        'name': 'Sta46',
        'value': [1120, 385, 0]
      }, {
        'name': 'Sta63',
        'value': [1118, 350, 0]
      }, {
        'name': 'Sta3',
        'value': [1250, 350, 0]
      }, {
        'name': 'Sta25',
        'value': [1305, 350, 0]
      }, {
        'name': 'Sta146',
        'value': [1355, 290, 0]
      }, {
        'name': 'Sta130',
        'value': [1355, 235, 0]
      }, {
        'name': 'Sta120',
        'value': [1355, 180, 0]
      }, {
        'name': 'Sta146',
        'value': [565, 662, 0]
      }, {
        'name': 'Sta130',
        'value': [620, 662, 0]
      }, {
        'name': 'Sta120',
        'value': [675, 662, 0]
      }, {
        'name': 'Sta146',
        'value': [701, 735, 0]
      }, {
        'name': 'Sta130',
        'value': [701, 785, 0]
      }, {
        'name': 'Sta120',
        'value': [701, 835, 0]
      }, /* 环线的点: */
      {
        'name': 'Sta14',
        'value': [465, 210, 0]
      }, {
        'name': 'Sta89',
        'value': [465, 290, 0]
      }, {
        'name': 'Sta73',
        'value': [465, 370, 0]
      }, {
        'name': 'Sta148',
        'value': [465, 430, 0]
      }, {
        'name': 'Sta60',
        'value': [465, 490, 0]
      }, {
        'name': 'Sta91',
        'value': [560, 530, 0]
      }, {
        'name': 'Sta55',
        'value': [698, 530, 0]
      }, {
        'name': 'Sta32',
        'value': [800, 560, 0]
      }, {
        'name': 'Sta116',
        'value': [880, 560, 0]
      }, {
        'name': 'Sta84',
        'value': [980, 560, 0]
      }, {
        'name': 'Sta135',
        'value': [1030, 560, 0]
      }, {
        'name': 'Sta92',
        'value': [1110, 550, 0]
      }, {
        'name': 'Sta15',
        'value': [1118, 480, 0]
      }, {
        'name': 'Sta31',
        'value': [1250, 480, 0]
      }, {
        'name': 'Sta93',
        'value': [1250, 420, 0]
      }, {
        'name': 'Sta3',
        'value': [1250, 350, 0]
      }, {
        'name': 'Sta72',
        'value': [1250, 190, 0]
      }, {
        'name': 'Sta95',
        'value': [1200, 150, 0]
      }, {
        'name': 'Sta41',
        'value': [1150, 150, 0]
      }, {
        'name': 'Sta90',
        'value': [1100, 150, 0]
      }, {
        'name': 'Sta26',
        'value': [950, 158, 0]
      }, {
        'name': 'Sta15',
        'value': [815, 190, 0]
      }, {
        'name': 'Sta17',
        'value': [765, 190, 0]
      }, {
        'name': 'Sta101',
        'value': [705, 190, 0]
      }, {
        'name': 'Sta136',
        'value': [645, 190, 0]
      }, {
        'name': 'Sta101',
        'value': [575, 150, 0]
      },
      /* 十号线的点: */
      {
        'name': 'Sta102',
        'value': [700, 835, 0]
      }, {
        'name': 'Sta75',
        'value': [700, 785, 0]
      }, {
        'name': 'Sta8',
        'value': [800, 785, 0]
      }, {
        'name': 'Sta6',
        'value': [900, 785, 0]
      }, {
        'name': 'Sta7',
        'value': [1000, 785, 0]
      }, {
        'name': 'Sta160',
        'value': [1100, 785, 0]
      }, {
        'name': 'Sta94',
        'value': [1200, 785, 0]
      }, {
        'name': 'Sta87',
        'value': [1412, 752, 0]
      }, {
        'name': 'Sta88',
        'value': [1412, 702, 0]
      }, {
        'name': 'Sta145',
        'value': [1372, 660, 0]
      }, {
        'name': 'Sta103',
        'value': [1312, 660, 0]
      }, {
        'name': 'Sta4',
        'value': [1252, 660, 0]
      }, {
        'name': 'Sta2',
        'value': [1192, 660, 0]
      }, {
        'name': 'Sta85',
        'value': [1132, 660, 0]
      }, {
        'name': 'Sta134',
        'value': [1030, 592, 0]
      }, {
        'name': 'Sta135',
        'value': [1030, 560, 0]
      }, {
        'name': 'Sta168',
        'value': [1082, 528, 0]
      }, {
        'name': 'Sta114',
        'value': [1082, 480, 0]
      }, {
        'name': 'Sta157',
        'value': [1082, 448, 0]
      },
      /*换乘站
           {
             'name': '换乘站 S]ta89',
             'value': [465, 290, 0]
           },
           {
             'name': '换乘站 Sta47',
             'value': [820, 290, 0]
           },
           {
             'name': '换乘站 Sta5',
             'value': [1015, 290, 0]
           },
           {
             'name': '换乘站 Sta129',
             'value': [1119, 290, 0]
           },
           {
             'name': '换乘站 Sta63',
             'value': [1119, 350, 0]
           },
           {
             'name': '换乘站 Sta127',
             'value': [820, 190.0, 0]
           },
           {
             'name': '换乘站 Sta98',
             'value': [930, 340, 0]
           },
           {
             'name': '换乘站 Sta40',
             'value': [870, 480, 0]
           },
           {
             'name': '换乘站 Sta33',
             'value': [1360, 752, 0]
           },
           {
             'name': '换乘站 Sta134',
             'value': [949, 560, 0]
           },
           {
             'name': '换乘站 Sta10',
             'value': [700, 480, 0]
           },
           {
             'name': '换乘站 Sta96',
             'value': [700, 530, 0]
           },
           {
             'name': '换乘站 Sta111',
             'value': [510, 662, 0]
           },
           {
             'name': '换乘站 Sta75',
             'value': [701, 785, 0]
           },
           {
             'name': '换乘站 Sta114',
             'value': [1040, 480, 0]
           },
           {
             'name': '换乘站 Sta3',
             'value': [1250, 350, 0]
           },
           {
             'name': '换乘站 Sta41',
             'value': [1150, 150, 0]
           },
           {
             'name': '换乘站 Sta15',
             'value': [1100, 480, 0]
           },*/
    ]
    /*
      根据不同的人流量改变图标的大小和颜色
      */
    const flow_colors = ["#15dc559e", "#d5900e9e", "#d6430e9e",
      "#8304059e"
    ]
    let flow_size = [6, 12, 16, 23]
    let subwayDom = document.getElementById("routeGraph")
    let subwayChart = echarts.init(subwayDom)
    var resize = {
      width: 500,
      height: 480
    };
    subwayChart.resize(resize);
    let route1 = [
      {'name': 'Sta55', 'value': [620, 612, 0]}, {'name': 'Sta20', 'value': [675, 612, 0]}, {'name': 'Sta118', 'value': [784, 480, 0]}, {'name': 'Sta162', 'value': [995, 480, 0]},{'name': 'Sta86', 'value': [1120, 440, 0]}, {'name': 'Sta46', 'value': [1120, 385, 0]},  {'name': 'Sta25', 'value': [1305, 350, 0]}, {'name': 'Sta146', 'value': [1355, 290, 0]}, {'name': 'Sta130', 'value': [1355, 235, 0]}, {'name': 'Sta120', 'value': [1355, 180, 0]}
    ]
    let route2 = [
      {'name': 'Sta102', 'value': [700, 835, 0]},  {'name': 'Sta8', 'value': [800, 785, 0]}, {'name': 'Sta6', 'value': [900, 785, 0]}, {'name': 'Sta7', 'value': [1000, 785, 0]}, {'name': 'Sta160', 'value': [1100, 785, 0]}, {'name': 'Sta94', 'value': [1200, 785, 0]}, {'name': 'Sta87', 'value': [1362, 752, 0]}, {'name': 'Sta88', 'value': [1362, 702, 0]}, {'name': 'Sta145', 'value': [1322, 660, 0]}, {'name': 'Sta103', 'value': [1262, 660, 0]}, {'name': 'Sta4', 'value': [1202, 660, 0]}, {'name': 'Sta2', 'value': [1142, 660, 0]}, {'name': 'Sta85', 'value': [1082, 660, 0]}, {'name': 'Sta134', 'value': [1082, 592, 0]}, {'name': 'Sta135', 'value': [1082, 560, 0]}, {'name': 'Sta168', 'value': [1082, 528, 0]},{'name': 'Sta157', 'value': [1082, 448, 0]}
    ]
    let route3 = [
      {'name': 'Sta14', 'value': [465, 210, 0]},{'name': 'Sta73', 'value': [465, 370, 0]}, {'name': 'Sta148', 'value': [465, 430, 0]}, {'name': 'Sta60', 'value': [465, 490, 0]}, {'name': 'Sta91', 'value': [560, 530, 0]}, {'name': 'Sta32', 'value': [800, 560, 0]}, {'name': 'Sta116', 'value': [880, 560, 0]}, {'name': 'Sta92', 'value': [1110, 550, 0]}, {'name': 'Sta31', 'value': [1250, 480, 0]}, {'name': 'Sta93', 'value': [1250, 420, 0]}, {'name': 'Sta72', 'value': [1250, 190, 0]}, {'name': 'Sta95', 'value': [1200, 150, 0]}, {'name': 'Sta90', 'value': [1100, 150, 0]}, {'name': 'Sta26', 'value': [950, 158, 0]}, {'name': 'Sta17', 'value': [765, 190, 0]}, {'name': 'Sta101', 'value': [705, 190, 0]}, {'name': 'Sta136', 'value': [645, 190, 0]}, {'name': 'Sta101', 'value': [575, 150, 0]}
    ]
    let show = route2
    if (userId == '1d8b4fb45c7e95a09e185c63d1149230') {
      show = route1
    } else if (userId == 'aac7b84822df54331310e8bb4111692e') {
      show = route2
    } else {
      show = route3
    }
    let option = {
      title: {
        text: userId+'用户的轨迹跟踪',
        textStyle: {
          color: 'white'
        },
        top: '2%',
        left: 'center'
      },
      backgroundColor: '#0c2034', //背景颜色

      tooltip: {},
      //xAxis和yAixs的max表示的是同一个width或height对应的不同段数 16：9来绘图
      xAxis: {
        show: false,
        min: 0,
        max: 1650,
        type: "value",
        //开启x轴坐标
        axisPointer: {
          show: false
        },
      },
      yAxis: {
        show: false,
        min: 0,
        max: 900,
        type: "value",
        //开启y轴坐标
        axisPointer: {
          show:false
        },
      },
      //实现缩放的功能
      dataZoom: [{
        type: 'inside',
        xAxisIndex: [0],


      },{
        type: 'inside',
        yAxisIndex: [0],
      }],
      
      series: [{
          type: 'lines',
          coordinateSystem: 'cartesian2d', //使用直角坐标
          polyline: true,
          lineStyle: {
            width: 5,
            color: "#ffffff", // 0% 处的颜色
            opacity:0.8
          },
          zlevel:0,
          data: lineData,
        },
        {
          type: 'scatter',
          symbol: 'circle',
          symbolSize: flow_size[0],
          effectType: 'ripple',
          data: itemData,
          itemStyle:{
            borderColor:flow_colors[0],
            color:'#ffffff',
            borderWidth:3,
          },
          zlevel:1,
        },
        {
          type: 'effectScatter',
          symbol: 'circle',
          symbolSize: flow_size[1],
          color: '#15dc559e',
          data:show,
        },
        {
          type: 'line',
          symbol: 'circle',
          symbolSize: flow_size[1],
          lineStyle:{
          
            width:5//设置线条粗细
          },
          color: 'red',
          data:show,
        },
        /* {
           type: 'effectScatter',
           symbol: 'rect',
           symbolSize: [45, 10],
           rippleEffect: {
             scale: 0 //控制涟漪动画的大小
           },
           data: [
             // {'name': '换乘站 Sta7+Sta135', 'value': [1045, 560, 0]},
             // {'name': '换乘站 Sta14+Sta6', 'value': [1045, 592, 0]},
             {
               'name': '换乘站 S]ta89',
               'value': [465, 290, 0]
             },
             {
               'name': '换乘站 Sta47',
               'value': [820, 290, 0]
             },
             {
               'name': '换乘站 Sta5',
               'value': [1015, 290, 0]
             },
             {
               'name': '换乘站 Sta129',
               'value': [1119, 290, 0]
             },
             {
               'name': '换乘站 Sta63',
               'value': [1119, 350, 0]
             },
             {
               'name': '换乘站 Sta127',
               'value': [820, 190.0, 0]
             },
             {
               'name': '换乘站 Sta98',
               'value': [930, 340, 0]
             },
             {
               'name': '换乘站 Sta40',
               'value': [870, 480, 0]
             },
             {
               'name': '换乘站 Sta33',
               'value': [1360, 752, 0]
             },
             {
               'name': '换乘站 Sta134',
               'value': [949, 560, 0]
             },
             {
               'name': '换乘站 Sta10',
               'value': [700, 480, 0]
             },
             {
               'name': '换乘站 Sta96',
               'value': [700, 530, 0]
             },
             {
               'name': '换乘站 Sta111',
               'value': [510, 662, 0]
             },
             {
               'name': '换乘站 Sta75',
               'value': [701, 785, 0]
             },
             {
               'name': '换乘站 Sta114',
               'value': [1040, 480, 0]
             },
             {
               'name': '换乘站 Sta3',
               'value': [1250, 350, 0]
             },
             {
               'name': '换乘站 Sta41',
               'value': [1145, 150, 0]
             },
             {
               'name': '换乘站 Sta15',
               'value': [1100, 480, 0]
             },

           ],

         },*/

        // {
        //   //二号线
        //   type: 'effectScatter',
        //   symbol: 'circle',
        //   symbolSize: flow_size[0],
        //   data:itemData[1],
        // },
        // {
        //   //三号线
        //   type: 'effectScatter',
        //   symbol: 'circle',
        //   symbolSize: flow_size[0],
        //   data:itemData[2],
        // },
        // {
        //   //四号线
        //   type: 'effectScatter',
        //   symbol: 'circle',
        //   symbolSize: flow_size[0],
        //   data:itemData[3],
        // },
        // {
        //   //五号线
        //   type: 'effectScatter',
        //   symbol: 'circle',
        //   symbolSize: flow_size[0],
        //   data:itemData[4],
        // },
        // {
        //   //六号线
        //   type: 'effectScatter',
        //   symbol: 'circle',
        //   symbolSize: flow_size[0],
        //   data:itemData[5],
        // },
        // {
        //   //环线
        //   type: 'effectScatter',
        //   symbol: 'circle',
        //   symbolSize: flow_size[0],
        //   data:itemData[6],
        // },
        // {
        //   //十号线
        //   type: 'effectScatter',
        //   symbol: 'circle',
        //   symbolSize: flow_size[0],
        //   data:itemData[7],
        // },
        // {
        //   data: [[1030, 592], [1083, 592]],
        //   type: 'line',
        //   lineStyle:{
        //     color:'red'
        //   },
        //   symbolSize:0
        // },
        // {
        //   data: [[1030, 560], [1083, 560]],
        //   type: 'line',
        //   lineStyle:{
        //     color:'red'
        //   },
        //   symbolSize:0
        // },
      ],
    }

    subwayChart.setOption(option);
  }
}
/*
函数功能：绘制用户的年龄金字塔图
参数：无
 */
function drawUserAge() {
  let ageChart = echarts.init(document.getElementById("age-graph"))
  var resize = {
    width: 390,
    height: 230
  };
  ageChart.resize(resize);
  let yAxis = []
  let femaleData =[ 0, -1957, -31294, -18636, -9064, -4182, -583, -83, -12, -1] 
  let maleData = [0, 1156, 25731, 11861, 5561, 2069, 268, 61, 8, 0]
  let ageData = femaleData.concat(maleData);
  maxfeVal = Math.abs(Math.min(...femaleData))
  maxVal = Math.max(...maleData)
  maxData = Math.ceil(Math.max(maxfeVal, maxVal) / 10) * 10
  for (let i = 0; i < 10; i++) {
    if (i == 9) {
      yAxis.push((i) * 10 + '+')
    } else {
      yAxis.push((i) * 10 + '-' + (i + 1) * 10)
    }
  }
  let option = {
    title: {
      text: '用户结构图',
    },
    tooltip: {
      trigger: 'axis'
      
    },
    legend: {
      data: ['男性', '女性'],
      x: '2%',
      y: '7%',

    },
    color: ["#55ffff", '#dd79ff'],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'value',
      max: maxData,
      axisLabel: {
        show: true,
        formatter: function (data) {
          if (data < 0) {
            return -data
          } else {
            return data
          }
        }
      }
    }],
    yAxis: [{
      type: 'category',

      data: yAxis
    }],
    series: [{
        name: '男性',
        type: 'bar',
        stack: ' 总量',
        barWidth: '50%',
        data: maleData
      },
      {
        name: '女性',
        type: 'bar',
        stack: ' 总量',
        barWidth: '50%',
        data: femaleData
      }
    ]

  }
  ageChart.setOption(option)
}
/*
函数功能：绘制用户的性别比例图
参数：无
 */
function drawUserGender() {
  //处理后的数据显示用户的性别为男：51593，女：73189
  let user_genders = {
    '1': 73189,
    '0': 51593
  };
  let genderChart = echarts.init(document.getElementById("gender-graph"))
  var resize = {
    width: 390,
    height: 230
  };
  genderChart.resize(resize);
  let female = user_genders[1]
  let male = user_genders[0]
  console.log(male)
  toldata = (female + male)
  gender_data = []
  gender_data.push(female / toldata)
  gender_data.push(0.6)
  gender_data.push(0.4)
  let option = {

    series: [{
      type: 'liquidFill',
      data: gender_data,
      radius: '60%',
      center: ['50%', '50%'], //所在位置
      //shape: 'pin',//气球效果 ;//'roundRect'方形效果;'diamond',菱形效果
      backgroundStyle: {
        borderWidth: 10, //内边框粗细
        // borderColor: 'red',//内边框颜色
        color: '#e5f6fe' //底色
      },

      label: {
        normal: {
          formatter: function (val) {
            return 'female:male' + '\n' + (Math.round(female / toldata * 10000) / 100.00) + '% : ' + (Math.round(male / toldata * 10000) / 100.00) + "%";
          },
          textStyle: {
            fontSize: 30, //字体大小
            color: '#fff',
          }
        }
      },
      outline: {
        show: true //边框
      }
      // waveAnimation: false, // 禁止左右波动
    }]
  };
  genderChart.setOption(option)
}
drawUserGender()
drawUserAge()
drawMap()
drawUserRoute()
users = [
  ["4b28b90b371f951259f60c822d220fbf", "北京", "1989", "女"], ["b4c07746387fd8cd95c91155aec18bc8", "北京", "1977", "女"], ["04125cfada185dc6466679da5315c837", "北京", "1975", "女"], ["12fbb15b954ff4d557a4ebc860009831", "北京", "1989", "女"], ["03a18cfcf8c3334ce9069cd525f23263", "北京", "1994", "男"], ["dca56bac60fd0c5ffe97b0f8a1cc724c", "北京", "1963", "女"], ["00a0af41603922dff6053ab915a47563", "北京", "2000", "女"], ["9a3034953d206aeb6661723065ebfaa3", "北京", "1998", "男"], ["1038a577c1e013736ecb007819757aff", "北京", "1994", "男"], ["4c6d2bab1ec542ad89a4ceac266e019b", "北京", "1970", "男"], ["de4787dc2e22aa89e0a299e90b85047d", "北京", "1991", "男"], ["40fb410db80519d8dd53988f374ea63e", "北京", "1980", "女"], ["531ea77938b66a071eac2816e6cf30cd", "北京", "1988", "女"], ["c202d84c99ae285cad6b742eedf6cdb8", "北京", "1988", "男"], ["aafcaf8f154313eb2658fce6d75a94a5", "北京", "1990", "男"], ["7316bb2a2682d3a28d666d8617797d4c", "北京", "1989", "女"], ["a348fb7754fc7d564498a30ae0b7c6bd", "北京", "1980", "女"], ["419a3fa649158594bcd28f78ca338be5", "北京", "1978", "女"], ["679fb4c959337f88419941ebe696cfd4", "北京", "1976", "女"], ["063a92b43b8040aafa21c2fbd64ef544", "北京", "1963", "男"], ["1831ddbb55476eb6310ffc18f006802f", "北京", "1997", "男"], ["277e7730463e9f128c12f9d1f3ef5b1b", "北京", "1962", "男"], ["bfdb67954b316534dacebed25489a5f4", "北京", "1985", "女"], ["412272329b34678c1cbfe2e9725a8945", "北京", "1990", "女"], ["b9e8940fc31f35a1fdec891d420d0a66", "北京", "1981", "男"], ["d963c02705f1a5eafc1031b8dc335ffb", "北京", "2001", "女"], ["39a5eed1ba43bd2f09cc7961a03796fa", "北京", "1968", "女"], ["aae4e5045df52933a2ff067853c71f20", "北京", "1952", "女"], ["889e4a5c1c4ed5e062d9f041fbe5baca", "北京", "1987", "男"], ["40cca804f234b2aab150d12ac2386e64", "北京", "1971", "女"], ["a5ae332340fba11b73bd04a44cd58c7a", "北京", "1995", "女"], ["f15257081d673f10b497d0132c07e657", "北京", "1999", "男"], ["64b5400684a0aef9a67e3abbdcef62a5", "北京", "1989", "女"], ["9168c1f3ab35c158fe85d22c7606158a", "北京", "1998", "女"], ["cd8cedda2d7ce70f37c632b1b8bb526f", "北京", "1997", "女"], ["26bd4e5febb78895c5134ce16b7c6e10", "北京", "1993", "女"], ["2e375ad4f4a7f90d4b9a4feef61e76c5", "北京", "1972", "男"], ["823d59b5ac5ce95a6eb0af3552db853c", "北京", "1998", "女"], ["902a2d31a49fe23830d789d207820b55", "北京", "1998", "男"], ["4a757616b3056ed2e145712cf58b538b", "北京", "1999", "男"], ["cb3d39cc71198966ff05589a888487f6", "北京", "1965", "女"], ["2e93d010690c96249d86f7d2e1b32a9c", "北京", "1978", "女"], ["88e6191809e2b86d4a7c715f1bc1c2ae", "北京", "1967", "女"], ["89f2f24f071533838dd59e4a44d7e240", "北京", "1971", "男"], ["e325bfb63bbc967f26b349766de10c4f", "北京", "1998", "男"], ["c6832261d5e47019b2123025e8ebf52e", "北京", "1997", "男"], ["1163dfe5cf7dc5862e9f75e9c3a0f999", "北京", "1998", "男"], ["557d76c4245cb12fffb83a947002df70", "北京", "1976", "女"], ["a6658590851031ad1cf077d393fed42f", "北京", "1983", "男"], ["9567bb3af5c1886b1982ff1b018d0dae", "北京", "1986", "男"], ["f2868231c692491dfcdebe19a3209389", "北京", "1998", "男"], ["0dcef6184fff0ee77f9de22f22282fbf", "北京", "1976", "女"], ["fc59354c7e594672f0b058c7e6a319a5", "北京", "1979", "男"]
]
userVm = new Vue({
  el: ".usersInfo",
  data: {
    users: users
  },
  methods: {
    getTrans: function (userId) {
      //点击后在这个地方呈现
      drawUserRoute(userId)
      //console.log(userId)
      document.getElementById("user-table").style.display = "none";
      document.getElementsByClassName("flex-right")[0].style.display = "flex";

    }
  }

})
