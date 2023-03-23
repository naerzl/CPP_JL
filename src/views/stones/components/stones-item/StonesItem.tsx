import React from 'react'
import classes from './StonesItem.module.scss'
const StonesItem = (props: any) => {
  const { item } = props
  return (
    <div className={classes.box}>
      <div className={classes.image}>
        <img src={'https://' + item.terrazzoImage[0]} alt="" />
      </div>
      <h4>{item.name}</h4>
      <div className={classes.address}>
        {/* <img src={require('@/assets/stones/icon_qiye.png')} alt="" />
        <p>xxxx</p> */}
      </div>
    </div>
  )
}

export default StonesItem
