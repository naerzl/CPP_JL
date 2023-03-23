import Banner from '@/components/banner/Banner'
import React from 'react'
import classes from './Stones.module.scss'
import { SearchOutlined } from '@ant-design/icons'
import { Input, Pagination } from 'antd'
import StonesItem from './components/stones-item/StonesItem'
import { reqGetStoneList } from '@/api/stones'

enum StoneOption {
  stoneType = 'stoneType',
  stoneColor = 'stoneColor',
  stoneVein = 'stoneVein',
  stoneExclusive = 'stoneExclusive',
}

const Stones = () => {
  const [screen, setScreen] = React.useState({
    stoneType: [
      { name: '全部', id: null, isActive: true },
      { name: '大理石', id: 0, isActive: false },
      { name: '花岗石', id: 1, isActive: false },
      { name: '石英石', id: 2, isActive: false },
      { name: '石灰岩', id: 3, isActive: false },
      { name: '其他', id: 4, isActive: false },
    ],
    stoneColor: [
      { name: '全部', id: null, isActive: true },
      { name: '黑色', id: 0, isActive: false },
      { name: '白色', id: 1, isActive: false },
      { name: '灰色', id: 2, isActive: false },
      { name: '蓝色', id: 3, isActive: false },
      { name: '绿色', id: 4, isActive: false },
      { name: '黄色', id: 5, isActive: false },
      { name: '红色', id: 6, isActive: false },
      { name: '棕色', id: 7, isActive: false },
    ],
    stoneVein: [
      { name: '全部', id: null, isActive: true },
      { name: '斜纹', id: 0, isActive: false },
      { name: '网纹', id: 1, isActive: false },
      { name: '直纹', id: 2, isActive: false },
      { name: '乱纹', id: 3, isActive: false },
      { name: '其他', id: 4, isActive: false },
    ],
    stoneExclusive: [
      { name: '全部', id: null, isActive: true },
      { name: '独家', id: true, isActive: false },
      { name: '其他', id: false, isActive: false },
    ],
  })

  const [stoneList, setStoneList] = React.useState<any[]>([])
  const [total, setTotal] = React.useState(0)
  const [reqParams, setReqParams] = React.useState({
    color: null,
    category: null,
    vein: null,
    keyword: '',
    exclusive: null,
    sortType: null,
    factoryId: null,
    pageNumber: 1,
    pageSize: 16,
  })

  const getStoneList = React.useCallback(async () => {
    const res = await reqGetStoneList(reqParams)
    if (res.data.code) {
      setStoneList(res.data.data.items)
      setTotal(res.data.data.total)
    }
  }, [reqParams])

  const [keyWord, setKeyWord] = React.useState('')
  const handleClickSearchStone = () => {
    setReqParams((pre) => ({ ...pre, keyword: keyWord, pageNumber: 1 }))
  }

  const handleSearchInputBlur = (e: any) => {
    setKeyWord(e.target.value)
  }
  // 点击切换选项
  const handleClickLiItem = (obj: any, type: string) => {
    const newArr = (screen as any)[type].map(
      (item: { name: string; id: null | number; isActive: boolean }) => {
        item.isActive = false
        if (item.id === obj.id) item.isActive = true
        return item
      }
    )
    setScreen((pre) => ({ ...pre, [type]: newArr }))
    switch (type) {
      case StoneOption.stoneColor:
        setReqParams((pre) => ({ ...pre, color: obj.id }))
        break
      case StoneOption.stoneExclusive:
        setReqParams((pre) => ({ ...pre, exclusive: obj.id }))

        break
      case StoneOption.stoneType:
        setReqParams((pre) => ({ ...pre, category: obj.id }))

        break
      case StoneOption.stoneVein:
        setReqParams((pre) => ({ ...pre, vein: obj.id }))

        break
      default:
        break
    }
  }
  const onChange = (pageNumber: number) => {
    setReqParams((pre) => ({ ...pre, pageNumber }))
  }
  React.useEffect(() => {
    getStoneList()
  }, [getStoneList])
  return (
    <div className={classes.main}>
      <Banner img={require('@/assets/stones/Group 736 (1).png')}></Banner>
      <div className={`banxin ${classes.content}`}>
        <div className={classes.select}>
          <div className={classes.searchBox}>
            <Input
              value={keyWord}
              placeholder="搜索骨料名称"
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
          {/* 骨料类型 */}
          <div className={classes.selectOption}>
            <div className={classes.category}>骨料类型</div>
            <ul>
              {screen.stoneType.map((item) => (
                <li
                  className={`${classes.item} ${
                    item.isActive && classes.active
                  }`}
                  key={item.name}
                  onClick={() => handleClickLiItem(item, 'stoneType')}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          {/* 骨料颜色 */}
          <div className={classes.selectOption}>
            <div className={classes.category}>骨料颜色</div>
            <ul>
              {screen.stoneColor.map((item) => (
                <li
                  className={`${classes.item} ${
                    item.isActive && classes.active
                  }`}
                  key={item.name}
                  onClick={() => handleClickLiItem(item, 'stoneColor')}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          {/* 骨料花纹 */}
          <div className={classes.selectOption}>
            <div className={classes.category}>骨料花纹</div>
            <ul>
              {screen.stoneVein.map((item) => (
                <li
                  className={`${classes.item} ${
                    item.isActive && classes.active
                  }`}
                  key={item.name}
                  onClick={() => handleClickLiItem(item, 'stoneVein')}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          {/* 独家骨料 */}
          <div className={classes.selectOption}>
            <div className={classes.category}>独家骨料</div>
            <ul>
              {screen.stoneExclusive.map((item) => (
                <li
                  className={`${classes.item} ${
                    item.isActive && classes.active
                  }`}
                  key={item.name}
                  onClick={() => handleClickLiItem(item, 'stoneExclusive')}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={classes.stoneList}>
          {stoneList.map((item, index) => (
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

export default Stones
