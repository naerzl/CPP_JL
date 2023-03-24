import { reqGetEnterpriseById } from '@/api'
import { reqGetEnterpriseByIdInfo } from '@/api/enterprise'
import { Breadcrumb } from 'antd'
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import CasePreview from './case-preview/CasePreview'
import classes from './EnterpriseDetail.module.scss'
import ProductPreview from './product-preview/ProductPreview'
import StonePreview from './stone-preview/StonePreview'
const EnterpriseDetail = () => {
  const { state } = useLocation()
  const { id } = useParams()

  const [
    { enterprise, enterpriseProducts, enterpriseExamples, enterpriseStones },
    setEnterpriseInfo,
  ] = React.useState<any>({})
  const getEnterpriseData = React.useCallback(() => {
    reqGetEnterpriseByIdInfo(id as any).then((e) => {
      if (e.data.code === 200) {
        reqGetEnterpriseById(id as any).then((res) => {
          // res.data.data.profile,
          if (res.data.code === 200) {
            e.data.data.enterprise.profile = res.data.data.profile
            setEnterpriseInfo(e.data.data)
          }
        })
      }
    })
  }, [id])
  React.useEffect(() => {
    window.scrollTo(0, 0)
    getEnterpriseData()
  }, [getEnterpriseData])
  return (
    <div className={classes.main}>
      <div className="banxin">
        {/* 面包屑 */}
        {state && (
          <Breadcrumb
            separator=">"
            items={[
              {
                title: state?.fromname,
                href: state?.from,
              },
              {
                title: enterprise?.name,
              },
            ]}
          />
        )}
        <div className={classes.detail}>
          <div className={classes.left}>
            <h3>{enterprise?.name}</h3>
            <div className={classes.desc}>{enterprise?.profile}</div>
            <p className={classes.address}>{enterprise?.address}</p>
            <p className={classes.phone}>{enterprise?.phone}</p>
            <p className={classes.email}>{enterprise?.email}</p>
          </div>
          <div className={classes.right}>
            <img src={'https://' + enterprise?.advertisingMap} alt="" />
          </div>
        </div>
        {enterpriseProducts?.length > 0 && (
          <ProductPreview
            list={enterpriseProducts}
            fromname={enterprise?.name}
          ></ProductPreview>
        )}

        {enterpriseStones?.length > 0 && (
          <StonePreview
            list={enterpriseStones}
            fromname={enterprise?.name}
          ></StonePreview>
        )}
        {enterpriseExamples?.length > 0 && (
          <CasePreview
            list={enterpriseExamples}
            fromname={enterprise?.name}
          ></CasePreview>
        )}
      </div>
    </div>
  )
}

export default EnterpriseDetail
