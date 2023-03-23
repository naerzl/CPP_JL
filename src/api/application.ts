import request from "@/utils/request";

//  精品案例-获取精品案例列表
export const reqGetExampleList = (params: object) => {
    return request.get("/api/Example/list", { params });
};