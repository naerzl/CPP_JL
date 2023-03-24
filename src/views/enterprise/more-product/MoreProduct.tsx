import { reqGetEnterpriseProductList } from '@/api/enterprise'
import StonesItem from '@/views/stones/components/stones-item/StonesItem'
import { Pagination } from 'antd'
import React from 'react'
import { useLocation } from 'react-router-dom'
import classes from './MoreProduct.module.scss'
const MoreProduct = () => {
  const loaction = useLocation()
  const [reqParams, setReqParams] = React.useState({
    pageNumber: 1,
    pageSize: 16,
    enterpriseId: loaction.state.id,
  })
  const [productList, setProductList] = React.useState<any[]>([])
  const [total, setTotal] = React.useState(0)
  const getListData = React.useCallback(() => {
    reqGetEnterpriseProductList(reqParams).then((res) => {
      console.log(res)
      if (res.data.code === 200) {
        const newArr = res.data.data.items.map((item: any) => ({
          id: item.id,
          name: item.productName,
          terrazzoImage: [item.productImage.replace('https://', '')],
        }))
        setProductList(newArr)
        setTotal(res.data.data.total)
      }
    })
  }, [reqParams])
  const onChange = (pageNumber: number) => {
    setReqParams((pre) => ({ ...pre, pageNumber }))
  }
  React.useEffect(() => {
    getListData()
  }, [getListData])
  return (
    <div className={classes.main}>
      <div className="banxin" style={{ borderTop: '1px solid transparent' }}>
        <div className={classes.content}>
          {productList.map((item: any) => (
            <StonesItem key={item.id} item={item}></StonesItem>
          ))}
          {total > 0 && (
            <div className={classes.pagination}>
              <Pagination
                defaultCurrent={1}
                total={total}
                onChange={onChange}
                defaultPageSize={16}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MoreProduct
