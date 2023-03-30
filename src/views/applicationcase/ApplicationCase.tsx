import { reqGetExampleList } from '@/api/application'
import Banner from '@/components/banner/Banner'
import CaseItem from '@/components/case-item/CaseItem'
import { Pagination } from 'antd'
import React from 'react'
import classes from './ApplicationCase.module.scss'
const ApplicationCase = () => {
  const [reqParams, setReqParams] = React.useState({
    type: 1,
    sort: 0,
    keyword: null,
    pageNumber: 1,
    pageSize: 12,
  })
  const [caseList, setCaseList] = React.useState<any[]>([])
  const [total, setTotal] = React.useState(0)
  const getCaseListData = React.useCallback(async () => {
    const res = await reqGetExampleList(reqParams)
    console.log(res)
    if (res.data.code === 200) {
      const newArr = res.data.data.items.map((item: any) => {
        return { exampleSimpleInfo: item }
      })
      setCaseList(newArr)
      // setCaseList(res.data.data.items)
      setTotal(res.data.data.total)
    }
  }, [reqParams])
  const onChange = (pageNumber: number) => {
    setReqParams((pre) => ({ ...pre, pageNumber }))
  }
  React.useEffect(() => {
    window.scrollTo(0, 0)
    getCaseListData()
  }, [getCaseListData])
  return (
    <div className={classes.main}>
      <Banner img={require('@/assets/application-case/banner.png')}></Banner>
      <div className={`banxin ${classes.content}`}>
        <div className={classes.tag}>
          <img src={require('@/assets/index/recommend-case.png')} alt="" />
        </div>
        <div className={classes.caseList}>
          {caseList.map((item) => (
            <CaseItem key={item.id} item={item}></CaseItem>
          ))}
        </div>
        {total > 0 && (
          <div className={classes.pagination}>
            <Pagination
              defaultCurrent={1}
              total={total}
              onChange={onChange}
              defaultPageSize={12}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplicationCase
