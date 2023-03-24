import React from 'react'
import classes from './CaseItem.module.scss'
const CaseItem = (props: any) => {
  const { item } = props
  return (
    <div className={classes.box}>
      <div className={classes.enterpriseInfo}>
        <div className={classes.avatar}>
          <img
            src={
              item.exampleSimpleInfo?.enterpriseLogo
                ? `https://${item.exampleSimpleInfo?.enterpriseLogo}`
                : require('@/assets/index/default-avatar.png')
            }
            alt=""
          />
        </div>
        <div className={classes.enterpriseName}>
          {item.exampleSimpleInfo?.enterpriseName}
        </div>
      </div>
      <div className={classes.productInfo}>
        <p>项目名称: {item?.exampleSimpleInfo.projectName}</p>
        <p>设计师：{item.exampleSimpleInfo?.designerId}</p>
      </div>
      <div className={classes.describe}>
        {item.exampleSimpleInfo?.projectDescription}
      </div>
      <div className={classes.line}></div>
      {/* 预览图片 */}
      <div className={classes.imagePreview}>
        {item.exampleSimpleInfo?.images?.length === 1 && (
          <div className={classes.itemPhoto1}>
            <img
              src={'https://' + item.exampleSimpleInfo?.images[0].file}
              alt=""
            />
          </div>
        )}
        {item.exampleSimpleInfo?.images?.length === 2 && (
          <div className={classes.itemPhoto2}>
            <div className={classes.left}>
              <img
                src={'https://' + item.exampleSimpleInfo?.images[0].file}
                alt=""
              />
            </div>
            <div className={classes.right}>
              <img
                src={'https://' + item.exampleSimpleInfo?.images[1].file}
                alt=""
              />
            </div>
          </div>
        )}
        {item.exampleSimpleInfo?.images?.length >= 3 && (
          <div className={classes.itemPhoto3}>
            <div className={classes.left}>
              <img
                src={'https://' + item.exampleSimpleInfo?.images[0].file}
                alt=""
              />
            </div>
            <div className={classes.right}>
              <div className={classes.top}>
                <img
                  src={'https://' + item.exampleSimpleInfo?.images[1].file}
                  alt=""
                />
              </div>
              <div className={classes.btm}>
                <img
                  src={'https://' + item.exampleSimpleInfo?.images[2].file}
                  alt=""
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(CaseItem)
