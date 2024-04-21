import instance from "../utils/instance";

export const postLike = async (data) => {
    return await instance.post("/like/post", data);
 }

export const getLike = async (params) => {
    return await instance.get("/like/get",{params});
}