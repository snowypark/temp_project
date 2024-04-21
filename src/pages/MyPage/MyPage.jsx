/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { getTeamListRequest } from "../../apis/api/teamApi";
import { useState } from "react";
import { deleteCommentRequest } from "../../apis/api/Admin";
import { deleteUserRequest } from "../../apis/api/SignUp";
import instance from "../../apis/utils/instance";
function MyPage(props) {
    const [ temaList, setTeamList ] = useState([]);
    const queryClient = useQueryClient();
    
    const principalData = queryClient.getQueryData("principalQuery");
    const getTeamListQuery = useQuery(
        [ "getTeamListQuery", principalData?.data ],
        async () => {
            return await getTeamListRequest({
                userId: principalData?.data.userId
            })
        },
        {
            refetchOnWindowFocus: false,
            // enabled: principalData?.data !== undefined,
            onSuccess: response => {
                setTeamList(() => response?.data);
            },
        }
    );  
    const deleteUserMutation = useMutation({
        mutationKey: "deleteUserMutation",
        mutationFn: deleteUserRequest,
        onSuccess: response => {
            console.log("MyPage: "+response);
            alert("삭제완료.");
        },
        onError: error => {}
    })          
    const handleUserDeleteOnClick = () => {
        if(!window.confirm("사용자가 리더인 팀은 해산되게 됩니다.\n회원탈퇴를 하시겠습니까?")) {
            return
        }
        deleteUserMutation.mutate(principalData.data.userId)
        localStorage.removeItem("AccessToken");
        instance.interceptors.request.use((config) => {
            config.headers.Authorization = null;
            return config;
        });
        queryClient.refetchQueries("principalQuery");   
        window.location.replace("/auth/signin");
    }            

    return (
        <>
        {
            <div css={s.layout}>
                <div css={s.header}>
                    <div css={s.imgBox}>
                        <div css={s.propfileImg}>
                            <img src={principalData?.data.img} alt="" />
                        </div>
                    </div>
                    <div css={s.infoBox}>
                        <div css={s.infoText}>이름: {!!principalData?.data.name ? principalData?.data.name : "회원정보를 업데이트 해주세요"}</div>
                        <div css={s.infoText}>전화번호: {principalData?.data.phoneNumber}</div>
                        <div css={s.infoText}>이메일: {principalData?.data.email}</div>
                        <div css={s.infoText}>성별: {principalData?.data.gender}</div>
                        <div css={s.infoText}>나이: {principalData?.data.age}</div>
                    </div>
                </div>
                <Link to={"/message"}>메세지 확인</Link>
                <button onClick={handleUserDeleteOnClick}>회원탈퇴</button>
                <div>
                    {temaList.map(team => {
                        return <>
                        <div key={team.teamId}>
                            <div>{team.teamName}</div>
                            <Link to={`/team/info?id=${team.teamId}`}>
                                <img src={team.teamLogoImgUrl} alt=""/>
                            </Link>
                        </div>
                        </>
                    })}
                    <Link to={"/team/write"}> 팀 만들기</Link>
                    <Link to={"/account/mypage/edit"}>회원 정보 수정</Link>
                </div>
            </div>
        }
        </>
    )
}

export default MyPage;