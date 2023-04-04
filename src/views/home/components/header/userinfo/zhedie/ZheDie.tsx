import { message } from 'antd'
import React from 'react'
const operation = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '35px',
}
const div_style = {
  color: '#919499',
  cursor: 'pointer',
}

const title: any = {
  color: '#616266',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
}
const ZheDie = (props: any) => {
  const [flag, setFlag] = React.useState(false)
  const handleClickDetail = () => {
    message.info('可以跳转差个地址')
  }
  const handleCLickChangeIcon = () => {
    setFlag((pre) => !pre)
  }
  return (
    <div>
      <div style={flag ? {} : title}>{props.content}</div>
      <div style={operation}>
        <div style={div_style} onClick={handleClickDetail}>
          查看详情
        </div>
        <div style={div_style} onClick={handleCLickChangeIcon}>
          {flag ? (
            <span className="iconfont icon-down"></span>
          ) : (
            <span className="iconfont icon-right"></span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ZheDie
