import request from "@/utils/request";

// 骨料社区--获取骨料列表
export const reqGetStoneList = (params: object) => {
    return request.get("/api/Stone/list", { params });
};