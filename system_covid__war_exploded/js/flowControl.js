
//数据：数据处理后给到的天数
let days = ["2019-12-25", "2019-12-26", "2019-12-27", "2019-12-28", "2019-12-29", "2019-12-30", "2019-12-31",
  "2020-01-01", "2020-01-02", "2020-01-03", "2020-01-04", "2020-01-05", "2020-01-06", "2020-01-07", "2020-01-08",
  "2020-01-09", "2020-01-10", "2020-01-11", "2020-01-12", "2020-01-13", "2020-01-14", "2020-01-15", "2020-01-16",
  "2020-01-17", "2020-01-18", "2020-01-19", "2020-01-20", "2020-01-21", "2020-01-22", "2020-01-23", "2020-01-24",
  "2020-01-25", "2020-01-26", "2020-01-27", "2020-01-28", "2020-01-29", "2020-01-30", "2020-01-31", "2020-02-01",
  "2020-02-02", "2020-02-03", "2020-02-04", "2020-02-05", "2020-02-06", "2020-02-07", "2020-02-08", "2020-02-09",
  "2020-02-10", "2020-02-11", "2020-02-12", "2020-02-13", "2020-02-14", "2020-02-15", "2020-02-16", "2020-02-17",
  "2020-02-18", "2020-02-19", "2020-02-20", "2020-02-21", "2020-02-22", "2020-02-23", "2020-02-24", "2020-02-25",
  "2020-02-26", "2020-02-27", "2020-02-28", "2020-02-29", "2020-03-01", "2020-03-02", "2020-03-03", "2020-03-04",
  "2020-03-05", "2020-03-06", "2020-03-07", "2020-03-08", "2020-03-09", "2020-03-10", "2020-03-11", "2020-03-12",
  "2020-03-13", "2020-03-14", "2020-03-15", "2020-03-16", "2020-03-17", "2020-03-18", "2020-03-19", "2020-03-20",
  "2020-03-21", "2020-03-22", "2020-03-23", "2020-03-24", "2020-03-25", "2020-03-26", "2020-03-27", "2020-03-28",
  "2020-03-29", "2020-03-30", "2020-03-31", "2020-04-01", "2020-04-02", "2020-04-03", "2020-04-04", "2020-04-05",
  "2020-04-06", "2020-04-07", "2020-04-08", "2020-04-09", "2020-04-10", "2020-04-11", "2020-04-12", "2020-04-13",
  "2020-04-14", "2020-04-15", "2020-04-16", "2020-04-17", "2020-04-18", "2020-04-19", "2020-04-20", "2020-04-21",
  "2020-04-22", "2020-04-23", "2020-04-24", "2020-04-25", "2020-04-26", "2020-04-27", "2020-04-28", "2020-04-29",
  "2020-04-30", "2020-05-01", "2020-05-02", "2020-05-03", "2020-05-04", "2020-05-05", "2020-05-06", "2020-05-07",
  "2020-05-08", "2020-05-09", "2020-05-10", "2020-05-11", "2020-05-12", "2020-05-13", "2020-05-14", "2020-05-15",
  "2020-05-16", "2020-05-17", "2020-05-18", "2020-05-19", "2020-05-20", "2020-05-21", "2020-05-22", "2020-05-23",
  "2020-05-24", "2020-05-25", "2020-05-26", "2020-05-27", "2020-05-28", "2020-05-29", "2020-05-30", "2020-05-31",
  "2020-06-01", "2020-06-02", "2020-06-03", "2020-06-04", "2020-06-05", "2020-06-06", "2020-06-07", "2020-06-08",
  "2020-06-09", "2020-06-10", "2020-06-11", "2020-06-12", "2020-06-13", "2020-06-14", "2020-06-15", "2020-06-16",
  "2020-06-17", "2020-06-18", "2020-06-19", "2020-06-20", "2020-06-21", "2020-06-22", "2020-06-23", "2020-06-24",
  "2020-06-25", "2020-06-26", "2020-06-27", "2020-06-28", "2020-06-29", "2020-06-30", "2020-07-01", "2020-07-02",
  "2020-07-03", "2020-07-04", "2020-07-05", "2020-07-06", "2020-07-07", "2020-07-08", "2020-07-09", "2020-07-10",
  "2020-07-11", "2020-07-12", "2020-07-13", "2020-07-14", "2020-07-15", "2020-07-16"
]


