import CaseItem from '@/components/case-item/CaseItem'
import React from 'react'
import classes from './RecommendCase.module.scss'
import { reqGetHomeAdvertisingList } from '@/api'
const RecommendCase = () => {
  const reqParams = React.useRef({
    type: 6,
    relationType: null, // 关联类型
    pageNumber: 1,
    pageSize: 6,
  })
  const [caseList, setCaseList] = React.useState<any[]>([])
  //   获取广告
  const getAdvList = React.useCallback(async () => {
    const res = await reqGetHomeAdvertisingList(reqParams.current)
    if (res.data.code === 200) {
      setCaseList(res.data.data.items)
    }
  }, [])
  React.useEffect(() => {
    getAdvList()
  }, [getAdvList])
  return (
    <div className={classes.container}>
      <div className={classes.tag}>
        <img src={require('@/assets/index/recommend-case.png')} alt="" />
        <img src={require('@/assets/index/upload-case.png')} alt="" />
      </div>
      <div className={classes.caseList}>
        {caseList.map((item, index) => (
          <CaseItem key={index} item={item}></CaseItem>
        ))}
      </div>
    </div>
  )
}

export default RecommendCase
