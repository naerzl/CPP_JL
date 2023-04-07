import React from 'react'
import { Upload } from 'antd'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { useSelector } from 'react-redux'

const UploadImage = (props: any) => {
  const { limt = 3, change, type, style = {} } = props
  const { authorization, token } = useSelector((state: any) => state.user)
  const [fileList, setFileList] = React.useState<UploadFile[]>([])

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    change(type, newFileList)
  }

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  return (
    <Upload
      action="https://dev-api.taiduoshi.net/api/user/File/upload"
      listType="picture-card"
      fileList={fileList}
      onChange={onChange}
      headers={{
        Authorization: `Bearer ${authorization.access_token}`,
        Token: token,
      }}
      onPreview={onPreview}
      style={style}
    >
      {limt > fileList.length && props.children}
    </Upload>
  )
}

export default UploadImage
