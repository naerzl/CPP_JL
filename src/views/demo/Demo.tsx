import React from 'react'
import useCountDown from '@/hooks/useCountDown'
const Demo = () => {
  useCountDown()
  const { count, start } = useCountDown(10, () => setSendAble(true))
  // 默认刚开始可以点击
  const [sendAble, setSendAble] = React.useState(true)
  const onSendCode = () => {
    if (!sendAble) return
    // 开启定时器
    start()
    // 关闭
    setSendAble(false)
  }

  return (
    <div style={{ marginTop: '100px' }}>
      <button className="code-extra" onClick={onSendCode}>
        {sendAble ? '发送验证码' : count + '秒之后发送'}
      </button>
    </div>
  )
}

export default Demo
