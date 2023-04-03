import React from 'react'
import classes from './TDScourse.module.scss'
const TDScourse = () => {
  // 滚动到最底部
  const handleClickDown = () => {
    window.scroll(0, document.body.scrollHeight)
  }

  const [enumData, setEnumData] = React.useState([
    {
      name: '如何配置底色',
      id: '#backgroundColor',
      isActive: true,
    },
    {
      name: '如何选择骨料',
      id: '#stone',
      isActive: false,
    },
    {
      name: '如何查看保存的成品',
      id: '#lookSaveProduct',
      isActive: false,
    },
    {
      name: '如何联系企业打样',
      id: '#callCompany',
      isActive: false,
    },
  ])
  const DOM_backgroundColor = React.useRef<null | HTMLDivElement>(null)
  const DOM_stone = React.useRef<null | HTMLDivElement>(null)
  const DOM_lookSaveProduct = React.useRef<null | HTMLDivElement>(null)
  const DOM_callCompany = React.useRef<null | HTMLDivElement>(null)
  const handleChangeSelect = (obj: any) => {
    window.scrollTo(0, document.querySelector(obj.id)?.offsetTop - 64)
    const newArr = enumData.map((item) => {
      item.isActive = false
      if (item.id === obj.id) item.isActive = true
      return item
    })
    setEnumData(newArr)
  }
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className={classes.main}>
      <div className={classes.banner}>
        <img
          className={classes.bg}
          src={require('@/assets/TDS-course/bg.png')}
          alt=""
        />
        <div
          className={classes.design}
          onClick={() => window.open(process.env.REACT_APP_JICAI_URL)}
        >
          立即设计
        </div>
        <img
          className={classes.down}
          src={require('@/assets/TDS-course/down.png')}
          alt=""
          onClick={handleClickDown}
        />
      </div>
      <div className={`banxin ${classes.content}`}>
        {/* 选项 */}
        <ul className={classes.select}>
          {enumData.map((item) => (
            <li
              key={item.id}
              className={item.isActive ? classes.active : ''}
              onClick={() => handleChangeSelect(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <div
          id="backgroundColor"
          ref={DOM_backgroundColor}
          className={classes.backgroundColor}
        >
          <div className={classes.desc}>
            <h4>
              如何<span>配置底色</span>?
            </h4>
            <p>
              在底色选择中点击想选择颜色即可，如果当前
              区域没有您中意的颜色，可通过点击更多按钮 进行颜色的选择。
            </p>
            <div className={classes.hint}>
              小提示：你也可通过颜色汲取器汲取你想要的颜色。
            </div>
            <div className={classes.line}></div>
          </div>
          <div className={classes.right}>
            <video
              src={require('@/assets/TDS-course/01_教程_如何配置底色03.mp4')}
              muted
              autoPlay
              loop
            ></video>
          </div>
        </div>
        <div id="stone" ref={DOM_stone} className={classes.stone}>
          <div className={classes.left}>
            <video
              src={require('@/assets/TDS-course/02_教程_如何选择骨料03.mp4')}
              muted
              autoPlay
              loop
            ></video>
          </div>
          <div className={classes.desc}>
            <h4>
              如何<span>选择骨料</span>?
            </h4>
            <p>
              点击【添加骨料】，添加骨料骨料模板，在骨
              料模板中点击【选择骨料】，弹出骨料选择窗
              口，可以搜索或筛选骨料，收藏喜欢的骨料。
            </p>
            <div className={classes.line}></div>
          </div>
        </div>
        <div
          id="lookSaveProduct"
          ref={DOM_lookSaveProduct}
          className={classes.lookSaveProduct}
        >
          <div className={classes.desc}>
            <h4>
              如何<span>查看保存的成品</span>?
            </h4>
            <p>
              在设计页面保存的设计成品，可以在【成品管
              理】中查看，点击可以查看成品信息、订单信 息、重新编辑成品等。
            </p>

            <div className={classes.line}></div>
          </div>

          <div className={classes.right}>
            <video
              src={require('@/assets/TDS-course/03_教程_如何查看成品03.mp4')}
              muted
              autoPlay
              loop
            ></video>
          </div>
        </div>
        <div
          id="callCompany"
          ref={DOM_callCompany}
          className={classes.callCompany}
        >
          <div className={classes.left}>
            <video
              src={require('@/assets/TDS-course/04_教程_如何联系打样03.mp4')}
              muted
              autoPlay
              loop
            ></video>
          </div>
          <div className={classes.desc}>
            <h4>
              如何<span>联系企业打样</span>?
            </h4>
            <p>
              在【成品管理】中选择一个成品，点击【咨询
              工厂】，在下方添加心仪的工厂，点击【咨询 打样】即可联系工厂打样。
            </p>

            <div className={classes.line}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TDScourse
