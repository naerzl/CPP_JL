import React from 'react'
import RecommendCase from './components/recommend-case/RecommendCase'
import RecommendCompany from './components/recommend-company/RecommendCompany'
import RecommendStone from './components/recommend-stone/RecommendStone'
import SwiperIndex from './components/SwiperIndex'
import TdsIndex from './components/TdsIndex'

const Index = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <div className="indexbox" style={{ marginTop: '64px' }}>
      {/*  */}
      <SwiperIndex></SwiperIndex>
      <div className="banxin">
        <TdsIndex></TdsIndex>
        <RecommendStone></RecommendStone>
        <RecommendCompany></RecommendCompany>
        <RecommendCase></RecommendCase>
      </div>
    </div>
  )
}

export default Index
