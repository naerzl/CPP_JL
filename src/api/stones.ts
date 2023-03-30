import request from "@/utils/request";

// 骨料社区--获取骨料列表
export const reqGetStoneList = (params: object) => {
    return request.get("/api/Stone/list", { params });
};

// 骨料社区--获取骨料详情
export const reqGetStoneInfo = (id: number) => {
    return request.get(`/api/Stone/getstoneinfo?stoneId=${id}`);
};

// 获取骨料关联的企业
export const reqGetStoneBindEnterprises = (data: any) => request.post('/api/Stone/getstonesupplierpagelist', data)

// 获取企业关联的骨料
export const reqGetEnterprisePageList = (data: any) => {
    return request.post('/api/Stone/getenterprisebindstonepagelist', data)
}

/**
* @description: 收藏骨料
* @param {type} 
* @return: 
*/
export const reqCollection = (stoneId: any) => request.post(`/api/user/Collectible?stoneId=${stoneId}`,)


/**
 * 取消收藏 API
 * @returns 取消收藏
 */
export const reqCancelCollection = (stoneId: any) => request.put(`/api/user/Collectible?stoneId=${stoneId}`)
