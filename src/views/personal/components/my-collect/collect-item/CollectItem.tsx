import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import classes from './CollectItem.module.scss'
const CollectItem = (props: any) => {
  const { item, from } = props
  const navigate = useNavigate()
  const location = useLocation()
  const handleClick = () => {
    navigate(`/home/stones-detail/${props.item.id}`, {
      state: {
        id: item.id,
        from: location.pathname,
        fromname: from,
      },
    })
  }
  return (
    <div className={classes.container}>
      <div className={classes.image_box} onClick={handleClick}>
        <img src={'https://' + item.thumbnailImage[0]} alt="" />
      </div>
      <p>{item.name}</p>
    </div>
  )
}

export default React.memo(CollectItem)
