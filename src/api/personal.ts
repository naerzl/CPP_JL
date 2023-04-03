import request from "@/utils/request";

// 获取收藏列表
export const reqGetCollectionList = (params: object) => request("/api/user/Collectible/list", { params })

// 获取编辑用户信息的验证码
export const reqGetEditUserInfoVerifyCode = (params: { phone: string }) => request.get('/api/user/Account/verify/edit', { params })

// 修改用户个人信息
export const reqPutUserInfo = (data: any) => request.put('/api/user/Account', data)

// 注销账号
export const reqPutCancellAccount = () => request.post('/api/user/Account/putcancelledaccount')
