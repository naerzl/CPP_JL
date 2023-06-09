import React, { ChangeEvent, useCallback } from 'react'
import { Form, Input, Button, message } from 'antd'
import { reqLogin, reqGetAccountInfo } from '@/api/user'
import { useSelector, useDispatch } from 'react-redux'
import { getOAuthToken } from '@/utils/AES'
import { setToken, setUserInfor } from '@/store/modules/login'
import { useNavigate } from 'react-router-dom'
import classes from './LoginForm.module.scss'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
}

const LoginForm = () => {
  const user = useSelector((state: any) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginForm, setLoginForm] = React.useState({
    accountName: '',
    password: '',
    loginTypeEnum: 1,
  })
  const handlePasswordChage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setLoginForm((pre) => ({ ...pre, password: e.target.value }))
    },
    []
  )
  const handleAccountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setLoginForm((pre) => ({ ...pre, accountName: e.target.value }))
    },
    []
  )
  const handleSubmit = useCallback(async () => {
    if (!user.authorization.access_token) {
      await getOAuthToken()
    }
    try {
      const { data } = await reqLogin(loginForm)
      if (data.code === 200) {
        dispatch(setToken(data.data.token))
        const { data: accountData } = await reqGetAccountInfo()
        if (accountData.code === 200) {
          dispatch(setUserInfor(accountData.data))
        }
        navigate('/home')
      } else {
        message.error('登录失败')
      }
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, loginForm, navigate, user.authorization.access_token])
  const { accountName, password } = loginForm
  const buttonClass = `${classes.login_form_button} ${classes.login_form_button_primary}`
  return (
    <div className={classes.login_form}>
      <div className={classes.logo}>
        <img src={require('../../../assets/login/TDS_logo.png')} alt="" />
      </div>
      <div className={classes.title}>太多石网站</div>
      <Form
        {...formItemLayout}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
          style={{ margin: '30px auto' }}
        >
          <Input
            placeholder="请输入用户名"
            style={{ height: '64px' }}
            value={accountName}
            onChange={handleAccountChange}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
          style={{ margin: '30px auto' }}
        >
          <Input.Password
            placeholder="密码"
            style={{ height: '64px' }}
            onChange={handlePasswordChage}
            value={password}
          />
        </Form.Item>
        <Form.Item style={{ margin: '30px auto' }}>
          <Button type="primary" htmlType="submit" className={buttonClass}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm
