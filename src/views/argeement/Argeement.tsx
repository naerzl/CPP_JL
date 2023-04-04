import React from 'react'
import classes from './Argeement.module.scss'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Breadcrumb } from 'antd'
const Argeement = () => {
  const location = useLocation()
  const navList = React.useRef([
    {
      name: '用户服务协议',
      isActive: false,
      path: '/home/argeement',
    },
    {
      name: '企业使用协议',
      isActive: false,
      path: '/home/argeement/company-argeement',
    },
    {
      name: '平台会员协议',
      isActive: false,
      path: '/home/argeement/vip-argeement',
    },
    {
      name: '用户隐私协议',
      isActive: false,
      path: '/home/argeement/privacy-argeement',
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

export default Argeement
