import React, { useCallback, useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { FiLogOut, FiUser } from "react-icons/fi";
import { FaHome } from "react-icons/fa";

import { useQueryClient } from 'react-query';
import instance from '../../apis/utils/instance';

function RootHeader(props) {
    const [isLogin, setLogin] = useState(false);
    const queryClient = useQueryClient();
    // const principal = queryClient.getQueryData("principalQuery");
    const principalState = queryClient.getQueryState("principalQuery");
    const [ isAdmin, setIsAdmin ] = useState();
    useEffect(() => {
        setLogin(() => principalState.status === "success");
        setIsAdmin(() => !!principalState?.data?.data.authorities.filter(authority => authority.authority === "ROLE_ADMIN")[0])
    },[principalState.status])
    
    const handleOpenMenuClick = (e) => {
        e.stopPropagation();
    }
    const handleLogoutClick = () => {
        localStorage.removeItem("AccessToken");
        instance.interceptors.request.use((config) => {
            config.headers.Authorization = null;
            return config;
        });
        queryClient.refetchQueries("principalQuery");   
        window.location.replace("/auth/signin");
    }
    return (
        <div css={s.header}>
            <Link css={s.account} to={"/"}>
                <FaHome />
            </Link>
            {isAdmin ? <Link to={"/admin/main"}> 관리자 </Link> : null}
            <div css={s.mainbox}>
                <Link to={"/main"} > 기부하기 </Link>
            </div>
            <Link to={"/main/donations/challenge"}>챌린지</Link>
            {
                !isLogin ? 
                <Link css={s.account} to={"/auth/signin"}>
                    <FiUser />
                </Link>
                : <div css={s.accountItems}>
                    <button css={s.logout} onClick={handleLogoutClick}>
                        <FiLogOut />
                    </button> 
                <Link css={s.account} to={"/account/mypage"}>
                    <FiUser />
                </Link>
                </div> 
            }
            
        </div>
    );
}

export default RootHeader;