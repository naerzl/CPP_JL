import { reqGetHomeAdvertisingList } from '@/api'
import React from 'react'
import classes from './YouLove.module.scss'
const YouLove = () => {
  const [reqParams, setReqParams] = React.useState({
    type: 8,
    relationType: null, // 关联类型
    pageNumber: 1,
    pageSize: 4,
  })
  const [youLoveList, setYouLoveList] = React.useState<any[]>([])
  const [total, setTotal] = React.useState(0)
  const getAdvertisingList = React.useCallback(async () => {
    const res = await reqGetHomeAdvertisingList(reqParams)
    if (res.data.code === 200) {
      const { items, total } = res.data.data
      setYouLoveList(items)
      setTotal(total)
    }
  }, [reqParams])
  const handleClickReset = React.useCallback(() => {
    // 判断还有没有下一页数据
    if (total < reqParams.pageSize) return
    setReqParams((pre) => ({ ...pre, pageNumber: pre.pageNumber + 1 }))
  }, [reqParams.pageSize, total])
  React.useEffect(() => {
    getAdvertisingList()
  }, [getAdvertisingList])
  return (
    <div className={classes.container}>
      <div className={classes.tag}>
        <img src={require('@/assets/stones/youlove.png')} alt="" />
      </div>
      <ul className={classes.list}>
        {youLoveList.map((item) => (
          <li key={item.id}>
            <img src={'https://' + item.file} alt="" />
          </li>
        ))}
      </ul>
      {total > 4 && (
        <div className={classes.bottomButton} onClick={handleClickReset}>
          <img src={require('@/assets/index/reset.jpg')} alt="" />
          换一批
        </div>
      )}
    </div>
  )
}

export default YouLove
