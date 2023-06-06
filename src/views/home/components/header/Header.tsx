import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Header.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { Select, Input, Badge } from 'antd'
import { useSelector } from 'react-redux'
import UserInfo from './userinfo/UserInfo'
import { useClickAway } from 'ahooks'
import { reqGetPersonalNotreadcount } from '@/api/user'
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
  const [isShow, setIsShow] = React.useState(false)
  const goLogin = () => {
    if (token) {
      setIsShow((pre) => !pre)
      return
    }
    navigate('/login')
  }
  const useINfo_ref = React.useRef(null)
  const div_ref = React.useRef(null)
  useClickAway(() => {
    setIsShow(false)
  }, [useINfo_ref, div_ref])

  const [total, setTotal] = React.useState(0)
  const getData = React.useCallback(() => {
    if (!token) return setTotal(0)
    reqGetPersonalNotreadcount().then((res) => {
      if (res.data.code === 200) {
        setTotal(Number(res.data.data))
      }
    })
  }, [token])

  React.useEffect(() => {
    getData()
  }, [getData])
  return (
    <header className={classes.container}>
      <div
        className="banxin clearfix"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '40px',
        }}
      >
        <div className={classes.left}>
          <h1 className="logo fl" style={{ marginRight: '37px' }}>
            <NavLink to="/home/index">
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
        </div>
        <div className={classes.right}>
          <div ref={div_ref} className={classes.avatar} onClick={goLogin}>
            <Badge
              count={total}
              overflowCount={99}
              style={{ top: '5px', right: '7px', insetInlineEnd: 'none' }}
            >
              <img
                src={
                  token
                    ? require('@/assets/home/avatar2.png')
                    : require('@/assets/home/avatar.png')
                }
                alt=""
              />
            </Badge>
            <div
              style={{ lineHeight: '36px', height: '36px', marginLeft: '10px' }}
            >
              {token ? userInfo.accountName : '请登录'}
            </div>
          </div>
          {isShow && (
            <UserInfo ref={useINfo_ref} onGetTatol={getData}></UserInfo>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
