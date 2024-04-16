import instance from "../utils/instance"

export const getUserListRequest = async () => { 
    return await instance.get("/admin/user");
}