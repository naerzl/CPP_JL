import StonesItem from '@/views/stones/components/stones-item/StonesItem'
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import classes from './ProductPreview.module.scss'
const ProductPreview = (props: any) => {
  const nav = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const { list } = props
  const newArr = list.map((item: any) => ({
    id: item.id,
    name: item.productName,
    terrazzoImage: [item.productImage.replace('https://', '')],
  }))
  const handleGoMoreProduct = React.useCallback(() => {
    nav('/home/more-product', { state: { ...location.state, id } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={classes.container}>
      <div className={classes.tag}>
        <img src={require('@/assets/enterprise/product.png')} alt="" />
        <img
          src={require('@/assets/enterprise/more-product.png')}
          alt=""
          style={{ cursor: 'pointer' }}
          onClick={handleGoMoreProduct}
        />
      </div>
      <div className={classes.stoneList}>
        {newArr.map((item: any) => (
          <StonesItem key={item.id} item={item}></StonesItem>
        ))}
      </div>
    </div>
  )
}

export default React.memo(ProductPreview)
