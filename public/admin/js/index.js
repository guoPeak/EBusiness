
//左边的表格
// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.querySelector('.echart-left'));

// 指定图表的配置项和数据
var option1 = {
    title: {
        text: '2018年注册人数'
    },
    tooltip: {},
    legend: {
        data: ['人数', '销量']
    },
    xAxis: {
        data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {},
    series: [{
        name: '人数',
        type: 'bar',
        data: [500, 1200, 760, 810, 1000, 1360]
    },
    {
        name: '销量',
        type: 'bar',
        data: [300, 1000, 670, 581, 910, 1036]
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart1.setOption(option1);


//右边的表格
var myChart2 = echarts.init(document.querySelector('.echart-right'));

var option2 = {
    title: {
        text: '热门品牌销售',
        subtext: '2018年6月',
        x: 'center'
    },
    color: ['red', 'blue', 'pink', 'yellow', 'orange', 'lime'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克', '阿迪', '李宁', '乔丹', '特步', '阿迪王']
    },
    series: [
        {
            name: '销量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                { value: 335, name: '耐克' },
                { value: 310, name: '阿迪' },
                { value: 234, name: '李宁' },
                { value: 135, name: '乔丹' },
                { value: 258, name: '特步' },
                { value: 1548, name: '阿迪王' }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

myChart2.setOption(option2);