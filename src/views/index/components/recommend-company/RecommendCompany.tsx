import CompanyItem from '@/components/company-item/CompanyItem'
import React from 'react'
import classes from './ReacommendCompany.module.scss'
import { reqGetHomeAdvertisingList, reqGetEnterpriseById } from '@/api'
const RecommendCompany = () => {
  const [reqParams, setReqParams] = React.useState({
    type: 5,
    relationType: null, // 关联类型
    pageNumber: 1,
    pageSize: 4,
  })
  const [companyList, setCompanyList] = React.useState<any[]>([])
  const [total, setTotal] = React.useState(0)
  const timerId = React.useRef(-1)
  const getAdvertisingList = React.useCallback(async () => {
    const res = await reqGetHomeAdvertisingList(reqParams)
    if (res.data.code === 200) {
      const { items, total } = res.data.data
      setTotal(total)
      const companyDetailsPromises = items.map((item: any) => {
        return reqGetEnterpriseById(item.relationId).then((result) => ({
          ...item,
          address: result.data.data.address,
          entpriseName: result.data.data.name,
          profile: result.data.data.profile,
        }))
      })
      const companyDetails = await Promise.all(companyDetailsPromises)
      setCompanyList(companyDetails)
    }
  }, [reqParams])

  const handleClickReset = React.useCallback(() => {
    // 判断还有没有下一页数据
    if (total < reqParams.pageSize) return
    setReqParams((pre) => ({ ...pre, pageNumber: pre.pageNumber + 1 }))
  }, [reqParams.pageSize, total])

  React.useEffect(() => {
    getAdvertisingList()
    if (total < reqParams.pageSize) return
    timerId.current = window.setInterval(() => {
      handleClickReset()
    }, 8000)
    return () => {
      clearInterval(timerId.current)
    }
  }, [getAdvertisingList, handleClickReset, reqParams.pageSize, total])

  return (
    <div className={classes.container}>
      <div className={classes.tag}>
        <img src={require('@/assets/index/recommend-company.png')} alt="" />
        <img src={require('@/assets/index/settled.png')} alt="" />
      </div>
      <div className={classes.companyList}>
        {companyList.map((item, index) => (
          <CompanyItem item={item} key={index}></CompanyItem>
        ))}
      </div>
      <div className={classes.bottomButton} onClick={handleClickReset}>
        <img src={require('@/assets/index/reset.jpg')} alt="" />
        换一批
      </div>
    </div>
  )
}

export default RecommendCompany
