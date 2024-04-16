import instance from "../utils/instance"

export const registerTeam = async (data) => {
    return await instance.post("/team/register", data);
}

export const getTeamListRequest = async (params) => {
    return await instance.get("/account/teams", {params});
}
export const getTeamInfoRequest = async (params) => {
    return await instance.get("/team/info", {params});
}
/**
 * 
 * post 요청(주소, 데이터(객체=>Json화), {headers:{}, config})
 * get  요청(주소, {headers:{}, params:{key: value}}) --객체를 params안에 넣어서 제공하는 편
 * delete요청(주소,{headers:{}, data: {key: value}}) --객체를 data안에 넣어서 제공하는 편
 */