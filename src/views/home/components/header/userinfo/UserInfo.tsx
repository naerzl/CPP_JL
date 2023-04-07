import { logout } from '@/store/modules/login'
import { Button, message, Modal } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classes from './UserInfo.module.scss'
import dayjs from 'dayjs'
import { reqGetPersonalMessagePageList, reqPutReadAllMessage } from '@/api/user'
import ZheDie from './zhedie/ZheDie'
const UserInfo = React.forwardRef((props: any, ref: any) => {
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
        getData()
        // nav('/login')
      },
    })
  }
  const [messageData, setMessageData] = React.useState<any[]>([])
  const getData = React.useCallback(() => {
    reqGetPersonalMessagePageList({
      pageNumber: 1,
      pageSize: 2147483647,
      isRead: null, // 是否已读【1：已读；0：未读；null：查询所有】
    }).then((res) => {
      if (res.data.code === 200) {
        setMessageData(res.data.data.data)
      }
    })
  }, [])

  React.useEffect(() => {
    getData()
  }, [getData])

  const handleAllIsReady = async () => {
    const res = await reqPutReadAllMessage()
    if (res.data.code === 200) {
      message.success('操作成功')
      getData()
      props.onGetTatol()
    }
  }
  return (
    <>
      <div className={classes.suspansion} ref={ref}>
        <div className={classes.title}>个人管理</div>
        <div className={`${classes.image} clearfix`}>
          <img
            onClick={() => nav('/home/personal')}
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
          <div className={`${classes.right} fr`}>
            <Button type="default" onClick={handleAllIsReady}>
              全部已读
            </Button>
          </div>
        </div>
        {messageData.length > 0 ? (
          <ul className={classes.task}>
            {messageData.map((item: any) => (
              <li key={item.id}>
                <div className={classes.time}>
                  {item.isRead ? <i></i> : <i className={classes.yellow}></i>}
                  <span>
                    {dayjs(item.addDate).format('YYYY-MM-DD HH:mm:ss')}
                  </span>
                </div>
                <div className={classes.content}>
                  <ZheDie content={item.msgContent}></ZheDie>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={classes.no_message}>暂无其他消息~</div>
        )}
      </div>
    </>
  )
})

export default UserInfo
