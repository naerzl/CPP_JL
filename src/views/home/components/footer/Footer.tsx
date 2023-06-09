import React from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './Footer.module.scss'

const Footer = () => {
  const nav = useNavigate()
  return (
    <div className={classes.footerContainer}>
      <div
        className="banxin"
        style={{ display: 'flex', padding: '60px 0 40px' }}
      >
        <div className={classes.left}>
          <div className={classes.footer_logo}>
            <img
              src={require('@/assets/home/footer_logo.png')}
              alt=""
              className="ofc"
            />
          </div>
          <div className={classes.company_name}>厦门太多石信息科技有限公司</div>
          <div className={classes.description}>联系方式：0592-88886666</div>
          <div className={classes.description}>
            企业地址：福建省厦门市湖里区创新创业园伟业楼S303
          </div>
          <div className={classes.title}>
            <span>厦门爱德仕信息科技有限公司</span>
            <span>提供技术支持</span>
          </div>
        </div>
        <div className={classes.right}>
          <dl>
            <dt>产品</dt>
            <dd onClick={() => window.open(process.env.REACT_APP_JICAI_URL)}>
              TDS设计系统
            </dd>
            <dd onClick={() => nav('/home/index')}>太多石网站</dd>
          </dl>

          <dl>
            <dt>教程</dt>
            <dd onClick={() => nav('/home/TDScourse')}>查看帮助</dd>
          </dl>
          <dl>
            <dt>法律条款</dt>
            <dd onClick={() => nav('/home/argeement')}>用户服务协议</dd>
            <dd onClick={() => nav('/home/argeement/company-argeement')}>
              企业使用协议
            </dd>
            <dd onClick={() => nav('/home/argeement/vip-argeement')}>
              平台会员协议
            </dd>
            <dd onClick={() => nav('/home/argeement/privacy-argeement')}>
              用户隐私协议
            </dd>
          </dl>
          <dl>
            <dt>平台合作</dt>
            <dd>企业入驻</dd>
            <dd>商务合作</dd>
          </dl>
          <dl>
            <dt>联系我们</dt>
            <dd>联系方式</dd>
          </dl>
        </div>
      </div>
      <div className={classes.records}>
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">
          闽ICP备2022012112号-1
        </a>
      </div>
    </div>
  )
}

export default Footer
