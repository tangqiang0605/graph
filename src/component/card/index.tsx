import style from './card.module.css'
export default function Card({ isActive, title, myscore, superscore, avgscore, month }: any) {

  return <>
    <div className={isActive ? style.cardactive : style.cardnormal}>
      <div className={style.titlebox}>
        <div className={style.title}>{title}</div>
        <div className={style.titlelogo}></div>
      </div>
      <div className={style.myscore}>{myscore[month].toLocaleString()}</div>
      <div className={style.bottombox}>
        <div className={style.bottomtextbox}>
          <div className={style.bottomboxtext1}>同行同层平均</div>
          <div className={style.bottomboxtext}>{avgscore[month].toLocaleString()}</div>
        </div>
        {/* <div className={}></div> */}
        {/* 使用bottombox的伪类做分割线 */}
        <div className={style.bottomtextbox}>
          <div className={style.bottomboxtext1}>同行同层优秀</div>
          <div className={style.bottomboxtext}>{superscore[month].toLocaleString()}</div>
        </div>
      </div>


    </div>
  </>
}