import React, { useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Select from 'react-select';
import { buttonBox } from '../DonationPageBoard/style';
import { imgUrlBox } from '../DonationPageBoard/style';
import { useQuery } from 'react-query';
import MainPage from '../MainPage/MainPage';
import { Link } from 'react-router-dom';
import { errorSelector } from 'recoil';


const textEditorLayout = css`
    overflow-y: auto;
    margin-bottom: 20px;
`;

function ReviewPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mainImg, setMainImg] = useState("");
    const [selectedMainTag, setSelectedMainTag] = useState(null);
    const [selectedSecondTag, setSelectedSecondTag] = useState(null);
    const [mainTagOptions, setMainTagOptions] = useState([]);
    const [secondTagOptions, setSecondTagOptions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/main/storytypes")
            .then(response => {
                const options = response.data.map(mainTag => ({
                    value: mainTag.mainCategoryId,
                    label: mainTag.mainCategoryName
                }));
                setMainTagOptions(options);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/main/donationtag")
            .then(response => {
                const options = response.data.map(secondTag => ({
                    value: secondTag.donationTagId,
                    label: secondTag.donationTagName
                }));
                setSecondTagOptions(options);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleMainTagChange = (selectedOption) => {
        setSelectedMainTag(selectedOption);
    };

    const handleSecondTagChange = (selectedOption) => {
        setSelectedSecondTag(selectedOption);
    }

    const handleSubmitButton = () => {
        axios.post('http://localhost:8080/main/review', {
            donationPageId: 1,
            teamId: null,
            mainCategoryId: selectedMainTag.value,
            donationCategoryId: 1,
            createDate: null,
            endDate: null,
            storyTitle: title,
            storyContent: content,
            mainImgUrl: mainImg,
            donationTagId: selectedSecondTag.value,
            donationPageShow: null
        })
        .then(response => {
            alert("저장 성공");
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleCancelButton = () => {
        if (window.confirm("작성 중인 내용을 취소하시겠습니까?")) {
            setTitle("");
            setContent("");
            setMainImg("");
            alert("작성이 취소 되었습니다.");
        }
    };

    const handleHomeButton = () => {
        window.location.href = "/main";
    };

    const modules = useMemo(() => {
        return {  
            toolbar: [
                [{ font: [] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }, { background: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                ["link", "image"],
                ["clean"],
            ] ,


        };
    }, []);

    const formats = [
        "font", "size", "header", "color", "background", "bold", "italic", "underline",
        "strike", "blockquote", "list", "bullet", "indent", "link", "image", 
        
        
    ];

    const fileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setMainImg(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <div>
                <input type="text" placeholder='제목' value={title} onChange={(e) => setTitle(e.target.value)} />
                <h2>후기 작성 페이지</h2>
           </div>
            
            <Select
                options={mainTagOptions}
                value={selectedMainTag}
                placeholder="종류를 선택해주세요"
                onChange={handleMainTagChange}
            />

{selectedMainTag && selectedMainTag.value === mainTagOptions[0].value && ( // 주석 추가
                <Select 
                    options={secondTagOptions}
                    placeholder="기부 카테고리를 선택해주세요"
                    value={selectedSecondTag}
                    onChange={handleSecondTagChange}
                />
            )} 

            <div>
                <h2>메인 이미지 추가</h2>
                <div css={imgUrlBox}>
                    <label htmlFor="inputFile"></label>
                    <img src={mainImg} alt="Main" style={{ width: '300px', height: 'auto' }}/> 
                    <input  
                        id="inputFile" 
                        type="file" 
                        name="file" 
                        accept='image/*'
                        style={{ display: "block" }}
                        onChange={fileChange} 
                    /> 
                </div>
            </div>

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

            <div style={buttonBox}>
                <button onClick={handleSubmitButton}>작성완료</button>
                <button onClick={handleCancelButton}>취소</button>
                <button onClick={handleHomeButton}>돌아가기</button>
            </div>     
        </>
    );
}

export default ReviewPage;
