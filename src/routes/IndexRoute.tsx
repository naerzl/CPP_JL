import React, { FC, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../views/login/Login'
import Home from '../views/home/Home'
// import Index from '@/views/index'
// import Stones from '@/views/stones/Stones'
// import Enterprise from '@/views/enterprise/Enterprise'
// import TDScourse from '@/views/TDScourse/TDScourse'
// import ApplicationCase from '@/views/applicationcase/ApplicationCase'
// import HomeSearch from '@/views/search/HomeSearch'
// import StonesDetail from '@/views/stones/Stones-detail/StonesDetail'
// import EnterpriseDetail from '@/views/enterprise/enterpirse-detail/EnterpriseDetail'
// import MoreProduct from '@/views/enterprise/more-product/MoreProduct'
// import MoreStone from '@/views/enterprise/more-stone/MoreStone'
// import Personal from '@/views/personal/Personal'
// import PersonalInfo from '@/views/personal/components/personal-info/PersonalInfo'
// import MyCollect from '@/views/personal/components/my-collect/MyCollect'
// import LabelCompany from '@/views/personal/components/label-company/LabelCompany'
// import ChangePassword from '@/views/personal/components/change-password/ChangePassword'
import Demo from '@/views/demo/Demo'
// import ServeArgeement from '@/views/argeement/components/serve-argeement/ServeArgeement'
// import CompanyArgeement from '@/views/argeement/components/company-argeement/CompanyArgeement'
// import VipArgeement from '@/views/argeement/components/vip-argeement/VipArgeement'
// import PrivacyArgeement from '@/views/argeement/components/privacy-argeement/PrivacyArgeement'
// import Argeement from '@/views/argeement/Argeement'
// import SettleIn from '@/views/enterprise/settlein/SettleIn'

const Index = React.lazy(() => import('@/views/index'))
const Stones = React.lazy(() => import('@/views/stones/Stones'))
const Enterprise = React.lazy(() => import('@/views/enterprise/Enterprise'))
const TDScourse = React.lazy(() => import('@/views/TDScourse/TDScourse'))
const ApplicationCase = React.lazy(
  () => import('@/views/applicationcase/ApplicationCase')
)
const HomeSearch = React.lazy(() => import('@/views/search/HomeSearch'))
const StonesDetail = React.lazy(
  () => import('@/views/stones/Stones-detail/StonesDetail')
)
const EnterpriseDetail = React.lazy(
  () => import('@/views/enterprise/enterpirse-detail/EnterpriseDetail')
)
const MoreProduct = React.lazy(
  () => import('@/views/enterprise/more-product/MoreProduct')
)
const MoreStone = React.lazy(
  () => import('@/views/enterprise/more-stone/MoreStone')
)
const Personal = React.lazy(() => import('@/views/personal/Personal'))
const PersonalInfo = React.lazy(
  () => import('@/views/personal/components/personal-info/PersonalInfo')
)
const MyCollect = React.lazy(
  () => import('@/views/personal/components/my-collect/MyCollect')
)
const LabelCompany = React.lazy(
  () => import('@/views/personal/components/label-company/LabelCompany')
)
const ChangePassword = React.lazy(
  () => import('@/views/personal/components/change-password/ChangePassword')
)
const ServeArgeement = React.lazy(
  () => import('@/views/argeement/components/serve-argeement/ServeArgeement')
)
const CompanyArgeement = React.lazy(
  () =>
    import('@/views/argeement/components/company-argeement/CompanyArgeement')
)
const VipArgeement = React.lazy(
  () => import('@/views/argeement/components/vip-argeement/VipArgeement')
)
const PrivacyArgeement = React.lazy(
  () =>
    import('@/views/argeement/components/privacy-argeement/PrivacyArgeement')
)
const Argeement = React.lazy(() => import('@/views/argeement/Argeement'))
const SettleIn = React.lazy(
  () => import('@/views/enterprise/settlein/SettleIn')
)
const isLazy = (Component: FC) => (
  <Suspense fallback={<div>加载中。。。</div>}>
    {<Component></Component>}
  </Suspense>
)
const navList = [
  {
    element: <Demo></Demo>,
    path: 'demo',
  },
  {
    name: '首页',
    element: isLazy(Index),
    path: 'index',
  },
  {
    name: '骨料社区',
    element: isLazy(Stones),
    path: 'stones',
  },
  {
    name: '企业社区',
    element: isLazy(Enterprise),
    path: 'enterprise',
  },
  {
    name: 'TDS设计教程',
    element: isLazy(TDScourse),
    path: 'TDScourse',
  },
  {
    name: '应用案例',
    element: isLazy(ApplicationCase),
    path: 'applicationcase',
  },
  {
    element: isLazy(HomeSearch),
    path: 'search',
  },
  {
    element: isLazy(StonesDetail),
    path: 'stones-detail/:id',
  },
  {
    element: isLazy(EnterpriseDetail),
    path: 'enterprise-detail/:id',
  },
  {
    element: isLazy(MoreProduct),
    path: 'more-product',
  },
  {
    element: isLazy(MoreStone),
    path: 'more-stone',
  },
  {
    element: isLazy(SettleIn),
    path: 'settle-in',
  },
  {
    element: isLazy(Personal),
    path: 'personal',
    children: [
      {
        element: isLazy(PersonalInfo),
        path: '',
      },
      {
        element: isLazy(MyCollect),
        path: 'my-collect',
      },
      {
        element: isLazy(LabelCompany),
        path: 'label-company',
      },
      {
        element: isLazy(ChangePassword),
        path: 'change-password',
      },
    ],
  },
  {
    element: isLazy(Argeement),
    path: 'argeement',
    children: [
      {
        element: isLazy(ServeArgeement),
        path: '',
      },
      {
        element: isLazy(CompanyArgeement),
        path: 'company-argeement',
      },
      {
        element: isLazy(VipArgeement),
        path: 'vip-argeement',
      },
      {
        element: isLazy(PrivacyArgeement),
        path: 'privacy-argeement',
      },
    ],
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
    <Route path="*" element={<Navigate to={'/home/index'}></Navigate>}></Route>
  </Routes>
)

export default IndexRoute
