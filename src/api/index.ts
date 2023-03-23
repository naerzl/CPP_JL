import request from "@/utils/request";

// 获取首页骨料广告列表
export const reqGetHomeStoneAdvList = () => {
    return request.post('/api/Advertise/gethomestonelist')
}

// 获取广告列表
export const reqGetHomeAdvertisingList = (params: object) => {
    return request.get("/api/Advertise", { params });
};

// 获取单个企业
export const reqGetEnterpriseById = (id: number) => {
    return request.get(`/api/Enterprise?id=${id}`);
};

// 获取企业列表
export const reqGetEnterpriseList = (params: object) => {
    return request.get("/api/Enterprise/list", { params });
};

// 获取骨料列表
export const reqGetStoneList = (params: object) => {
    return request.get("/api/Stone/list", { params });
};