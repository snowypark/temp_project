import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import { useLocation } from 'react-router-dom';
import NonePage from './NonePage';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import 'react-quill/dist/quill.snow.css';

const textEditorLayout = css`
    overflow-y: auto;
    margin-bottom: 20px;
`;

function NewsUpdatePage({donationPageId}) {
    const [content, setContent] = useState(''); // 초기 상태를 null로 설정
    
    const modules = useMemo(() => {
        return {
            toolbar: [
                [{ font: [] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }, { background: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                ["link"],
                ["clean"],
            ]
        };
    }, []);

    const formats = [
        "font", "size", "header", "color", "background", "bold", "italic", "underline",
        "strike", "blockquote", "list", "bullet", "indent", "link", "image"
    ];

    useEffect(() => {
        axios.get(`http://localhost:8080/main/donation/news/update/${donationPageId}`)
            .then(response => {
                // 데이터가 비어 있는 경우를 처리
                if (!response.data || Object.keys(response.data).length === 0) {
                    setContent(null); // 데이터가 비어있으면 null 설정
                } else {
                    setContent(response.data.newsContent);
                }
            })
            .catch(console.error);
    }, [donationPageId]);

    const handleContentChange = (value) => { // 변경된 부분: 내용이 변경될 때 호출되는 함수
        setContent(value);
    };
    return (
        <div>
            NewsPage
            <div> 

                <div css={textEditorLayout}>
                <ReactQuill
                    value={content.newsContent}
                    onChange={handleContentChange}
                    modules={modules}
                    formats={formats}
                    theme="snow"
                    style={{ height: '500px', margin: "50px" }}
                />

            </div>
            </div>
        </div>
    );
}

export default NewsUpdatePage;
