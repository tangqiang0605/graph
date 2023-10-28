import Card from '../card'
import style from './box.module.css'
import EasyChart from '../easychart'
import { useState } from 'react'

const getFullMonth = (month: number) => month < 10 ? '0' + month : month;

const month2days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const tags = ['支付金额', '店铺客户数', '平均停留时长', '支付买家数', '支付子订单数', '支付件数', '浏览量', '成功退款金额', '净支付金额']

const cardData = new Map([
  ['支付金额', {
    myscore: [2973096.73, 3315479.25, 3815632.52, 4215479.25, 4515488.36, 5115579.25, 2973096.73, 3315479.25, 3815632.52, 4215479.25, 4515488.36, 5115579.25],
    avgscore: [985892.45, 1023479.24, 1075684.69, 1085694.89, 1168457.56, 1250056.23, 985892.45, 1023479.24, 1075684.69, 1085694.89, 1168457.56, 1250056.23],
    superscore: [2565698.25, 3059847.59, 3598479.65, 3624786.05, 3556890.37, 3658951.26, 2565698.25, 3059847.59, 3598479.65, 3624786.05, 3556890.37, 3658951.26]
  }], ['店铺客户数', {
    myscore: [989, 1226, 1389, 1589, 1688, 1865, 989, 1226, 1389, 1589, 1688, 1865],
    avgscore: [426, 465, 496, 539, 668, 569, 426, 465, 496, 539, 668, 569],
    superscore: [806, 903, 899, 1189, 1268, 1286, 806, 903, 899, 1189, 1268, 1286]
  }], ['平均停留时长', {
    myscore: [64.39, 68.35, 67.59, 60.65, 65.35, 78.71, 64.39, 68.35, 67.59, 60.65, 65.35, 78.71],
    avgscore: [37.32, 35.89, 32.59, 33.96, 39.38, 35.36, 37.32, 35.89, 32.59, 33.96, 39.38, 35.36],
    superscore: [58.39, 60.36, 59.85, 50.39, 60.38, 65.35, 58.39, 60.36, 59.85, 50.39, 60.38, 65.35]
  }], ['支付买家数', {
    myscore: [816, 1002, 1095, 1255, 1339, 1482, 816, 1002, 1095, 1255, 1339, 1482],
    avgscore: [256, 298, 336, 412, 408, 436, 256, 298, 336, 412, 408, 436],
    superscore: [569, 750, 789, 963, 985, 1029, 569, 750, 789, 963, 985, 1029]
  }], ['支付子订单数', {
    myscore: [925, 1193, 1296, 1496, 1639, 2063, 925, 1193, 1296, 1496, 1639, 2063],
    avgscore: [298, 332, 369, 421, 485, 965, 298, 332, 369, 421, 485, 965],
    superscore: [716, 779, 846, 1065, 1148, 1496, 716, 779, 846, 1065, 1148, 1496]
  }], ['支付件数', {
    myscore: [998, 1268, 1378, 1568, 1756, 2156, 998, 1268, 1378, 1568, 1756, 2156],
    avgscore: [349, 390, 405, 509, 593, 1078, 349, 390, 405, 509, 593, 1078],
    superscore: [926, 882, 989, 1156, 1244, 1569, 926, 882, 989, 1156, 1244, 1569]
  }], ['浏览量', {
    myscore: [365679, 395672, 449488, 499891, 559299, 621793, 365679, 395672, 449488, 499891, 559299, 621793],
    avgscore: [109826, 129655, 136458, 157563, 168546, 186985, 109826, 129655, 136458, 157563, 168546, 186985],
    superscore: [254589, 289512, 318906, 356146, 384596, 423645, 254589, 289512, 318906, 356146, 384596, 423645]
    // }]
  }], ['成功退款金额', {
    myscore: [404258.47, 330215.89, 530307.87, 530215.89, 530261.81, 720315.89, 404258.47, 330215.89, 530307.87, 530215.89, 530261.81, 720315.89],
    avgscore: [214898.49, 182678.54, 275612.36, 261258.23, 264525.48, 362568.36, 214898.49, 182678.54, 275612.36, 261258.23, 264525.48, 362568.36],
    superscore: [499871.64, 431256.89, 648920.21, 612478.98, 598486.79, 895152.77, 499871.64, 431256.89, 648920.21, 612478.98, 598486.79, 895152.77]
  }], ['净支付金额', {
    myscore: [2568838.26, 2985263.36, 3285324.65, 3685263.36, 3985226.55, 4395263.36, 2568838.26, 2985263.36, 3285324.65, 3685263.36, 3985226.55, 4395263.36],
    avgscore: [768578.95, 894855.62, 987890.35, 1085489.56, 1264795.14, 1326429.12, 768578.95, 894855.62, 987890.35, 1085489.56, 1264795.14, 1326429.12],
    superscore: [1798229.36, 2065178.36, 2293678.23, 2528947.35, 3085642.36, 3151249.36, 1798229.36, 2065178.36, 2293678.23, 2528947.35, 3085642.36, 3151249.36]
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
        <div className={style.cardboxbutton}></div>
      </div>
      <div className={style.chartbox}>
        <EasyChart month={month} {...chartdata}></EasyChart>
      </div>
    </div>
  </>
}