import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import classes from './Home.module.scss'

const Home = () => {
  return (
    <div className={classes.Home_container}>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  )
}

export default Home
