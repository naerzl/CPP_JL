import {
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Breadcrumb,
  CascaderProps,
} from 'antd'
import React from 'react'
import classes from './SettleIn.module.scss'
import { cities } from '@/utils/city'
const { Option } = Select

interface DataNodeType {
  value: string
  label: string
  children?: DataNodeType[]
}

const residences: CascaderProps<DataNodeType>['options'] = cities

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 19,
      offset: 5,
    },
  },
}
const SettleIn = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }
  return (
    <div className={classes.main}>
      <div className="banxin" style={{ borderTop: '1px solid transparent' }}>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: '首页',
              href: '/home/index',
            },
            {
              title: '企业入驻申请',
            },
          ]}
        />
        <div className={classes.content}>
          <h4>入驻须知</h4>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            style={{ maxWidth: 800 }}
            scrollToFirstError
          >
            <Form.Item
              name="name"
              label="企业名称"
              rules={[
                {
                  required: true,
                  message: '企业名称必填',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="企业地址">
              <Row gutter={10}>
                <Col span={12}>
                  <Form.Item
                    style={{ marginBottom: '0' }}
                    name="address"
                    rules={[
                      {
                        type: 'array',
                        required: true,
                        message: '企业地址必填',
                      },
                    ]}
                  >
                    <Cascader options={residences} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    style={{ marginBottom: '0' }}
                    name="addressDetail"
                    rules={[
                      {
                        required: true,
                        message: '详细地址必填',
                      },
                    ]}
                  >
                    <Input></Input>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item
              name="types"
              label="企业类型"
              rules={[
                {
                  type: 'array',
                  required: true,
                  message: '类型必选',
                },
              ]}
            >
              <Checkbox.Group
                options={[
                  { label: '水磨石生产厂家', value: 0 },
                  { label: '骨料供应商', value: 1 },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="nickname"
              label="公司LOGO"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: 'Please input your nickname!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="address"
              label="公司宣传图"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="phone"
              label="联系方式"
              rules={[
                { required: true, message: '联系方式必填' },
                { pattern: /^1[3456789]\d{9}$/, message: '联系方式格式不正确' },
              ]}
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="mainBusiness"
              label="企业主管"
              rules={[{ required: true, message: '企业主营必填' }]}
            >
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>
            <Form.Item
              name="profile"
              label="企业简介"
              rules={[{ required: true, message: '企业简介必填' }]}
            >
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                { required: true, message: 'Please input donation amount!' },
                { type: 'email', message: '邮箱格式不正确' },
              ]}
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="gender"
              label="认证类型"
              rules={[{ required: true, message: 'Please select gender!' }]}
            >
              <Select placeholder="select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error('Should accept agreement')),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>我已阅读并同意《用户协议》及《隐私政策》</Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                申请入驻
              </Button>
              <Button htmlType="reset">取消</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default SettleIn
