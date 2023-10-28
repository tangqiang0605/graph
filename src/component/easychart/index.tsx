import { useRef, useEffect } from 'react'

import * as echarts from 'echarts';
const getFullMonth = (month: number) => month < 10 ? '0' + month : month;
// 生成x轴数据
function currentMonth(year: number, month: number) {
  const result = []
  for (let i = 0; i < 12; i++) {
    if (month - i < 1) {
      result.push(`${year - 1}-${getFullMonth(month + 12 - i)}`)
    } else {
      result.push(`${year}-${getFullMonth(month - i)}`)
    }
  }
  return result.reverse();
}

export default function EasyChart({ myscore, superscore, avgscore, month }: any) {
  const cDom = useRef(null)
  const myChart = useRef(null)
  const xAxisData = currentMonth(2023, month)
  const legendData = ['本店', '同行同层优秀', '同行同层平均']
  const options = {
    toolbar: { trigger: 'axis', },
    backgroundColor: 'white',
    color: ['#5A86FF', '#5CCFFE', '#FE8C45'],
    legend: {
      icon: "rect",
      orient: "horizontal",
      left: "left",
      itemStyle: {
        borderCap: 'round'
      },
      borderRadius: 4,
      // itemGap:"26px",
      itemWidth: 4,
      itemHeight: 9,
      textStyle: {
        color: 'black',
        fontSize: '10px'
      },
      data: legendData
    },
    grid: {
      left: '0%',
      right: '3%',
      bottom: 0,
      top: 50,
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        boundaryGap: false,
        axisTick: {
          show: true, // 不显示坐标轴刻度线
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            type: 'dashed',
            dashOffset: 4
          },
          show: true,
        },
        axisLabel: {
          align: 'center',
          color: '#ADB4C1',
          fontSize: 12,
        },
      },
    ],
    // AnimationTimeline
    yAxis: [
      {
        boundaryGap: ['0%', '0%'],
        // z: 100,
        // offset: -10,
        // zlayer: 2,
        axisLine: {
          // onZero: true,
        },
        // alignTicks:
        splitNumber: 4,
        type: 'value',
        minInterval: 1500000,
        //y右侧文字
        left: '20px',
        axisLabel: {
          inside: false,
          verticalAlign: 'bottom',
          margin: -1,
          align: 'left',
          color: '#ADB4C1',
          fontSize: 12,
          formatter: function (value: number) {
            return value ? (value / 10000).toFixed(2) + '万' : 0;
          },
        },
        nameTextStyle: {
          align: 'left'
        }
      },
    ],
    series: [
      {
        name: '本店',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          width: 2,
          color: '#4891ff'
        },
        areaStyle: {
          opacity: .1,
          //右下左上
          color: {
            type: 'linear',
            x: 0,  //右
            y: 0,  //下
            x2: 0,  //左
            y2: 1,  //上
            colorStops: [
              {
                offset: 0.1,
                color: '#5A81FF' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#fff' // 100% 处的颜色
              }
            ]
          },
        },
        data: myscore,
      },

      {
        name: '同行同层平均',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          width: 2,
          color: '#5ccffe'
        },
        areaStyle: {
          opacity: 0.1,
          //右下左上
          color: {
            type: 'linear',
            x: 0,  //右
            y: 0,  //下
            x2: 0,  //左
            y2: 1,  //上
            colorStops: [
              {
                offset: 0.1,
                color: '#ECF0F1' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#fff' // 100% 处的颜色
              }
            ]
          },
        },
        data: avgscore,
      }, {
        name: '同行同层优秀',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          width: 2,
          color: '#fe8c45'
        },
        areaStyle: {
          opacity: 0.4,
          //右下左上
          color: {
            type: 'linear',
            x: 0,  //右
            y: 0,  //下
            x2: 0,  //左
            y2: 1,  //上
            colorStops: [
              {
                offset: 0.1,
                color: '#FFECE2' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#fff' // 100% 处的颜色
              }
            ]

          },
        },
        data: superscore,
      },
    ],
  };
  useEffect(() => {
    if (cDom.current) {
      // 校验 Dom 节点上是否已经挂载了 ECharts 实例，只有未挂载时才初始化
      myChart.current = echarts.getInstanceByDom(cDom.current) as any;
      if (!myChart.current) {
        myChart.current = echarts.init(cDom.current, null, {
          renderer: 'svg',
        }) as any;
      }

      options && (myChart.current as any).setOption(options);
    }

    return () => {
      (myChart.current as any).dispose(); // 容器被销毁之后，销毁实例，避免内存泄漏
    };
  }, [cDom, options]);
  return <>
    <div ref={cDom} style={{ height: '100%', width: '100%' }}></div>
  </>
}