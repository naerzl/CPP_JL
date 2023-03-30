import { Breadcrumb } from 'antd'
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import classes from './Personal.module.scss'
const Personal = () => {
  const location = useLocation()
  const navList = React.useRef([
    {
      name: '个人信息维护',
      isActive: false,
      path: '/home/personal',
    },
    {
      name: '修改密码',
      isActive: false,
      path: '/home/personal/change-password',
    },
    {
      name: '我的收藏',
      isActive: false,
      path: '/home/personal/my-collect',
    },
    {
      name: '关联企业',
      isActive: false,
      path: '/home/personal/label-company',
    },
  ])
  return (
    <div className={classes.main}>
      <div className="banxin">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: '首页',
              href: '/home/index',
            },
            {
              title: navList.current.find(
                (item) => item.path === location.pathname
              )?.name,
            },
          ]}
        />
        <div className={classes.content}>
          <aside className={classes.aside}>
            <ul>
              {navList.current.map((item) => (
                <li
                  key={item.path}
                  className={
                    location.pathname === item.path ? classes.active : ''
                  }
                >
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </aside>
          <div className={classes.outlet}>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Personal
