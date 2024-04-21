import instance from "../utils/instance"

export const signinRequest = async (data) => {
    console.log(data);
    const response = await instance.post("/auth/signin", data);
    console.log(response);
    return response;
}