import CaseItem from '@/components/case-item/CaseItem'
import React from 'react'
import classes from './CasePreview.module.scss'
const CasePreview = (props: any) => {
  const { list } = props
  const newArr = list.map((item: any) => {
    return {
      exampleSimpleInfo: {
        id: item.enterpriseId,
        enterpriseName: item.enterpriseName,
        enterpriseLogo: item.logo,
        projectName: item.projectName,
        images: item.exampleImagesList,
        designerId: item.designerId,
        designerName: item.designerName,
        projectDescription: item.projectDescription,
      },
      id: item.id,
    }
  })
  return (
    <div className={classes.container}>
      <div className={classes.tag}>
        <img src={require('@/assets/index/recommend-case.png')} alt="" />
      </div>
      <div className={classes.stoneList}>
        {newArr.map((item: any) => (
          <CaseItem key={item.id} item={item}></CaseItem>
        ))}
      </div>
    </div>
  )
}

export default CasePreview
