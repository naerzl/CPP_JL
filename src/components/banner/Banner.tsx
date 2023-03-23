import React from 'react'

const Banner = (props: any) => {
  return (
    <div style={{ width: '100%', height: '536px' }}>
      <img
        src={props.img}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  )
}

export default Banner
