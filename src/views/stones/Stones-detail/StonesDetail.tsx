import { Breadcrumb, Divider, message } from 'antd'
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import classes from './StonesDetail.module.scss'
import {
  reqGetStoneBindEnterprises,
  reqGetStoneInfo,
  reqCollection,
  reqCancelCollection,
} from '@/api/stones'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css/free-mode'
import EnterpriseItem from './Enteriprise-item/EnterpriseItem'
import YouLove from '@/components/you-love/YouLove'

const StonesDetail = () => {
  const location = useLocation()
  const { id } = useParams()

  const { stoneColor, stoneVein } = useSelector(
    (state: any) => state.dictionarise
  )
  const [stoneData, setStoneData] = React.useState<any>({})
  const [preImage, setPreImage] = React.useState('')
  const color = React.useRef('')
  const [stoneBindEnt, setStoneBindEnt] = React.useState<any>({})

  const getStoneData = React.useCallback(() => {
    reqGetStoneInfo(id as any).then((res) => {
      if (res.data.code === 200) {
        setStoneData(res.data.data)
        setPreImage(res.data.data.stone?.imgList[0])
      }
    })
    reqGetStoneBindEnterprises({
      stoneId: id,
      pageSize: 2147483647,
      pageNumber: 1,
    }).then((res) => {
      if (res.data.code === 200) {
        setStoneBindEnt(res.data.data.data)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  color.current = stoneData?.stone?.colors.map((item: any) => {
    return stoneColor.find((el: any) => +el.code === +item)?.codeName
  })
  React.useEffect(() => {
    window.scrollTo(0, 0)
    getStoneData()
  }, [getStoneData])

  const vein = stoneVein?.find(
    (item: any) => +item.code === stoneData.stone?.vein
  )?.codeName
  const handleCollect = async (type: boolean) => {
    if (type) {
      const res = await reqCollection(id)
      if (res.data.code === 200) {
        message.success('操作成功')
        getStoneData()
      }
    } else {
      const res = await reqCancelCollection(id)
      if (res.data.code === 200) {
        message.success('操作成功')
        getStoneData()
      }
    }
  }
  return (
    <div className={classes.main}>
      <div className="banxin">
        {location.state && (
          <Breadcrumb
            separator=">"
            items={[
              {
                title: location.state.fromname,
                href: location.state.from,
              },
              {
                title: stoneData?.stone?.name,
              },
            ]}
          />
        )}
        <div className={classes.stoneInfoBox}>
          <div className={classes.bigImage}>
            <img src={'https://' + preImage} alt="" />
          </div>
          <ul className={classes.smallImage}>
            {stoneData?.stone?.imgList.map((item: string, index: number) => (
              <li
                key={index}
                className={preImage === item ? classes.active : ''}
                onClick={() => setPreImage(item)}
              >
                <img src={'https://' + item} alt="" />
                {preImage === item && (
                  <img
                    className={classes.xuan}
                    src={require('@/assets/stones/icon_mian_xuan.png')}
                    alt=""
                  ></img>
                )}
              </li>
            ))}
          </ul>
          {/* 骨料信息 */}
          <div className={classes.stoneInfo}>
            <h3>{stoneData?.stone?.name}</h3>
            <Divider style={{ margin: '15px 0 60px' }} />
            <p>
              骨料颜色
              <span>{color.current}</span>
            </p>
            <p>
              骨料花纹
              <span>{vein}</span>
            </p>
            <p>
              骨料产地<span>中国</span>
            </p>
            <div className={classes.handle}>
              <button className={classes.design}>立即设计</button>
              {stoneData.isCollectible ? (
                <button
                  className={classes.cancel}
                  onClick={() => handleCollect(false)}
                >
                  取消收藏
                </button>
              ) : (
                <button
                  className={classes.collect}
                  onClick={() => handleCollect(true)}
                >
                  收藏骨料
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={classes.companyINfo}>
          <div className={classes.icon}>
            <img src={require('@/assets/stones/enterpriseinfo.png')} alt="" />
          </div>
          {stoneBindEnt.length > 0 && (
            <div className={classes.enterpriseSwiper}>
              <Swiper
                slidesPerView={2}
                spaceBetween={30}
                freeMode={true}
                modules={[FreeMode]}
                className="mySwiper"
              >
                {stoneBindEnt.map((item: any) => (
                  <SwiperSlide key={item.id}>
                    <EnterpriseItem item={item}></EnterpriseItem>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
        <div className={classes.youLove}>
          <YouLove></YouLove>
        </div>
      </div>
    </div>
  )
}

export default StonesDetail
