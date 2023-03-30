import { logout } from '@/store/modules/login'
import { Modal } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classes from './UserInfo.module.scss'
const UserInfo = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    Modal.confirm({
      content: '确认退出吗？',
      title: '提示',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        dispatch(logout(''))
        nav('/login')
      },
    })
  }
  return (
    <>
      <div className={classes.suspansion}>
        <div className={classes.title}>个人管理</div>
        <div className={`${classes.image} clearfix`}>
          <img
            src={require('@/assets/home/account_info.png')}
            alt=""
            className="fl"
          />
          <img src={require('@/assets/home/vip.png')} alt="" className="fr" />
        </div>
        <ul className={classes.operation}>
          <li onClick={() => nav('/home/personal/my-collect')}>
            <img src={require('@/assets/home/icon_shoucang.png')} alt="" />
            <div>我的收藏</div>
          </li>
          <li onClick={() => nav('/home/personal/label-company')}>
            <img src={require('@/assets/home/icon_guanlian.png')} alt="" />
            <div>关联申请</div>
          </li>
          <li onClick={() => nav('/home/personal/change-password')}>
            <img src={require('@/assets/home/icon_mima.png')} alt="" />
            <div>修改密码</div>
          </li>
          <li onClick={handleLogout}>
            <img src={require('@/assets/home/icon_logout.png')} alt="" />
            <div>退出登录</div>
          </li>
        </ul>
        <div className={classes.division}>
          <img src={require('@/assets/home/icon_konw.png')} alt="" />
        </div>
        <div className={`${classes.message} clearfix`}>
          <div className={`${classes.left} fl`}>系统消息</div>
          <div className={`${classes.center} fl`}></div>
          <div className={`${classes.right} fr`}></div>
        </div>
        <ul className={classes.task}>
          <li>
            <div className={classes.time}>
              <i className={classes.yellow}></i>
              <i></i>
              <span></span>
            </div>
            <div className={classes.content}></div>
          </li>
        </ul>
        <div className={classes.no_message}>暂无其他消息~</div>
      </div>
    </>
  )
}

export default UserInfo
