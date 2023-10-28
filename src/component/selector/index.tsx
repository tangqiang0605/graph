import style from './selector.module.css'

export default function Selector({ items }: any) {
  
  return <>
    <div>
      {items.map((item:any) => <div key={item.id} className={item.isActive?style.selectoritemactive:style.selectoritem}>{ item.text}</div>)}
      {/* <div></div> */}
  </div>
  </>
}