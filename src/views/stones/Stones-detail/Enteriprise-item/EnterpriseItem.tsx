import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import classes from './EnterpriseItem.module.scss'
const EnterpriseItem = (props: any) => {
  const { item } = props
  const location = useLocation()
  const nav = useNavigate()
  const handleClickGoEnterprise = React.useCallback(() => {
    nav(`/home/enterprise-detail/${item.id}`, {
      state: {
        id: props.item.id,
        from: location.pathname,
        fromname: props.from,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={classes.main}>
      <div className={classes.enterpriseInfo}>
        <div className={classes.left}>
          <h3 className={classes.enterpriseName}>{item.name}</h3>
          <p className={`${classes.address} ellipsis`}>{item.address}</p>
        </div>
        <div className={classes.right}>
          <img
            src={require('@/assets/stones/look-info.png')}
            alt=""
            onClick={handleClickGoEnterprise}
          />
        </div>
      </div>
      <div className={classes.desc}>
        <p>
          <span>公司简介：</span>
          {item.profile}
        </p>
      </div>
      <div className={classes.importent}>
        <div className={classes.title}>主营业务</div>
        <ul>
          {item.imageInfoList.map((item: any, index: number) => (
            <li key={index}>
              <img src={'https://' + item.imageURL} alt="" />
              <div>{item.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default EnterpriseItem
