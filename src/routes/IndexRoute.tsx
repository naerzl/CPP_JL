import React, { FC, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../views/login/Login'
import Home from '../views/home/Home'
// import Index from '@/views/index'
import Stones from '@/views/stones/Stones'
import Enterprise from '@/views/enterprise/Enterprise'
import TDScourse from '@/views/TDScourse/TDScourse'
import ApplicationCase from '@/views/applicationcase/ApplicationCase'
import HomeSearch from '@/views/search/HomeSearch'
import StonesDetail from '@/views/stones/Stones-detail/StonesDetail'
import EnterpriseDetail from '@/views/enterprise/enterpirse-detail/EnterpriseDetail'
import MoreProduct from '@/views/enterprise/more-product/MoreProduct'
import MoreStone from '@/views/enterprise/more-stone/MoreStone'
import Personal from '@/views/personal/Personal'
import PersonalInfo from '@/views/personal/components/personal-info/PersonalInfo'
import MyCollect from '@/views/personal/components/my-collect/MyCollect'
import LabelCompany from '@/views/personal/components/label-company/LabelCompany'
import ChangePassword from '@/views/personal/components/change-password/ChangePassword'

const Index = React.lazy(() => import('@/views/index'))
const isLazy = (Component: FC) => (
  <Suspense fallback={<div>加载中。。。</div>}>
    {<Component></Component>}
  </Suspense>
)
const navList = [
  {
    name: '首页',
    element: isLazy(Index),
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
    path: 'stones-detail/:id',
  },
  {
    element: <EnterpriseDetail></EnterpriseDetail>,
    path: 'enterprise-detail/:id',
  },
  {
    element: <MoreProduct></MoreProduct>,
    path: 'more-product',
  },
  {
    element: <MoreStone></MoreStone>,
    path: 'more-stone',
  },
  {
    element: <Personal></Personal>,
    path: 'personal',
    children: [
      {
        element: <PersonalInfo></PersonalInfo>,
        path: '',
      },
      {
        element: <MyCollect></MyCollect>,
        path: 'my-collect',
      },
      {
        element: <LabelCompany></LabelCompany>,
        path: 'label-company',
      },
      {
        element: <ChangePassword></ChangePassword>,
        path: 'change-password',
      },
    ],
  },
  {
    name: 'no fond',
    element: <Navigate to={'/home/index'}></Navigate>,
    path: '*',
  },
]
const IndexRoute = () => (
  <Routes>
    <Route path="/" element={<Navigate to={'/home/index'}></Navigate>}></Route>
    <Route path="/home" element={<Home></Home>}>
      {navList.map((item, index) => (
        <Route key={item.path} path={item.path} element={item.element}>
          {item.children &&
            item.children.map((el) => (
              <Route key={el.path} path={el.path} element={el.element}></Route>
            ))}
        </Route>
      ))}
    </Route>
    <Route path="/login" element={<Login></Login>}></Route>
  </Routes>
)

export default IndexRoute
