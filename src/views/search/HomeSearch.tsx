import React from 'react'
import { useLocation } from 'react-router-dom'
import { reqGetEnterpriseList, reqGetStoneList } from '@/api'
import classes from './HomeSearch.module.scss'
import StoneIndex from '@/components/stone-index/StoneIndex'
import CompanyItem from '@/components/company-item/CompanyItem'
import { Pagination } from 'antd'
const HomeSearch = () => {
  const location = useLocation()
  console.log(location.state)
  const reqParams = {
    pageNumber: 1,
    pageSize: 12,
    keyword: location.state.searchVal,
  }
  const [listData, setListData] = React.useState([])
  const [total, setTotal] = React.useState(0)
  const request = React.useCallback(
    (cb: Function) => {
      console.log('回调函数打印了')
      cb(reqParams).then((res: any) => {
        if (res.data.code === 200) {
          if (location.state.selectVal === '1') {
            const newArr = res.data.data.items.map((item: any) => {
              return {
                ...item,
                entpriseName: item.name,
                file: item.logo,
              }
            })
            setListData(newArr)
            setTotal(res.data.data.total)
          } else {
            const newArr = res.data.data.items.map((item: any) => {
              return {
                ...item,
                imageURL: item.terrazzoImage[0],
                stoneName: item.name,
                stoneId: item.id,
              }
            })
            setListData(newArr)
            setTotal(res.data.data.total)
          }
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.state]
  )
  const getListData = React.useCallback(async () => {
    if (location.state.selectVal === '1') {
      request(reqGetEnterpriseList)
    } else if (location.state.selectVal === '2') {
      request(reqGetStoneList)
    }
  }, [location.state.selectVal, request])
  const onChange = (pageNumber: number) => {
    reqParams.pageNumber = pageNumber
    getListData()
  }
  React.useEffect(() => {
    getListData()
  }, [getListData])
  return (
    <div className="banxin">
      <div className={classes.container}>
        {location.state.selectVal === '1' &&
          listData.map((item, index) => (
            <CompanyItem item={item} key={index}></CompanyItem>
          ))}
        {location.state.selectVal === '2' &&
          listData.map((item, index) => (
            <div key={index} className={classes.componentsBox}>
              <StoneIndex item={item}></StoneIndex>
            </div>
          ))}
        <div className={classes.pagination}>
          <Pagination
            defaultCurrent={1}
            total={total}
            onChange={onChange}
            style={{ margin: '0 auto' }}
            defaultPageSize={12}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  )
}

export default HomeSearch
