import classnames from 'classnames'
import { useState, useRef, useEffect } from 'react'
export default function LazyLoadImg({
  src,
  alt,
  classname = null,
  onClick = () => {},
  style = {},
}) {
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(false)
  const imgRef = useRef<any>(null)
  const onLoad = () => {
    setLoading(false)
    setErr(false)
  }
  const onError = () => {
    setLoading(false)
    setErr(true)
  }
  useEffect(() => {
    // 监听图片
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 图片在可视区
        imgRef.current.src = imgRef.current.dataset.src
        // 取消监听
        observer.unobserve(imgRef.current)
      }
    })
    observer.observe(imgRef.current)
  }, [])
  return (
    <div className={classnames(classname)} onClick={onClick} style={style}>
      {loading && <div>加载中</div>}
      {err && <div>加载失败</div>}
      <img
        alt={alt}
        ref={imgRef}
        data-src={src}
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  )
}
