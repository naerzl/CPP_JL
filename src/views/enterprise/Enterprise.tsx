import Banner from '@/components/banner/Banner'
import { Input, Pagination } from 'antd'
import React from 'react'
import classes from './Enterprise.module.scss'
import { SearchOutlined } from '@ant-design/icons'
import { reqGetEnterpriseList } from '@/api/enterprise'
import CompanyItem from '@/components/company-item/CompanyItem'

enum EnumType {
  enterpriseType = 'enterpriseType',
  sort = 'sort',
}
const Enterprise = () => {
  const [reqParams, setReqParams] = React.useState({
    type: 1,
    sort: 0,
    keyword: '',
    pageNumber: 1,
    pageSize: 12,
  })
  const [enumData, setEnumData] = React.useState({
    enterpriseType: [
      {
        name: '骨料供应企业',
        isActive: true,
        id: 1,
      },
      {
        name: '水磨石生产企业',
        isActive: false,
        id: 0,
      },
    ],
    sort: [
      {
        name: '默认排序',
        isActive: true,
        id: 0,
      },
      {
        name: '最新',
        isActive: false,
        id: 2,
      },
    ],
  })
  const [keyWord, setKeyWord] = React.useState('')
  const [enterpriseList, setEnterpriseList] = React.useState<any[]>([])
  const [total, setTotal] = React.useState(0)
  const handleClickSearchStone = () => {
    setReqParams((pre) => ({ ...pre, keyword: keyWord, pageNumber: 1 }))
  }

  const handleSearchInputBlur = (e: any) => {
    setKeyWord(e.target.value)
  }

  // 点击切换选项
  const handleClickLiItem = (obj: any, type: string) => {
    const newArr = (enumData as any)[type].map(
      (item: { name: string; id: null | number; isActive: boolean }) => {
        item.isActive = false
        if (item.id === obj.id) item.isActive = true
        return item
      }
    )
    setEnumData((pre) => ({ ...pre, [type]: newArr }))
    switch (type) {
      case EnumType.enterpriseType:
        setReqParams((pre) => ({ ...pre, type: obj.id }))
        break
      case EnumType.sort:
        setReqParams((pre) => ({ ...pre, sort: obj.id }))

        break
      default:
        break
    }
  }

  const getEnterpriseData = React.useCallback(async () => {
    const res = await reqGetEnterpriseList(reqParams)
    if (res.data.code === 200) {
      const newArr = res.data.data.items.map((item: any) => ({
        ...item,
        file: item.logo,
        entpriseName: item.name,
      }))
      setEnterpriseList(newArr)
      setTotal(res.data.data.total)
    }
  }, [reqParams])
  const onChange = (pageNumber: number) => {
    setReqParams((pre) => ({ ...pre, pageNumber }))
  }
  React.useEffect(() => {
    getEnterpriseData()
  }, [getEnterpriseData])
  return (
    <div className={classes.main}>
      <Banner img={require('@/assets/enterprise/banner.png')}></Banner>
      <div className={`banxin ${classes.content}`}>
        <div className={classes.searchBox}>
          <Input
            value={keyWord}
            placeholder="搜索企业名称"
            prefix={<SearchOutlined style={{ color: '#919499' }} />}
            style={{ width: '320px', height: '40px' }}
            onChange={handleSearchInputBlur}
            onPressEnter={handleClickSearchStone}
          />
          <button
            className={classes.searchButton}
            onClick={handleClickSearchStone}
          >
            搜索骨料
          </button>
        </div>
        {/* 筛选 */}
        <div className={classes.select}>
          <ul className={classes.left}>
            {enumData.enterpriseType.map((item) => (
              <li
                key={item.name}
                className={item.isActive ? classes.active : ''}
                onClick={() => handleClickLiItem(item, EnumType.enterpriseType)}
              >
                {item.name}
              </li>
            ))}
          </ul>
          <ul className={classes.right}>
            {enumData.sort.map((item) => (
              <li
                key={item.name}
                className={item.isActive ? classes.active : ''}
                onClick={() => handleClickLiItem(item, EnumType.sort)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        {/* 展示列表 */}
        <div className={classes.enterpriseList}>
          {enterpriseList.map((item) => (
            <CompanyItem
              item={item}
              key={item.id}
              from="企业社区"
            ></CompanyItem>
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

export default Enterprise
