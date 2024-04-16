import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NonePage from './NonePage';
/** @jsxImportSource @emotion/react */

function NewsPage({donationPageId}) {
    const [content, setContent] = useState(null); // 초기 상태를 null로 설정
    
    useEffect(() => {
        axios.get(`http://localhost:8080/main/donation/news/${donationPageId}`)
            .then(response => {
                // 데이터가 비어 있는 경우를 처리
                if (!response.data || Object.keys(response.data).length === 0) {
                    setContent(null); // 데이터가 비어있으면 null 설정
                } else {
                    setContent(response.data); // 데이터가 있으면 상태 업데이트
                }
            })
            .catch(console.error);
    }, [donationPageId]);

    return (
        <div>
            NewsPage
            <div> 
                {content ? (
                    <div>{content.newsContent}</div> // 뉴스 컨텐츠 표시
                ) : (
                    <NonePage />
                )}
            </div>
        </div>
    );
}

export default NewsPage;
