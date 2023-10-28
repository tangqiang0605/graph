import Card from '../card'
import style from './box.module.css'
import EasyChart from '../easychart'
import { useState } from 'react'

const getFullMonth = (month: number) => month < 10 ? '0' + month : month;

const month2days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const tags = ['支付金额', '店铺客户数', '平均停留时长', '支付买家数', '支付子订单数', '支付件数', '浏览量', '成功退款金额', '净支付金额']

const cardData = new Map([
  ['支付金额', {
    myscore: [0, 0, 0, 0, 0, 0, 2973096.73, 3315479.25, 3815632.52, 4215479.25, 4515488.36, 5115579.25],
    avgscore: [0, 0, 0, 0, 0, 0, 985892.45, 1023479.24, 1075684.69, 1085694.89, 1168457.56, 1250056.23],
    superscore: [0, 0, 0, 0, 0, 0, 2565698.25, 3059847.59, 3598479.65, 3624786.05, 3556890.37, 3658951.26]
  }], ['店铺客户数', {
    myscore: [0, 0, 0, 0, 0, 0, 2973096.73, 3315479.25, 3815632.52, 4215479.25, 4515488.36, 5115579.25],
    avgscore: [0, 0, 0, 0, 0, 0, 985892.45, 1023479.24, 1075684.69, 1085694.89, 1168457.56, 1250056.23],
    superscore: [0, 0, 0, 0, 0, 0, 2565698.25, 3059847.59, 3598479.65, 3624786.05, 3556890.37, 3658951.26]
  }], ['平均停留时长', {
    myscore: [0, 0, 0, 0, 0, 0, 2973096.73, 3315479.25, 3815632.52, 4215479.25, 4515488.36, 5115579.25],
    avgscore: [0, 0, 0, 0, 0, 0, 985892.45, 1023479.24, 1075684.69, 1085694.89, 1168457.56, 1250056.23],
    superscore: [0, 0, 0, 0, 0, 0, 2565698.25, 3059847.59, 3598479.65, 3624786.05, 3556890.37, 3658951.26]
  }], ['支付买家数', {
    myscore: [0, 0, 0, 0, 0, 0, 2973096.73, 3315479.25, 3815632.52, 4215479.25, 4515488.36, 5115579.25],
    avgscore: [0, 0, 0, 0, 0, 0, 985892.45, 1023479.24, 1075684.69, 1085694.89, 1168457.56, 1250056.23],
    superscore: [0, 0, 0, 0, 0, 0, 2565698.25, 3059847.59, 3598479.65, 3624786.05, 3556890.37, 3658951.26]
  }], ['支付子订单数', {
    myscore: [0, 0, 0, 0, 0, 0, 2973096.73, 3315479.25, 3815632.52, 4215479.25, 4515488.36, 5115579.25],
    avgscore: [0, 0, 0, 0, 0, 0, 985892.45, 1023479.24, 1075684.69, 1085694.89, 1168457.56, 1250056.23],
    superscore: [0, 0, 0, 0, 0, 0, 2565698.25, 3059847.59, 3598479.65, 3624786.05, 3556890.37, 3658951.26]
  }], ['支付件数', {
    myscore: [0, 0, 0, 0, 0, 0, 2973096.73, 3315479.25, 3815632.52, 4215479.25, 4515488.36, 5115579.25],
    avgscore: [0, 0, 0, 0, 0, 0, 985892.45, 1023479.24, 1075684.69, 1085694.89, 1168457.56, 1250056.23],
    superscore: [0, 0, 0, 0, 0, 0, 2565698.25, 3059847.59, 3598479.65, 3624786.05, 3556890.37, 3658951.26]
  }], ['浏览量', {
    myscore: [0, 0, 0, 0, 0, 0, 2973096.73, 3315479.25, 3815632.52, 4215479.25, 4515488.36, 5115579.25],
    avgscore: [0, 0, 0, 0, 0, 0, 985892.45, 1023479.24, 1075684.69, 1085694.89, 1168457.56, 1250056.23],
    superscore: [0, 0, 0, 0, 0, 0, 2565698.25, 3059847.59, 3598479.65, 3624786.05, 3556890.37, 3658951.26]
    // }]
  }], ['成功退款金额', {
    myscore: [0, 0, 0, 0, 0, 0, 2973096.73, 3315479.25, 3815632.52, 4215479.25, 4515488.36, 5115579.25],
    avgscore: [0, 0, 0, 0, 0, 0, 985892.45, 1023479.24, 1075684.69, 1085694.89, 1168457.56, 1250056.23],
    superscore: [0, 0, 0, 0, 0, 0, 2565698.25, 3059847.59, 3598479.65, 3624786.05, 3556890.37, 3658951.26]
  }], ['净支付金额', {
    myscore: [0, 0, 0, 0, 0, 0, 2973096.73, 3315479.25, 3815632.52, 4215479.25, 4515488.36, 5115579.25],
    avgscore: [0, 0, 0, 0, 0, 0, 985892.45, 1023479.24, 1075684.69, 1085694.89, 1168457.56, 1250056.23],
    superscore: [0, 0, 0, 0, 0, 0, 2565698.25, 3059847.59, 3598479.65, 3624786.05, 3556890.37, 3658951.26]
  }]
])

