import React, { useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Select from 'react-select';
import { buttonBox } from './style';
import { imgUrlBox } from './style';
import { getDonationListRequest, getDonationTagRequest } from '../../apis/api/DonationAPI';
import { useQuery } from 'react-query';
import MainPage from '../MainPage/MainPage';
import { Link } from 'react-router-dom';
import { errorSelector } from 'recoil';
import DonationWrite from './CategoryPage/DonationWrite';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const textEditorLayout = css`
    overflow-y: auto;
    margin-bottom: 20px;
`;

function DonationPageboard() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mainImg, setMainImg] = useState("");
    const [selectedMainTag, setSelectedMainTag] = useState(null);
    const [selectedSecondTag, setSelectedSecondTag] = useState(null);
    const [mainTagOptions, setMainTagOptions] = useState([]);
    const [secondTagOptions, setSecondTagOptions] = useState([]);
    const [createDate, setCreateDate] = useState(new Date()); // 현재 날짜로 초기화

    const [ storyImgs, setStoryImgs ] = useState([]);


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [projectDuration, setProjectDuration] = useState(null);

    const [ amount, setAmount ] = useState();
    const handleAmountChange = (e) => {
        const value = e.target.value; // 입력된 값
        const parsedValue = value ? parseInt(value) : null; // 입력된 값이 있는 경우에만 정수로 변환하고 그렇지 않으면 null로 설정
        setAmount(parsedValue); // 값 업데이트
    };
    

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

        axios.post('http://localhost:8080/main/write', {
            donationPageId: 1,
            teamId: null,
            mainCategoryId: selectedMainTag.value,
            pageCategoryId: 1,
            createDate: startDate,
            endDate: endDate,
            goalAmount : amount,
            storyTitle: title,
            storyContent: content,
            mainImgUrl: mainImg,
            donationTagId: selectedSecondTag ? selectedSecondTag.value : null,
            donationPageShow: null
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

            {/* <input 
                type={"date"} 
                placeholder={"프로젝트 시작일"} 
                selected={startDate} 
                onChange={handleStartDateChange} 
                selectsStart
                dateFormat="yyyy년 MM월 dd일"
            /> */}
            
            <div>기부 프로젝트 시작일: </div>
            <DatePicker 
                selected={startDate} 
                onChange={handleStartDateChange} 
                selectsStart
                dateFormat="yyyy년 MM월 dd일"
                // minDate={new Date()}
            />

            <div>기부 프로젝트 종료일: </div>
            <DatePicker
                selected={endDate}
                onChange={handleEndDateChange }
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                // minDate={startDate}
                dateFormat="yyyy년 MM월 dd일"
            />
            
            <div>
                <div>프로젝트 기간: {projectDuration !== null ? `${projectDuration}일` : ''}</div>       
            </div>
                            
            
            <Select
                options={mainTagOptions}
                value={selectedMainTag}
                placeholder="종류를 선택해주세요"
                onChange={handleMainTagChange}
            />

            {selectedMainTag && selectedMainTag.value === mainTagOptions[0].value && ( 
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
                
                <button>이미지 제거 </button>
            </div>

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
                < DonationWrite />

            </div>

            <div>
                목표 금액:
                <input 
                type="number"
                value={amount}
                onChange={handleAmountChange}
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

export default DonationPageboard;