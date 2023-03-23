import React from 'react'
import classes from './CompanyItem.module.scss'
const CompanyItem = (props: any) => {
  return (
    <div className={classes.box}>
      <img src={'https://' + props.item.file} alt="" />
      <div className={classes.companyName}>{props.item.entpriseName}</div>
      <div className={classes.companyAddress}>
        <img src={require('@/assets/index/icon_dizhi.png')} alt="" />
        <div className={classes.desc}>{props.item.address}</div>
      </div>

      <div className={classes.mask}>
        <h3 className={classes.companyName}>{props.item.entpriseName}</h3>
        <div className={classes.companyAddress}>
          <img src={require('@/assets/index/icon_dizhi2.png')} alt="" />
          <div className={classes.desc}>{props.item.address}</div>
        </div>
        <p className={classes.text}>{props.item.profile}</p>
        <button className={classes.button}>查看详情</button>
      </div>
    </div>
  )
}

export default React.memo(CompanyItem)