const genData = () => {
  // const avgscore = Number((1000000 + Math.random() * 3000000).toFixed(2))
  // const superscore = Number((avgscore + Math.random() * 2000000).toFixed(2))
  // const myscore = Number((superscore + Math.random() * 1000000).toFixed(2))

  const res = {
    myscore: [2973096.73, 3315479.25, 3815632.52, 4215479.25, 4515488.36, 5115579.25],
    avgscore: [985892.45, 1023479.24, 1075684.69, 1085694.89, 1168457.56, 1250056.23],
    superscore: [2565698.25, 3059847.59, 3598479.65, 3624786.05, 3556890.37, 3658951.26]
  }
  for (let i = 0; i < 6; i++) {
    const avgscore = Number((1000000 + Math.random() * 200000).toFixed(2))
    const superscore = Number((avgscore + Math.random() * 4000000).toFixed(2))
    const myscore = Number((superscore + 200000 + Math.random() * 2000000).toFixed(2))
    res.avgscore.unshift(avgscore)
    res.superscore.unshift(superscore)
    res.myscore.unshift(myscore)
  }
  return res;
}

export default function Box() {
  // const [tag, setTag] = useState('支付金额')
  const [month, setMonth] = useState(9);
  const [chartdata, setChartData] = useState(genData())

  const getNewData = (str: string) => {
    console.log(month)

    const result = { myscore: [...chartdata.myscore], avgscore: [...chartdata.avgscore], superscore: [...chartdata.superscore] }
    const avgscore = Number((1000000 + Math.random() * 200000).toFixed(2))
    const superscore = Number((avgscore + Math.random() * 4000000).toFixed(2))
    const myscore = Number((superscore + 200000 + Math.random() * 2000000).toFixed(2))
    if (str == 'push') {
      result.myscore.shift()
      result.avgscore.shift()
      result.superscore.shift()
      result.avgscore.push(avgscore)
      result.superscore.push(superscore)
      result.myscore.push(myscore)
    } else {
      result.myscore.pop()
      result.avgscore.pop()
      result.superscore.pop()

      result.avgscore.unshift(avgscore)
      result.superscore.unshift(superscore)
      result.myscore.unshift(myscore)
    }
    setChartData(result)
    console.log(chartdata)

  }
  // const getNewData = (str: string, month) => {
  //   // console.log(true)
  //   for (let key of tags) {
  //     console.log(month)
  //     if (month > 12 || month < 1) {
  //       console.log('不计算')
  //       return
  //     };
  //     console.log('计算')
  //     const result = {...Reflect.get(chartdata,key)
  //   }


  // result.push()
  // console.log(chartdata[key])
  // }
  // }
  return <>
    <div className={style.box}>
      <div className={style.boxtop}>
        <div className={style.boxtitle}>数据概览</div>

        <div className={style.toprightbox}>
          <div className={style.topdate}>
            统计时间 2023-{getFullMonth(month)}-01 ～ 2023-{getFullMonth(month)}-{month2days[month]}
          </div>

          <div className={style.selectorbox}>
            <div className={style.selectoritem}>日</div>
            <div className={style.selectoritem}>周</div>
            <div className={style.selectoritemactive}>月</div>
            <div className={style.arrowbox}>
              <div className={style.leftarrow} onClick={() => {
                // console.log(month)
                if (month > 1) {
                  setMonth(month - 1)
                  getNewData('unshift')

                }
              }
              }></div>
              {month < 9 ? <div className={style.rightarrow} onClick={() => {
                if (month < 12) {
                  setMonth(month + 1)
                  getNewData('push')
                }
                // month + 1 <= 12 ? setMonth(month + 1) : -1;
              }}></div> : <div className={style.rightarrowdisabled}></div>}

            </div>
          </div>

          <div className={style.selectorbox}>
            <div className={style.selectoritemactive}>图标</div>
            <div className={style.selectoritem}>表格</div>
          </div>

          <div className={style.topbutton}>
            <img src="/full.svg" alt="" />
            <div className={style.toprightboxtext}>退出全屏</div>
          </div>
        </div>
        {/* <Selector items={items}></Selector> */}
      </div>
      <div className={style.cardbox}>
        {tags.map((tag, index) => { return (<Card {...cardData.get(tag)} key={tag} title={tag} month={month} isActive={index == 0}></Card>) })}
      </div>
      <div className={style.chartbox}>
        <EasyChart month={month} {...chartdata}></EasyChart>
      </div>
    </div>
  </>
}