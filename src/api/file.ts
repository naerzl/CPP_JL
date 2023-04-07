
import request from "@/utils/request";

//? 文件上传接口
/**
 * 上传文件API
 * @returns 上传文件
 */
/* export const upload = (data: object) => {
  return request({
    url: "/api/user/File/upload",
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}; */

export const upload = (data: object) => {
  return request.post("/api/user/File/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
};