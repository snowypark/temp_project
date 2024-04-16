/** @jsxImportSource @emotion/react */
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as s from "./style";
import { Link, useNavigate } from "react-router-dom";
import { getTeamListRequest } from "../../apis/api/teamApi";
import { useState } from "react";
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
                        <div css={s.infoText}>사용자이름: {principalData?.data.username}</div>
                        <div css={s.infoText}>이름: {principalData?.data.name}</div>
                        <div css={s.infoText}>전화번호: {principalData?.data.phoneNumber}</div>
                        <div css={s.infoText}>이메일: {principalData?.data.email}</div>
                        <div css={s.infoText}>성별: {principalData?.data.gender}</div>
                        <div css={s.infoText}>나이: {principalData?.data.age}</div>
                    </div>
                </div>
                <div>
                    {temaList.map(team => {
                        return <>
                            <div>{team.teamName}</div>
                            <Link to={`/team/info?id=${team.teamId}`}>
                                <img src={team.teamLogoImgUrl} alt=""/>
                            </Link>
                        </>
                    })}
                    <Link to={"/account/create/team"}> 팀 만들기</Link>
                    <Link to={"/account/infoedit"}>회원 정보 수정</Link>
                </div>
            </div>
        }
        </>
    )
}

export default MyPage;