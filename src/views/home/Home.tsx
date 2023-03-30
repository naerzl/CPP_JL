import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import classes from './Home.module.scss'
import { reqGetDictionariesData } from '@/api/user'
import { useDispatch } from 'react-redux'
import { setStoneColor, setStoneVein } from '@/store/modules/dictionaries'
const Home = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const getDictionariesData = React.useCallback(async () => {
    const res = await reqGetDictionariesData(['stone_color', 'stone_vein'])
    if (res.data.code === 200) {
      dispatch(setStoneColor(res.data.data[0].detailList))
      dispatch(setStoneVein(res.data.data[1].detailList))
    }
  }, [dispatch])
  React.useEffect(() => {
    getDictionariesData()
  }, [getDictionariesData])
  if (location.pathname === '/home') {
    return <Navigate to="/home/index"></Navigate>
  }
  return (
    <div className={classes.Home_container}>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  )
}

export default Home
