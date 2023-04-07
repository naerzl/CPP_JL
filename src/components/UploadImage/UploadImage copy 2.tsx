import React from 'react'
import { message } from 'antd'
import classes from './UploadImage.module.scss'
import { upload } from '@/api/file'
const UploadImage = (props: any) => {
  const { limt = 3, change } = props
  console.log(props)
  // const { authorization, token } = useSelector((state: any) => state.user)
  const [fileList, setFileList] = React.useState<any[]>([])
  const DFile = React.useRef<HTMLInputElement | null>(null)
  const [isShow, setIsShow] = React.useState(true)

  const handleClick = () => {
    DFile.current?.click()
  }

  const fileChange = async (e: any) => {
    console.log(e)
    console.log(DFile.current?.files)
    if (DFile.current?.files?.[0]) {
      const nFile = DFile.current.files[0]
      if (nFile.size / 1024 / 1024 > 15)
        return message.warning('图片文件超过15M,请先处理后再上传')
      setIsShow(false)
      if (nFile.size / 1024 / 1024 > 1) message.warning('图片上传中请稍等')
      const res = await upload([nFile] as object)
      const newArr = res.data.data.map((item: any) => {
        item.url = 'https://' + item.url
        return {
          fileId: item.id,
          fileName: item.filename,
          fileURL: item.url,
        }
      })
      setIsShow(true)
      setFileList(newArr)
      DFile.current.value = ''
      change(nFile, fileList)
    }
  }

  const hanleDel = (id: number) => {
    setFileList(fileList.filter((item) => item.fileId !== id))
    change(id, fileList)
  }

  const hanleDown = (id: number) => {
    const obj = fileList.find((item) => item.fileId === id)
    if (obj) {
      const a = document.createElement('a')
      a.href = obj?.fileURL as string
      a.click()
    }
  }
  return (
    <div className={classes.container}>
      {fileList.map((item) => (
        <div className={classes.photo}>
          <img src={item.fileURL} alt="" />
          <div className={classes.mask}>
            <span
              className="iconfont icon-zoom-in"
              style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }}
            ></span>
            <span
              onClick={() => hanleDown(item.fileId)}
              className="iconfont icon-download"
              style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }}
            ></span>
            <span
              onClick={() => hanleDel(item.fileId)}
              className="iconfont icon-delete"
              style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }}
            ></span>
          </div>
        </div>
      ))}
      {isShow ? (
        <div
          className={classes.upload}
          onClick={handleClick}
          style={fileList.length >= limt ? { display: 'none' } : {}}
        >
          <span className="iconfont icon-zengjia"></span>
        </div>
      ) : (
        <div className={classes.upload}>
          <span className="iconfont icon-loading"></span>
        </div>
      )}

      <input
        type="file"
        ref={DFile}
        onChange={fileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default UploadImage
