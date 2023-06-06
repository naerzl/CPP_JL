import LazyLoadImg from '@/components/lazy-load-img/LazyLoadImg'
import React from 'react'

const TdsIndex = () => {
  const handleClick = () => {
    window.open(`https://design.taiduoshi.com/login?id=12345`)
  }
  return (
    <div>
      <LazyLoadImg
        src={require('@/assets/index/goTDSdesign.png')}
        alt=""
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )
}

export default React.memo(TdsIndex)
