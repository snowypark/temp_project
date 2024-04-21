import React, { useEffect } from 'react';
import AdminMain from '../main/AdminMain';
import UserManagement from '../userManagement/UserManagement'
import CommentManagement from '../commentManagement/CommentManagement';
import StoryManagement from '../storyManagement/StoryManagement';
import { Route, Routes } from 'react-router-dom';
import UserInfo from '../userInfo/UserInfo';
import TeamManagement from '../TeamManagement/TeamManagement';
import { useQueryClient } from 'react-query';

function AdminRoute(props) {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");

    useEffect(() => {
        if(!!principalData) {

            if(!principalData?.data.authorities.filter(authority => authority.authority === "ROLE_ADMIN")[0]) {
                alert("잘못된 접근입니다.");
                window.location.replace("/");
            }
        }
    }, [principalData]);
    return (
        <div>
            <Routes>
                <Route path='/main' element={ <AdminMain /> }/>
                <Route path='/management/user' element={ <UserManagement /> }/>
                <Route path='/user' element={ <UserInfo /> }/>
                <Route path='/management/comment' element={ <CommentManagement /> }/>
                <Route path='/management/team' element={ <TeamManagement /> }/>
                <Route path='/management/story' element={ <StoryManagement /> }/>
            </Routes>
        </div>
    );
}

export default AdminRoute;