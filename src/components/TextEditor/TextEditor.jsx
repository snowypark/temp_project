import { css } from '@emotion/react';
import React, { useMemo } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
/** @jsxImportSource @emotion/react */

export const textEditorLayout = css`
    overflow-y: auto;
    margin-bottom: 20px;
`;
function TextEditor({ content, setContent }) {

    
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

    return (
        <div css={textEditorLayout}>
            <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                theme="snow"
                placeholder="내용을 입력해주세요."
                style={{ height: '500px', margin: "50px" }}
            />      
        </div>
    );
}

export default TextEditor;
