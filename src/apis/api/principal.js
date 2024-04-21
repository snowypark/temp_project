import instance from "../utils/instance"

// export const  getPrincipalRequest = async () => {
//     return await instance.get("/account/principal");
// }

export const  getPrincipalRequest = async () => {
    console.log("요놈?")
    return await instance.get("/account/principal");
}
