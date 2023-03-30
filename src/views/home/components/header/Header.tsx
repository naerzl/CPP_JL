import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Header.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { Select, Input, Button } from 'antd'
import { useSelector } from 'react-redux'
import UserInfo from './userinfo/UserInfo'
const { Search } = Input
const { Option } = Select
const navList = [
  {
    name: '首页',
    isActive: true,
    path: '/home/index',
  },
  {
    name: '骨料社区',
    isActive: false,
    path: '/home/stones',
  },
  {
    name: '企业社区',
    isActive: false,
    path: '/home/enterprise',
  },
  {
    name: 'TDS设计教程',
    isActive: false,
    path: '/home/TDScourse',
  },
  {
    name: '应用案例',
    isActive: false,
    path: '/home/applicationcase',
  },
]

const Header = () => {
  const loaction = useLocation()
  const navigate = useNavigate()
  const { token, userInfo } = useSelector((state: any) => state.user)
  navList.forEach((item) => (item.isActive = false))
  const obj = navList.find((item) => item.path === loaction.pathname)
  if (obj) {
    obj.isActive = true
  }
  const selectVal = React.useRef('2')
  const handleChangeSelect = (value: any) => {
    selectVal.current = value
  }
  const selectBefore = (
    <Select defaultValue="2" onChange={handleChangeSelect}>
      <Option value="2">骨料</Option>
      <Option value="1">企业</Option>
    </Select>
  )
  const onSearch = (value: string) => {
    navigate('/home/search', {
      state: { selectVal: selectVal.current, searchVal: value },
      replace: loaction.pathname === '/home/search',
    })
  }
  const goLogin = () => {
    if (token) return

    navigate('/login')
  }
  return (
    <header className={classes.container}>
      <div
        className="banxin clearfix"
        style={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          height: '40px',
        }}
      >
        <h1 className="logo fl" style={{ marginRight: '37px' }}>
          <NavLink to="/">
            <img src={require('@/assets/login/TDS_logo.png')} alt="" />
          </NavLink>
        </h1>
        <ul className={classes.headerNav}>
          {navList.map((item, index) => (
            <li
              key={item.path}
              className={`fl ${item.isActive && classes.active}`}
              style={{ margin: '0 15px' }}
            >
              <NavLink to={item.path}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
        <Search
          addonBefore={selectBefore}
          onSearch={onSearch}
          style={{
            width: '320px',
            height: '40px',
            alignItems: 'center',
            display: 'flex',
          }}
        />
        <div className={classes.right}>
          {(!token || (userInfo.type !== 98 && userInfo.type !== 99)) && (
            <Button
              className={classes.headerButton}
              style={{ margin: '0 10px 0 70px' }}
            >
              企业端
            </Button>
          )}
          <Button className={classes.headerButton}>立即设计</Button>
          <div className={classes.avatar} onClick={goLogin}>
            <img
              src={
                token
                  ? require('@/assets/home/avatar2.png')
                  : require('@/assets/home/avatar.png')
              }
              alt=""
            />
            <div style={{ lineHeight: '36px', height: '36px' }}>
              {token ? userInfo.accountName : '请登录'}
            </div>
          </div>
          <UserInfo></UserInfo>
        </div>
      </div>
    </header>
  )
}

export default Header
