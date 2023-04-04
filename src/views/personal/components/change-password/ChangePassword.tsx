import { reqPutChangPassword } from '@/api/personal'
import { Button, Form, Input, message } from 'antd'
import React from 'react'
import classes from './ChangePassword.module.scss'
const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 20 },
  },
}
const itemStyle = {
  marginBottom: '20px',
}
const ChangePassword = () => {
  const [form] = Form.useForm()
  console.log(form)
  const onFinish = async (values: any) => {
    console.log(values)
    const res = await reqPutChangPassword(values)
    if (res.data.code === 200) {
      message.success('操作成功')
    } else {
      message.error(res.data.message)
    }
  }
  return (
    <div className={classes.main}>
      <img src={require('@/assets/personal/change-password.png')} alt="" />
      <Form
        {...formItemLayout}
        style={{ maxWidth: 500 }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="当前密码"
          style={itemStyle}
          name="oldPwd"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
            {
              max: 15,
              min: 6,
              message: '密码需要6-8位',
            },
          ]}
        >
          <Input.Password style={{ height: '40px' }} />
        </Form.Item>
        <Form.Item
          label="新密码"
          style={itemStyle}
          name="pwd"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
            {
              max: 15,
              min: 6,
              message: '密码需要6-8位',
            },
          ]}
        >
          <Input.Password style={{ height: '40px' }} />
        </Form.Item>
        <Form.Item
          label="再次输入"
          style={itemStyle}
          name="newPwd"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('pwd') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('您输入的两次密码不匹配'))
              },
            }),
          ]}
        >
          <Input.Password style={{ height: '40px' }} />
        </Form.Item>
        <Form.Item style={{ paddingLeft: '84px' }}>
          <Button
            htmlType="submit"
            style={{ marginRight: '30px' }}
            type="primary"
            className="mybutton"
          >
            保存
          </Button>
          <Button onClick={() => form.resetFields()}>取消</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ChangePassword
