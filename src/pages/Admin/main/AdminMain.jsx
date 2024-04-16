import React from 'react';
import { Link } from 'react-router-dom';

function AdminMain(props) {

    return (
        <div>
            <Link to={"/management/user"}>회원관리</Link>        
            <Link to={"/management/comment"}>댓글 관리</Link>        
            <Link to={"/management/story"}>게시글 관리</Link>        
        </div>
    );
}

export default AdminMain;