/*
函数功能：绘制从2019-12-25 到2020-7-16每天的数据
参数：无
*/
function drawTotalFlow() {
  //生成echarts实例
  let lineChart = echarts.init(document.getElementById("line-box"));
  //ajax异步获取数据
  $.when(
      $.get('../data/day_num.json'),
      $.get('../data/most_five/day_most_five.json')
    )
    .done(function (data, data_most) {
      data = data[0]
      total_most = data_most[0][0]
      day_most = data_most[0]
      day_nums = [] //获取每一天的客流量数据
      five_most = [] //获取所有的数据的前五名
      console.log(typeof data_most)
      for (let key in data) {
        day_nums.push(data[key])
      }
      for (let key in total_most) {
        let pie_item = {}
        pie_item['value'] = total_most[key]
        pie_item['name'] = key
        pie_item['visualMap'] = false
        five_most.push(pie_item)
      }
      lineChart.hideLoading();
      let option = {
        title: {
          text: days[0] + ' - ' + days[days.length - 1] + ' 客流量',
          left: '6%'
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: Object.keys(data)
        },
        yAxis: {},
        dataZoom: {

        },
        grid: {
          right: '10%',
          top: '50%'
        },
        visualMap: [{
          orient: 'vertical',
          right: '5%',
          top: '15%',
          min: 50,
          max: 8000,
          text: ['High Nums', 'Low Nums'],
          dimension: 1,
          inRange: {
            color: ['#65B581', '#FFCE34', '#FD665F']
          }
        }],
        color: ['#88bb70', '#fd7f55', '#fece35', '#ffbc3c', '#FD665F'],
        series: [{
            name: '进站',
            type: 'bar',
            data: day_nums
          },
          {
            name: '站点比例',
            id: 'pie',
            type: 'pie',
            data: five_most.sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: 'radius',
            radius: [0, '35%'],
            center: ['50%', '25%'],

            itemStyle: {

              borderRadius: 8,
              shadowBlur: 15,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
          }
        ],
        markLine: {
          silent: true,
          lineStyle: {
            color: '#333'
          },

        }
      }

      //鼠标移动事件
      lineChart.on('click', function (e) {
        if (e.seriesType == 'bar') {
          //console.log(e)
          five_most = []
          //console.log(day_most[1])
          for (let i = 1; i < day_most.length; i++) {
            let key = e.name
            if (key == Object.keys(day_most[i])) {

              for (let sta in day_most[i][key]) {
                let pie_item = {}
                pie_item['value'] = day_most[i][key][sta]
                pie_item['name'] = sta
                pie_item['visualMap'] = false
                five_most.push(pie_item)
              }
            }

          }
          console.log(five_most)
          lineChart.setOption({

            series: {
              id: 'pie',
              color: ['#88bb70', '#fd7f55', '#fece35', '#ffbc3c', '#FD665F'],
              data: five_most.sort(function (a, b) {
                return a.value - b.value;
              }),
            }
          })
        }
      });
      lineChart.setOption(option);
    })
}

function drawXiantu(){
  $.getJSON('../data/xiantu.json', function (graph) {
    graph.nodes.forEach(function (node) {
        node.label = {
            show: node.symbolSize > 5
        };
    });
    //生成echarts实例
    let myChart = echarts.init(document.getElementById("xiantu"));
    var resize = {
      width: 600,
      height: 680
    };
    myChart.resize(resize);
    option = {
        title: {
          text: '2019-12 - 2020-7 各线路客流量',
          left: 'left',
          top:'10%'
        },
        tooltip: {},
        legend: [{
            data: graph.categories.map(function (a) {
                return a.name;
            })
        }],
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                name: '站点',
                type: 'graph',
                layout: 'circular',
                circular: {
                    rotateLabel: true
                },
                data: graph.nodes,
                links: graph.links,
                categories: graph.categories,
                roam: true,
                label: {
                    position: 'right',
                    formatter: '{b}'
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.3
                }
            }
        ]
    };

    myChart.setOption(option);
});
}
/*
函数功能：绘制某一天每半个小时的流量数据
参数：按照%YY%-%mm%-%dd%的格式传入某一天的参数
*/
function drawDayChart(day) {
  //生成echarts实例
  let dayChart = echarts.init(document.getElementById("day-line"));

  //ajax异步获取数据
  $.when(
    //同时获取两个数据, 返回数据是一个集成的对象
    $.get('../data/in/' + day + '.json'),
    $.get('../data/out/' + day + '.json')
  ).done(function (dataIn, dataOut) {
    in_nums = []; //获取每一天的客流量数据
            console.log(dataIn)
    console.log(dataOut)
    dataIn = dataIn[0]
    dataOut = dataOut[0]
    console.log(dataIn)
    console.log(dataOut)
    for (let key in dataIn) {
      in_nums.push(dataIn[key])
    }
    out_nums = []; //获取每一天的客流量数据
    for (let key in dataOut) {
      out_nums.push(-dataOut[key])
    }
    console.log(in_nums)
    console.log(out_nums)
    dayChart.hideLoading();
    let option = {
      title: {
        text: day + ' 客流量',
        left: '10%'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: Object.keys(dataIn)
      },
      yAxis: {},
      dataZoom: {

      },
      grid: {
        left: '15%',
        bottom: '22%',
      },
      series: [{
        name: '进站',
        type: 'line',
        smooth: true,
        symbol: "diamonds",
        data: in_nums
      }, {
        name: '出站',
        type: 'line',
        smooth: true,
        symbol: "diamonds",
        data: out_nums
      }]
    }
    dayChart.setOption(option);
  })

}

  /*
    函数功能：绘制某一天各个站点的断面数据
    参数：按照%YY%-%mm%-%dd%的格式传入某一天的参数
    */
    function drawSectionChart(day) {
      //生成echarts实例
      let dayChart = echarts.init(document.getElementById("day-sta"));

      //ajax异步获取数据
      $.when(
        //同时获取两个数据, 返回数据是一个集成的对象
        $.get('../data/section_data/in_days_Sta.json'),
        $.get('../data/section_data/out_days_Sta.json')
      ).done(function (dataIn, dataOut) {
        in_nums = []; //获取每一天的数据
        out_nums = []; //获取每一天的数据
        sta = [];
        dataIn = dataIn[0]
        dataOut = dataOut[0]
        for (i = 1; i < 169; i++) {
          sta.push("Sta"+i+"");
        }
        for (let v in dataIn) {
          let element = dataIn[v]
          if(Object.keys(element) == day){
              dataIn = element;
              console.log(dataIn)
              break;
          }
        }
        for (let v in dataOut) {
          let element = dataOut[v]
          if(Object.keys(element) == day){
            dataOut = element;
              console.log(dataOut)
              break;
          }
        }
        
        dataIn = dataIn[day]
        dataOut = dataOut[day]
        for (let key in dataIn) {
          in_nums.push(dataIn[key])
        }
        
        for (let key in dataOut) {
          out_nums.push(-dataOut[key])
        }

        dayChart.hideLoading();
        let option = {
          title: {
            text: day + ' 各站断面客流量',
            left: '10%'
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: sta
            // data: Object.keys(dataIn)
          },
          yAxis: {},
          dataZoom: {

          },
          grid: {
            left: '15%',
            bottom: '22%',
          },
          series: [{
            name: '进站',
            type: 'bar',
            stack: 'two',
            smooth: true,
            symbol: "diamonds",
            data: in_nums
          }, {
            name: '出站',
            type: 'bar',
            stack: 'two',
            smooth: true,
            symbol: "diamonds",
            data: out_nums
          }]
        }
        dayChart.setOption(option);
      })

    }

