import instance from "../utils/instance";

export const submitDonationData = async (data) => {
    return await instance.post("/main/test", data);
}

export const submitDonatorEditData = async (data) => {
    return await instance.put("/account/mypage/edit", data)
}
