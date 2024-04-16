import React, { useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Select from 'react-select';
import { buttonBox } from './style';
import { imgUrlBox } from './style';
import { useQuery } from 'react-query';
import { Link, useLocation } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

const textEditorLayout = css`
    overflow-y: auto;
    margin-bottom: 20px;
`;

function NewsWrite() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mainImg, setMainImg] = useState("");
    const [selectedMainTag, setSelectedMainTag] = useState(null);
    const [selectedSecondTag, setSelectedSecondTag] = useState(null);
    const [mainTagOptions, setMainTagOptions] = useState([]);
    const [secondTagOptions, setSecondTagOptions] = useState([]);
    const [createDate, setCreateDate] = useState(new Date()); // 현재 날짜로 초기화
    const [donationData, setDonationData] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [goalAmount, setgoalAmount] = useState(0);
    const [ pageCategoryId, setPageCategoryId] = useState(null);
    const [ storyImgs, setStoryImgs ] = useState([]);
    const [projectDuration, setProjectDuration] = useState(null);
    const [ donationNewsPageId, setDonationNewsPageId ] = useState("");

    const [ amount, setAmount ] = useState();

    const handleAmountChange = (e) => {
        const value = e.target.value; // 입력된 값
        const parsedValue = value ? parseInt(value) : null;
        setAmount(parsedValue); 
    };
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page');    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/main/donation/update/${donationPageId}`);
                const data = response.data;
                setDonationData(data);
                setTitle(data.storyTitle);
                setMainImg(data.mainImgUrl);
                setStartDate(new Date(data.createDate));
                setEndDate(new Date(data.endDate));
                console.log(selectedMainTag);
                console.log(setContent);                
                setgoalAmount(data.goalAmount !== null ? data.goalAmount : 0);
                console.log(data);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData(); 
    }, [donationPageId]);
    

    console.log("content: " + content)
    const handleSubmitButton = () => {

        axios.post('http://localhost:8080/main/donation/donationnews', {
            donationNewsPageId: 0,
            donationPageId: donationPageId,
            pageCategoryId: 3,
            newsContent: content,
            userId: null
        })
        .then(response => {
            alert("저장 성공");
            console.log(response)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleCancelButton = () => {
        if (window.confirm("작성 중인 내용을 취소하시겠습니까?")) {
            setContent("");
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
                ["link"],
                ["clean"],
            ]
        };
    }, []);

    const formats = [
        "font", "size", "header", "color", "background", "bold", "italic", "underline",
        "strike", "blockquote", "list", "bullet", "indent", "link", "image"
    ];

    const fileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setMainImg(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const fileChange2 = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setStoryImgs(reader.result);
        };
        reader.readAsDataURL(file);
    };


  
    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (endDate) {
            const duration = Math.round((endDate - date) / (1000 * 60 * 60 * 24));
            setProjectDuration(duration);
        }
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        if (startDate) {
            const duration = Math.round((date - startDate) / (1000 * 60 * 60 * 24));
            setProjectDuration(duration);
        }
    };


    return (
        <>
            <div>
                <input type="text" placeholder='제목' value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <h2>후기</h2>
            
            <div>
                <h2>이미지 추가</h2>
                <img src={storyImgs} alt="Main" style={{ width: '300px', height: 'auto' }}/> 
                <input  
                        id="inputFile" 
                        type="file" 
                        name="file" 
                        accept='image/*'
                        style={{ display: "block" }}
                        onChange={fileChange2} 
                    /> 
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

export default NewsWrite;