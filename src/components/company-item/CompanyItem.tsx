import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import classes from './CompanyItem.module.scss'
const CompanyItem = (props: any) => {
  const nav = useNavigate()
  const location = useLocation()
  const goLookDetail = () => {
    nav(`/home/enterprise-detail/${props.item.relationId || props.item.id}`, {
      state: {
        id: props.item.relationId || props.item.id,
        from: location.pathname,
        fromname: props.from,
      },
    })
  }
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
        <button className={classes.button} onClick={goLookDetail}>
          查看详情
        </button>
      </div>
    </div>
  )
}

export default React.memo(CompanyItem)
