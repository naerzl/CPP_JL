import request from "@/utils/request";
import * as AES from '@/utils/AES'

// 登录接口
export const reqLogin = (data: any) => request.post("/api/user/Account/login", data)

// 接口安全
export const reqApiCheck = () => {
    const _data = {
        "UserName": 'www.taiduoshi.com',
        "Password": '4f854d334ac711ed8e410242ac110003',
        "LocalTimeSpan": new Date().getTime()
    };
    const _dataobj = JSON.stringify(_data)
    const _dataStr = AES.encrypt(_dataobj)
    const _dataForm = {
        Data: _dataStr
    }

    return request.post('/api/OAuth/token', _dataForm)
}

// 获取数据字典
export const reqGetDictionariesData = (data: string[]) => request.post('/api/Advertise/getdictionarylistbytypecodes', data)


// 获取当前登录的账号信息
export const reqGetAccountInfo = () => request.get('/api/user/Account/info')

// 分页获取消息
export function reqGetPersonalMessagePageList(data: any) {
    return request.post('/api/user/Account/getpersonalmessagepagelist', data)
}

// 提交读取全部未读消息
export const reqPutReadAllMessage = () => {
    return request.post('/api/user/Account/putreadallmessage')
}

// 获取未读数据
export const reqGetPersonalNotreadcount = () => {
    return request.post('/api/user/Account/getpersonalnotreadcount')
}