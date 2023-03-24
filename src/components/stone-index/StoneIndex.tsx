import React from 'react'
import classes from './StoneIndex.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
const StoneIndex = (props: any) => {
  const navigate = useNavigate()
  const location = useLocation()
  const handleClick = () => {
    navigate(`/home/stones-detail/${props.item.stoneId}`, {
      state: {
        id: props.item.stoneId,
        form: location.pathname,
        formname: props.form,
      },
    })
  }
  return (
    <div className={classes.box} onClick={handleClick}>
      <img src={'https://' + props.item.imageURL} alt="" />
      <div className={classes.desc}>
        <div>{props.item.stoneName}</div>
        {props.item.enterpriseName ? (
          <div className={classes.company}>
            <img src={require('@/assets/index/icon_qiye.png')} alt="" />
            <p>{props.item.enterpriseName}</p>
          </div>
        ) : (
          <div className={classes.company}></div>
        )}
      </div>
    </div>
  )
}

export default React.memo(StoneIndex)
