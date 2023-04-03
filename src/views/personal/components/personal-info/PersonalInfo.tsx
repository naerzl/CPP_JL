import {
  reqGetEditUserInfoVerifyCode,
  reqPutCancellAccount,
  reqPutUserInfo,
} from '@/api/personal'
import { reqGetAccountInfo } from '@/api/user'
import useCountDown from '@/hooks/useCountDown'
import { setUserInfor } from '@/store/modules/login'
import { Button, Form, Input, message, Modal } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './PeisonalInfo.module.scss'
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
const PersonalInfo = () => {
  const { userInfo } = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { count, start } = useCountDown(60, () => {})
  // 表单初始数据
  const formData = {
    accountName: userInfo.accountName,
    name: userInfo.name,
    email: userInfo.email,
    address: userInfo.address,
    phone: userInfo.phone,
    verifyCode: '',
  }
  const [isShowVerify, setIsShowVerify] = React.useState(false)
  // 发送验证码
  const sendVerifyCode = async () => {
    const res = await form.validateFields(['phone'])
    if (!res || count !== 60) return
    start()
    const result = await reqGetEditUserInfoVerifyCode({
      phone: form.getFieldValue('phone'),
    })
    if (result.data.code !== 200) return message.error('获取失败')
  }
  // 提交表单
  const onFinish = async (values: any) => {
    const res = await reqPutUserInfo(values)
    if (res.data.code === 200) {
      reqGetAccountInfo().then((e) => {
        if (e.data.code === 200) {
          dispatch(setUserInfor(e.data.data))
          message.success('修改成功')
        }
      })
    }
  }
  const handle_write_off = async () => {
    Modal.confirm({
      title: '确定注销账号？',
      content:
        '注销后该账号无法再进行登录并且将会删除账号相 关设计方案及收藏，是否确认注销？',
      okText: '注销账号',
      type: 'warning',
      onOk: async () => {
        await reqPutCancellAccount()
        message.success('操作成功')
      },
    })
  }
  return (
    <div className={classes.main}>
      <img src={require('@/assets/personal/user-info.png')} alt="" />
      <Form
        {...formItemLayout}
        style={{ maxWidth: 500 }}
        onFinish={onFinish}
        form={form}
        initialValues={formData}
      >
        <Form.Item
          name="accountName"
          label="用户名"
          style={itemStyle}
          rules={[{ required: true, message: '用户名必填' }]}
        >
          <Input style={{ height: '40px' }} disabled />
        </Form.Item>
        <Form.Item
          label="姓名"
          style={itemStyle}
          name="name"
          rules={[{ required: true, message: '姓名' }]}
        >
          <Input style={{ height: '40px' }} />
        </Form.Item>
        <Form.Item
          label="邮箱"
          style={itemStyle}
          name="email"
          rules={[
            { required: true, message: '邮箱必填' },
            { type: 'email', message: '邮箱格式不正确' },
          ]}
        >
          <Input style={{ height: '40px' }} />
        </Form.Item>
        <Form.Item
          label="邮寄地址"
          style={itemStyle}
          name="address"
          rules={[{ required: true, message: '邮寄地址必填' }]}
        >
          <Input style={{ height: '40px' }} />
        </Form.Item>
        <Form.Item
          label="联系方式"
          style={itemStyle}
          name="phone"
          rules={[
            { required: true, message: '联系方式必填' },
            { pattern: /^1[3456789]\d{9}$/, message: '联系方式格式不正确' },
          ]}
        >
          <Input
            style={{ height: '40px' }}
            disabled={!isShowVerify}
            suffix={
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => setIsShowVerify(true)}
              >
                修改手机号
              </span>
            }
          />
        </Form.Item>
        {isShowVerify && (
          <Form.Item
            label="验证码"
            style={itemStyle}
            name="verifyCode"
            rules={[{ required: true, message: '验证码必填必填' }]}
          >
            <Input
              style={{ height: '40px' }}
              suffix={
                <Button
                  type="link"
                  style={{ cursor: 'pointer' }}
                  onClick={() => sendVerifyCode()}
                  disabled={count !== 60}
                >
                  {count === 60 ? '发送验证码' : count}
                </Button>
              }
            />
          </Form.Item>
        )}
        <Form.Item style={{ paddingLeft: '84px' }}>
          <Button
            htmlType="submit"
            style={{ marginRight: '30px' }}
            type="primary"
          >
            保存
          </Button>
          <Button>取消</Button>
        </Form.Item>
      </Form>
      <div className={classes.write_off}>
        <img src={require('@/assets/personal/write_off.png')} alt="" />
        <div className={classes.text}>
          <span></span>
          注销后该账号无法再进行登录。
        </div>
        <div className={classes.text}>
          <span></span>
          注销后将会删除账号相关设计方案及收藏。
        </div>
        <div className={classes.text}>
          <span></span>
          注销后可以重新注册，但不会保留之前的数据。
        </div>
      </div>
      <div className={classes.btm_btn}>
        <Button className={classes.button} onClick={handle_write_off}>
          注销账号
        </Button>
      </div>
    </div>
  )
}

export default PersonalInfo
