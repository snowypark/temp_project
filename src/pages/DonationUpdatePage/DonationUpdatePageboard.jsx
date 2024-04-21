import React, { useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Select from 'react-select';
import { buttonBox } from '../DonationPageBoard/style';
import { imgUrlBox } from '../DonationPageBoard/style';
import { deleteDonationPage, getDonationListRequest, getDonationTagRequest } from '../../apis/api/DonationAPI';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import MainPage from '../MainPage/MainPage';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { errorSelector } from 'recoil';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getPrincipalRequest } from '../../apis/api/principal';
import { getTeamListRequest } from '../../apis/api/teamApi';

const textEditorLayout = css`
    overflow-y: auto;
    margin-bottom: 20px;
`;

function DonationUpdatePageBoard() {
   
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page'); 
    const [donationData, setDonationData] = useState();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [mainImg, setMainImg] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [goalAmount, setgoalAmount] = useState(0);
    const [selectedMainTag, setSelectedMainTag] = useState(null);
    const [selectedSecondTag, setSelectedSecondTag] = useState(null);   
    const [ pageCategoryId, setPageCategoryId] = useState(null);

    const [userId, setUserId ] = useState();
    const [ teamId, setTeamId ] = useState();
    const [mainTagOptions, setMainTagOptions] = useState([]);
    
    const [teams, setTeams] = useState([]);
    const [ storyImgs, setStoryImgs ] = useState([]);

    const [secondTagOptions, setSecondTagOptions] = useState([]);

    const [selectedTeam, setSelectedTeam] = useState(null);

    const handleAmountChange = (e) => {
        const value = e.target.value; // 입력된 값
        const parsedValue = value ? parseInt(value) : null; // 입력된 값이 있는 경우에만 정수로 변환하고 그렇지 않으면 null로 설정
        setgoalAmount(parsedValue); // 값 업데이트
    };

    const principalQuery = useQuery(
        ["principalQuery"], 
        getPrincipalRequest,
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                console.log("Auth", response.data);
                setUserId(response.data.userId); // 예제로 userId 설정
            },
            onError: (error) => {
                console.error("Authentication error", error);
            }
        }
    );
    const [ teamInfo, setTeamInfo ] = useState();
    const [ temaList, setTeamList ] = useState([]);    
    const queryClient = useQueryClient();    
    const principalData = queryClient.getQueryData("principalQuery");
    useEffect(() => {
        if (selectedTeam) {
            setTeamId(selectedTeam.value);
        }
    }, [selectedTeam]);


    useEffect(() => {
        if (userId) {
            const fetchTeams = async () => {
                try {
                    const response = await getTeamListRequest({ userId });
                    if (response.status === 200) {
                        const formattedTeams = response.data.map(team => ({
                            value: team.teamId,
                            label: team.teamName
                        }));
                        setTeams(formattedTeams);
                    }
                } catch (error) {
                    console.error('Failed to fetch teams', error);
                }
            };

            fetchTeams();
        }
    }, [userId]);

    useEffect(() => {
        axios.get("http://localhost:8080/main/storytypes")
        .then(response => {
            const options = response.data.map(mainTag => ({
                value: mainTag.mainCategoryId,
                label: mainTag.mainCategoryName
            }));
            setMainTagOptions(options);
            setSelectedMainTag(options.filter(option => option.value === donationData.mainCategoryId)[0]);
        })
        .catch(error => {
            console.error(error);
        });
        
        axios.get("http://localhost:8080/main/donationtag")
        .then(response => {
            const options = response.data.map(secondTag => ({
                value: secondTag.donationTagId,
                label: secondTag.donationTagName
            }));
            setSecondTagOptions(options);
            setSelectedSecondTag(options.filter(option => option.value === donationData.donationTagId)[0]);
            // setSelectedSecondTag();
        })
        .catch(error => {
            console.error(error);
        });

        
        
        
    }, [donationData]);

    
    useEffect(() => {
        console.log(selectedMainTag);
        console.log(selectedSecondTag);
    }, [selectedMainTag, selectedSecondTag]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/main/donation/update/${donationPageId}`);
                const data = response.data;
    
                // API 응답이 비어있는 경우에 대한 처리
                if (!data) {
                    console.error("API 응답이 비어있습니다.");
                    return;
                }
    
                // donationData 설정
                setDonationData(data);
                setTeamId(data.teamId)
                setTitle(data.storyTitle);
                setContent(data.storyContent);
                setMainImg(data.mainImgUrl);
                setStartDate(new Date(data.createDate));
                setEndDate(new Date(data.endDate));
                setgoalAmount(data.goalAmount !== null ? data.goalAmount : 0);
    
                console.log(selectedMainTag);
                console.log(selectedSecondTag);
    
                console.log(data);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData(); 
    }, [donationPageId]);
    

    const handleSubmitButton = () => {

        axios.put(`http://localhost:8080/main/donation/update/${donationPageId}`, {
            donationPageId: donationPageId,
            teamId: teamId,
            mainCategoryId: selectedMainTag.value,
            pageCategoryId: 1,
            createDate: startDate,
            endDate: endDate,
            goalAmount : goalAmount,
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


    
    const handleMainTagChange = (selectedOption) => {
        setSelectedMainTag(selectedOption);
        console.log(handleMainTagChange)
    };

    const handleSecondTagChange = (selectedOption) => {
        console.log("!!!!", selectedOption)
        setSelectedSecondTag(selectedOption);
    }

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

    const handleCancelButton = () => {
        if (window.confirm("작성 중인 내용을 취소하시겠습니까?")) {
            setTitle("");
            setgoalAmount(0);
            setContent("");
            setMainImg("");
            alert("작성이 취소 되었습니다.");
        }
    };

    const handleHomeButton = () => {
        window.location.href = "/main";
    };


    //삭제버튼
    


    return (
        <>
            <div>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>기부 프로젝트 시작일: </div>
            <DatePicker 
                selected={startDate} 
                onChange={date => setStartDate(date)} 
                selectsStart
                dateFormat="yyyy년 MM월 dd일"
                // minDate={new Date()}
            />

            <div>기부 프로젝트 종료일: </div>
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    // minDate={startDate}
                    dateFormat="yyyy년 MM월 dd일"
                />

            <div>
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


            <Select
                options={mainTagOptions}
                defaultValue={selectedMainTag}
                value={selectedMainTag}
                placeholder="종류를 선택해주세요"
                onChange={handleMainTagChange}
            />

            <Select 
                options={secondTagOptions}
                placeholder="기부 카테고리를 선택해주세요"
                value={selectedSecondTag}
                onChange={handleSecondTagChange}
                defaultValue={selectedSecondTag}
            />

            
            <div>
            <div>목표 금액: {goalAmount !== null && goalAmount}</div>

                <input type="number" 
                    value={goalAmount !== null ? goalAmount : ''} 
                    onChange={(e) => handleAmountChange(e)} 
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

            <div>
                <button onClick={handleSubmitButton}>수정 완료</button>
                <button onClick={handleCancelButton}>취소</button>
                <button onClick={handleHomeButton}>돌아가기</button>
            </div>
        </>
    );
}

export default DonationUpdatePageBoard;