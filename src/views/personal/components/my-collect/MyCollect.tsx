import { reqGetCollectionList } from '@/api/personal'
import { Pagination } from 'antd'
import React from 'react'
import CollectItem from './collect-item/CollectItem'
import classes from './MyCollect.module.scss'
const MyCollect = () => {
  const [reqParams, setReqParams] = React.useState({
    pageNumber: 1,
    pageSize: 20,
  })
  const [list, setList] = React.useState<any[]>([])
  const [total, setTotal] = React.useState(0)
  const getData = React.useCallback(async () => {
    const res = await reqGetCollectionList(reqParams)
    if (res.data.code === 200) {
      console.log(res.data)
      setList(res.data.data.items)
      setTotal(res.data.data.total)
    }
  }, [reqParams])
  React.useEffect(() => {
    getData()
  }, [getData])
  const onChange = (pageNumber: number) => {
    setReqParams((pre) => ({ ...pre, pageNumber }))
  }
  return (
    <>
      {total > 0 ? (
        <div className={classes.main}>
          <img
            className={classes.collect_img}
            src={require('@/assets/personal/my-collect.png')}
            alt=""
          />
          <div className={classes.collect_list}>
            {list.map((item) => (
              <CollectItem
                key={item.id}
                item={item}
                from="我的收藏"
              ></CollectItem>
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
      ) : (
        <div className={classes.main}>
          <div className={classes.no}>
            <img src={require('@/assets/personal/noing.png')} alt="" />
            <p>您还没有收藏任何东西~</p>
          </div>
        </div>
      )}
    </>
  )
}

export default MyCollect
