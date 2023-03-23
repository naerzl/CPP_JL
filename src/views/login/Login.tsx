import React from 'react'
import { Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import classes from './Login.module.scss'
import { useSelector } from 'react-redux'
const Login = (props: any) => {
  const user = useSelector((state: any) => state.user)
  return (
    <div className={classes.container}>
      {user.token && <Navigate to={'/'}></Navigate>}
      <LoginForm />
    </div>
  )
}

export default Login
