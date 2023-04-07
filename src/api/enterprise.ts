import request from "@/utils/request";

// 企业社区--获取企业列表
export const reqGetEnterpriseList = (params: object) => {
    return request.get("/api/Enterprise/list", { params });
};

// 根据id获取企业详情
export const reqGetEnterpriseByIdInfo = (id: number) => {
    return request.get(`/api/Enterprise/getenterpriseinfo?id=${id}`);
};

// 获取企业更多成品
export const reqGetEnterpriseProductList = (params: object) => {
    console.log(params)
    return request.get('/api/Enterprise/getenterpriseproductlist', { params });
};

// 新版申请入驻 
export const reqPutApplyFor = (data: any) => {
    return request.post('/api/user/Enterprise/putapplyfor', data)
}