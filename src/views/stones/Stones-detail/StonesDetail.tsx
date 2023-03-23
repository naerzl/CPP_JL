import React from 'react'
import { useLocation } from 'react-router-dom'
const StonesDetail = () => {
  const loaction = useLocation()
  console.log(loaction)
  return <div>StonesDetail</div>
}

export default StonesDetail
