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
  message,
} from 'antd'
import React from 'react'
import classes from './SettleIn.module.scss'
import { cities } from '@/utils/city'
import UploadImage from '@/components/UploadImage/UploadImage'
import { UploadFile } from 'antd/es/upload'
import { reqPutApplyFor } from '@/api/enterprise'
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

const logo_box: any = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  color: '#2755c2',
}

const logo_div: any = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: '#d3e4fb',
  fontWeight: '700',
  fontSize: '18px',
  textAlign: 'center',
  lineHeight: '24px',
}
const SettleIn = () => {
  const [form] = Form.useForm()
  const [uploadImage, setUploadImage] = React.useState<{
    businessLicenseImgs: any[]
    advertisingMap: string
    logo: string
  }>({
    businessLicenseImgs: [], // 营业执照
    advertisingMap: '', // 公司banner
    logo: '',
  })
  const [type, setType] = React.useState('')
  const onFinish = async (values: any) => {
    const formData = { ...values, ...uploadImage }
    formData.address = formData.address.join('') + formData.addressDetail
    const res = await reqPutApplyFor(formData)
    if (res.data.code === 200) {
      message.success('操作成功')
    } else {
      message.error(res.data.message)
    }
  }

  const onValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues.authorizationType)
      setType(changedValues.authorizationType)
  }

  const uploadImageChange = (type: string, fileList: UploadFile[]) => {
    const data = fileList[0]?.response
    switch (type) {
      case 'logo':
        if (data?.code !== 200) break
        setUploadImage((pre) => ({ ...pre, [type]: data.data[0].url }))
        break
      case 'businessLicenseImgs':
        if (data?.code !== 200) break
        const res = fileList.map((item) => ({
          fileURL: item.response?.data[0].url,
          fileId: item.response?.data[0].id,
          fileName: item.response?.data[0].filename,
        }))
        setUploadImage((pre) => ({ ...pre, [type]: res }))
        break
      case 'advertisingMap':
        if (data?.code !== 200) break
        setUploadImage((pre) => ({ ...pre, [type]: data.data[0].url }))
        break
      default:
        break
    }
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
            onValuesChange={onValuesChange}
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
              <Input placeholder="请输入企业名称" />
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
                    <Cascader
                      options={residences}
                      placeholder="请选择您的地址"
                    />
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
                    <Input placeholder="请输入详细地址"></Input>
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
              name="logo"
              label="公司LOGO"
              normalize={(value, prevValue, prevValues) => {
                console.log(value, prevValue, prevValues)
              }}
            >
              <UploadImage limt={1} change={uploadImageChange} type="logo">
                <div className="uploadLOGO" style={logo_box}>
                  <div style={logo_div}>+</div>
                  <p>上传LOGO</p>
                </div>
              </UploadImage>
            </Form.Item>

            <Form.Item name="advertisingMap" label="公司宣传图">
              <UploadImage
                limt={1}
                change={uploadImageChange}
                type="advertisingMap"
                style={{ width: '192px', height: '144px' }}
              >
                <div style={logo_box}>
                  <div style={logo_div}>+</div>
                  <p>上传宣传图</p>
                  <span style={{ fontSize: '14px', color: '#919499' }}>
                    建议图片尺寸为4:3
                  </span>
                </div>
              </UploadImage>
            </Form.Item>

            <Form.Item
              name="mainBusiness"
              label="企业主管"
              rules={[{ required: true, message: '企业主营必填' }]}
            >
              <Input.TextArea placeholder="请输入企业主营业务" />
            </Form.Item>
            <Form.Item
              name="profile"
              label="企业简介"
              rules={[{ required: true, message: '企业简介必填' }]}
            >
              <Input.TextArea placeholder="请输入企业简介" />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                { required: true, message: 'Please input donation amount!' },
                { type: 'email', message: '邮箱格式不正确' },
              ]}
            >
              <Input style={{ width: '100%' }} placeholder="请输入邮箱号码" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="联系方式"
              rules={[
                { required: true, message: '联系方式必填' },
                { pattern: /^1[3456789]\d{9}$/, message: '联系方式格式不正确' },
              ]}
            >
              <Input style={{ width: '100%' }} placeholder="请输入联系方式" />
            </Form.Item>

            <Form.Item
              name="authorizationType"
              label="认证类型"
              rules={[{ required: true, message: 'Please select gender!' }]}
              wrapperCol={{ span: 10 }}
            >
              <Select placeholder="三证">
                <Option value="一证">一证</Option>
                <Option value="三证">三证</Option>
              </Select>
            </Form.Item>

            {type === '三证' && (
              <>
                <Form.Item name="groupCode" label="组织机构代码">
                  <Input
                    style={{ width: '100%' }}
                    placeholder="请输入组织机构代码"
                  />
                </Form.Item>
                <Form.Item name="businessNumber" label="营业执照号">
                  <Input
                    style={{ width: '100%' }}
                    placeholder="请输入营业执照号"
                  />
                </Form.Item>
                <Form.Item name="taxw" label="税务登记证">
                  <Input
                    style={{ width: '100%' }}
                    placeholder="请输入税务登记证"
                  />
                </Form.Item>
              </>
            )}
            {type === '一证' && (
              <Form.Item name="creditCode" label="统一社会信用代码">
                <Input
                  style={{ width: '100%' }}
                  placeholder="请输入统一社会信用代码"
                />
              </Form.Item>
            )}

            <Form.Item
              label={
                <div>
                  <div>企业营业执照</div>
                  <div>(三年需要上传三张)</div>
                </div>
              }
            >
              <UploadImage
                limt={3}
                change={uploadImageChange}
                type="businessLicenseImgs"
                style={{ width: '192px', height: '144px' }}
              >
                <div style={logo_box}>
                  <div style={logo_div}>+</div>
                  <p>上传宣传图</p>
                  <span style={{ fontSize: '14px', color: '#919499' }}>
                    建议图片尺寸为4:3
                  </span>
                </div>
              </UploadImage>
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
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: '10px' }}
              >
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
