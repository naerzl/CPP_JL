import CryptoJS from 'crypto-js'
import { reqApiCheck } from '@/api/user'
import store from '@/store'
import { setAuthorizaion } from '@/store/modules/login'
//密钥与偏移量从配置中获取
//密钥--配置到配置文件
const _aeskey = 'a14fb716609411edb3880242ac11000d'
//偏移量-配置到配置文件
const _aesiv = 'iv.taiduoshi.com'

export function decrypt(data: string) {
  const key = CryptoJS.enc.Utf8.parse(_aeskey)
  const iv = CryptoJS.enc.Utf8.parse(_aesiv)
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data)
  data = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8)
  return decrypt
}

// 加密
export function encrypt(data: string) {
  const key = CryptoJS.enc.Utf8.parse(_aeskey)
  const iv = CryptoJS.enc.Utf8.parse(_aesiv)
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.ciphertext.toString()
}

let timer = -1
export const getOAuthToken = async () => {
  console.log(456)
  timer !== -1 && clearTimeout(timer)
  const r = await reqApiCheck()
  store.dispatch(setAuthorizaion(r.data.data))
  const time = new Date(r.data.data.expiresTime).getTime() - Date.now() - 15 * 60 * 1000
  timer = window.setTimeout(() => {
    getOAuthToken()
  }, time)
  return r
}
