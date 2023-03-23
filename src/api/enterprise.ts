import request from "@/utils/request";

// 企业社区--获取企业列表
export const reqGetEnterpriseList = (params: object) => {
    return request.get("/api/Enterprise/list", { params });
};