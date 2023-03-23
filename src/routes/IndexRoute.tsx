import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../views/login/Login'
import Home from '../views/home/Home'
import Index from '@/views/index'
import Stones from '@/views/stones/Stones'
import Enterprise from '@/views/enterprise/Enterprise'
import TDScourse from '@/views/TDScourse/TDScourse'
import ApplicationCase from '@/views/applicationcase/ApplicationCase'
import HomeSearch from '@/views/search/HomeSearch'
import StonesDetail from '@/views/stones/Stones-detail/StonesDetail'
const navList = [
  {
    name: '首页',
    element: <Index></Index>,
    path: 'index',
  },
  {
    name: '骨料社区',
    element: <Stones></Stones>,
    path: 'stones',
  },
  {
    name: '企业社区',
    element: <Enterprise></Enterprise>,
    path: 'enterprise',
  },
  {
    name: 'TDS设计教程',
    element: <TDScourse></TDScourse>,
    path: 'TDScourse',
  },
  {
    name: '应用案例',
    element: <ApplicationCase></ApplicationCase>,
    path: 'applicationcase',
  },
  {
    element: <HomeSearch></HomeSearch>,
    path: 'search',
  },
  {
    element: <StonesDetail></StonesDetail>,
    path: 'stones-detail',
  },
  {
    name: 'no fond',
    element: <Navigate to={'/home'}></Navigate>,
    path: '*',
  },
]
const IndexRoute = () => (
  <Routes>
    <Route path="/" element={<Navigate to={'/home/index'}></Navigate>}></Route>
    <Route path="/home" element={<Home></Home>}>
      {navList.map((item, index) => (
        <Route key={item.path} path={item.path} element={item.element}></Route>
      ))}
    </Route>
    <Route path="/login" element={<Login></Login>}></Route>
  </Routes>
)

export default IndexRoute
