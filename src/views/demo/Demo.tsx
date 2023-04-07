import React from 'react'
import UploadImage from '@/components/UploadImage/UploadImage'
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
const Demo = () => {
  return (
    <div style={{ marginTop: '100px' }}>
      <UploadImage limt={3}>
        <div className="uploadLOGO" style={logo_box}>
          <div style={logo_div}>+</div>
          <p>上传LOGO</p>
        </div>
      </UploadImage>
    </div>
  )
}

export default Demo
