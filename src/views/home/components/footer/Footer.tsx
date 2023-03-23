import React from 'react'
import classes from './Footer.module.scss'

const Footer = () => {
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
            <dd>TDS设计系统</dd>
            <dd>太多石网站</dd>
          </dl>

          <dl>
            <dt>教程</dt>
            <dd>查看帮助</dd>
          </dl>
          <dl>
            <dt>法律条款</dt>
            <dd>用户服务协议</dd>
            <dd>企业使用协议</dd>
            <dd>平台会员协议</dd>
            <dd>用户隐私协议</dd>
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
