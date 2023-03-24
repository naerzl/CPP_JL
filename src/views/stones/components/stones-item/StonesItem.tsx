import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import classes from './StonesItem.module.scss'
const StonesItem = (props: any) => {
  const nav = useNavigate()
  const location = useLocation()
  const { item } = props
  const handleClickStone = () => {
    nav(`/home/stones-detail/${item.id}`, {
      state: {
        id: props.item.stoneId,
        from: location.pathname,
        fromname: props.from,
      },
    })
  }
  return (
    <div className={classes.box}>
      <div className={classes.image} onClick={handleClickStone}>
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

export default React.memo(StonesItem)
