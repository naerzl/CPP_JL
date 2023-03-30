import StoneIndex from '@/components/stone-index/StoneIndex'
import React from 'react'
import classes from './RecommendStone.module.scss'
import { reqGetHomeStoneAdvList } from '@/api'
import { Link } from 'react-router-dom'

const RecommendStone = () => {
  const [stoneList, setStoneList] = React.useState<any[]>([])
  const getStoneList = React.useCallback(async () => {
    const res = await reqGetHomeStoneAdvList()
    if (res.data.code === 200) {
      setStoneList(res.data.data)
    }
  }, [])

  let timerId = React.useRef(-1)
  React.useEffect(() => {
    getStoneList()
    timerId.current = window.setInterval(() => {
      getStoneList()
    }, 8000)
    return () => {
      clearInterval(timerId.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickReset = () => {
    timerId.current !== -1 && clearInterval(timerId.current)
    getStoneList()
    timerId.current = window.setInterval(() => {
      getStoneList()
    }, 8000)
  }
  return (
    <div className={classes.container}>
      <div className={classes.tag}>
        <img src={require('@/assets/index/recommend-stone.png')} alt="" />
        <Link to={'/home/stones'}>
          <img src={require('@/assets/index/more-stone.png')} alt="" />
        </Link>
      </div>
      <div className={classes.stoneList}>
        {stoneList.map((item, index) => (
          <StoneIndex key={index} item={item} from="首页"></StoneIndex>
        ))}
      </div>
      <div className={classes.bottomButton} onClick={handleClickReset}>
        <img src={require('@/assets/index/reset.jpg')} alt="" />
        换一批
      </div>
    </div>
  )
}

export default RecommendStone
