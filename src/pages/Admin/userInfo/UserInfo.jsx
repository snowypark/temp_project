/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUserInfoRequest, postUserRoleRequest } from '../../../apis/api/Admin';
import { useMutation, useQuery } from 'react-query';
import CommentManagement from "../commentManagement/CommentManagement";

function UserInfo(props) {
    const [ searchParams ] = useSearchParams();
    const userId = searchParams.get("id");
    const [ findUser, setFindUser ] = useState();
    const getUserInfoQuery = useQuery(
        [ "getUserInfoQuery" ],
        async () => {
            return await getUserInfoRequest({
                userId: userId
            })
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setFindUser(() => response.data);
            },
        }
    );        
    console.log(findUser);  
    const addUserRoleMutation = useMutation({
        mutationKey: "addUserRoleMutation",
        mutationFn: postUserRoleRequest,
        onSuccess: response => {
            console.log(response);
            alert("등록완료.");
        },
        onError: error => {}
    }) 
    const handleAdminRoleClick = (roleId) => {
        addUserRoleMutation.mutate({ userId: findUser.userId, roleId: roleId})
    }
    return (
        <div css={s.layout}>
                <div css={s.header}>
                    <div css={s.imgBox}>
                        <div css={s.propfileImg}>
                            <img src={findUser?.profileImg} alt="" />
                        </div>
                    </div>
                    <div css={s.infoBox}>
                        <div css={s.infoText}>아이디: {findUser?.username}</div>
                        <div css={s.infoText}>이름: {findUser?.name}</div>
                        <div css={s.infoText}>전화번호: {findUser?.phoneNumber}</div>
                        <div css={s.infoText}>이메일: {findUser?.email}</div>
                        <div css={s.infoText}>성별: {findUser?.gender}</div>
                        <div css={s.infoText}>나이: {findUser?.age}</div>
                    </div>
                    <div>
                        {findUser?.role.roleId < 3 
                        ? <button onClick={() => handleAdminRoleClick(3)}> 관리자 권한 부여 </button>
                        : null}
                        <button onClick={() => handleAdminRoleClick(5)}>사용 권한 제제</button>
                    </div>
                </div>
                    <div><CommentManagement userId={findUser?.userId}/> </div>
            </div>
    );
}

export default UserInfo;