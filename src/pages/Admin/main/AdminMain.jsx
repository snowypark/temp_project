import React from 'react';
import { Link } from 'react-router-dom';

function AdminMain(props) {

    return (
        <div>
            <Link to={"/admin/management/user"}>회원관리</Link>        
            <Link to={"/admin/management/team"}>팀 관리</Link>        
            <Link to={"/admin/management/story"}>게시글 관리</Link>        
        </div>
    );
}

export default AdminMain;