/*
函数功能：根据下拉框框选不同的图表
参数：无
*/

function selectDayGraph() {
  //初始化图表
  drawDayChart(days[0])
  drawSectionChart(days[0])
  let vm = new Vue({
    el: "#date-list",
    data: {
      days: days,
    },
    methods: {
      changeGraph: function (e) {
        console.log(e.target.innerText)
        day = e.target.innerText
        /*
        day = e.target.value
        console.log(e.target.value)
        */
        drawDayChart(day)
        drawSectionChart(day)
      }
    }
  });
}

    /*
    函数功能：绘制各条线路的客流数据变化
    
    */
function drawStaChart() {
  //生成echarts实例
  let dayChart = echarts.init(document.getElementById("sta-box"));

  //ajax异步获取数据
  $.when(
    //同时获取两个数据, 返回数据是一个集成的对象
    $.get('../data/line/total.json')
  ).done(function (dataIn) {
    dayChart.hideLoading();
    let option = {
        dataset: {
            source: [
                ['Line', '2019-12', '2020-01', '2020-02', '2020-04', '2020-05', '2020-06', '2020-07'],
                ['line1', 2015, 40598, 1205, 42174, 60670, 67203, 32885*2.2],
                ['line2', 1249, 31209, 1298, 32869, 47736, 52398, 28243*2.2],
                ['line3', 1355, 41377, 2672, 69216, 90429, 99013, 47971*2.2],
                ['line4', 88, 1264, 195, 2617, 3145, 3709, 2072*2.2],
                ['line5', 138, 3274, 187, 9130, 11288, 12202, 6834*2.2],
                ['line10', 616, 2792, 9777, 21763, 34047, 38630, 20946*2.2],
                ['line11', 1362, 2714, 28285, 63167, 81843, 90468, 45669*2.2],
                ['line12', 1037, 1495, 12179, 28180, 39076, 43817, 22790*2.2]
            ]
        },
        title: {
            text: '2019-12 - 2020-7 各线路客流量'
        },
        tooltip: {
            trigger: 'axis'
        },

        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
        
        },
        yAxis: {
            type: 'value'
        },
        emphasis: {
            focus: 'series'
        },
        endLabel: {
            show: true,
            
        },
        dataZoom: {

        },
        grid: {
            left: '15%',
            bottom: '22%',
        },
        animationDuration: 10000,
        series: [
            
            {
                smooth: true,
                type: 'line',
                seriesLayoutBy: 'row'
            },
            {
                smooth: true,
                type: 'line',
                seriesLayoutBy: 'row'
            },
            {
            smooth: true,
                type: 'line',
            seriesLayoutBy: 'row'
            },
            {
                smooth: true,
                type: 'line',
                seriesLayoutBy: 'row'
            },
            {
                smooth: true,
                type: 'line',
                seriesLayoutBy: 'row'
            },
            {
                smooth: true,
                type: 'line',
                seriesLayoutBy: 'row'
            },
            {
                smooth: true,
                type: 'line',
                seriesLayoutBy: 'row'
            }
        ]
    }
    dayChart.setOption(option);
  })
    
    
    
}




//调用绘制图像的函数
drawStaChart();
drawTotalFlow()

selectDayGraph()
drawXiantu();