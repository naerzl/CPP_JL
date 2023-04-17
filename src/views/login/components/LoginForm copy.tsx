import React, { ChangeEvent } from 'react'
import classes from './LoginForm.module.scss'
import { Form, Input, Button, message } from 'antd'
import { reqLogin, reqGetAccountInfo } from '@/api/user'
import { useSelector, useDispatch } from 'react-redux'
import { getOAuthToken } from '@/utils/AES'
import { setToken, setUserInfor } from '@/store/modules/login'
import { useNavigate } from 'react-router-dom'
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
  const handlePasswordChage = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((pre) => ({ ...pre, password: e.target.value }))
  }
  const handleAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((pre) => ({ ...pre, accountName: e.target.value }))
  }
  const handleSubmit = async () => {
    !user.authorization.access_token && (await getOAuthToken())
    const res = await reqLogin(loginForm)
    if (res.data.code === 200) {
      dispatch(setToken(res.data.data.token))
      reqGetAccountInfo().then((e) => {
        if (e.data.code === 200) {
          console.log(e)
          dispatch(setUserInfor(e.data.data))
        }
      })
      navigate('/home')
    } else {
      message.error('登录失败')
    }
  }
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
            value={loginForm.accountName}
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
            value={loginForm.password}
          />
        </Form.Item>
        <Form.Item style={{ margin: '30px auto' }}>
          <Button
            type="primary"
            htmlType="submit"
            className={classes.login_form_button}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm
