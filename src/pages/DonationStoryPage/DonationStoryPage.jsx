/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import Progress from "../../components/progress/Progress";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { commentReqest, commentResponse, deleteDonationPage, getDonationNewsRequest, updatePageRequest, getDonationStoryRequest, getProgressAmount } from '../../apis/api/DonationAPI';
import DOMPurify from 'dompurify';
import LikeButton from '../../components/LikeButton/LikeButton';
import axios from 'axios';
import CommentSection from '../../pages/DonationStoryPage/CommentSection'; 
import NewsPage from './CategoryPage/NewsPage'; // NewsPage 경로 수정
import Story from './CategoryPage/Story'; // Story 경로 수정
import { shareKakao } from '../../apis/utils/shareKakaoLink';
import Donators from "./CategoryPage/Donators";

function DonationStoryPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page');
    const [donationPage, setDonationPage] = useState({});
    const [goalAmount, setGoalAmount] = useState(0);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [donationNewsPage, setDonationNewsPage] = useState({});
    const [commentList, setCommentList] = useState([]);
    const donationCommentId = queryParams.get('commentId')
    const [comment, setComment] = useState("");
    const [selectedTab, setSelectedTab] = useState('story'); // news, story 중 하나의 값을 가짐

    const getDonationStoryQuery = useQuery(
        ["getDonationPageQuery", donationPageId],
        async () => {
            const response = await getDonationStoryRequest({ page: donationPageId });
            return response.data;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                setDonationPage(data);
            }
        }
    );


    useEffect(() => {
        commentResponse({ params: { donationPageId } })
            .then(response => setCommentList(response.data))
            .catch(console.error);
    }, [donationPageId]);
    

    const { storyContent, storyTitle, mainImgUrl, createDate, endDate } = donationPage || {};

    const safeHTML = DOMPurify.sanitize(donationPage.storyContent);

    const deleteMutationButton = useMutation({
        mutationKey: "deleteMutationButton",
        mutationFn: deleteDonationPage,
        onSuccess: response => {
            alert("삭제완료")
            window.location.replace("/main");
        }
    })

    const handleDeleteButtonClick = () => {
        deleteMutationButton.mutate({ donationPageId: donationPageId });
    }

    const handleCommentChange = (e) => {
        const value = e.target.value;
        setComment(value);
    }

    const getamountQuery = useQuery(
        ["getamountQuery", donationPageId],
        async () => {
            return await getProgressAmount(donationPageId);
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: data => {
                console.log(data.data);
                setGoalAmount(data.data.goalAmount);
                setCurrentAmount(data.data.addAmount);
            },
        }
    )
    const calculateDaysRemaining = (startDate, endDate) => {
        const today = new Date();
        const startDateTime = new Date(startDate);
        const endDateTime = new Date(endDate);


        startDateTime.setHours(0, 0, 0, 0);

        const timeRemaining = Math.ceil((endDateTime - today) / (1000 * 60 * 60 * 24));
        if (timeRemaining <= 0) {
            return "종료";
        } else {
            return `${timeRemaining}일 남음`;
        }
    };

    const handleCommentSubmit = () => {

        axios.post("http://localhost:8080/comment/upload", {
            donationCommentId: null,
            commentText: comment,
            donationPageId: donationPageId,
            userId: null
        })
            .then(response => {
                alert("전송 완료")
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDonationStoryRequest({ page: donationPageId });
                setDonationPage(response.data);
            } catch (error) {
                console.error('Error fetching donation page:', error);
            }
        };
        fetchData();
    }, [donationPageId]);


    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    }
    const navigate = useNavigate();

    const handleNewsUpdateButton = () => {
    }


    // 카카오톡 공유 버튼 클릭 이벤트 핸들러 추가
const handleShareKakao = () => {
    const route = window.location.href; // 현재 페이지 URL
    const title = donationPage.storyTitle; // 기부 스토리 제목
    const THU = mainImgUrl;
    const content = "펀펀하게 펀딩하러 가기!"
    const page = donationPageId;

    shareKakao(route, title, THU, content, page);
  };
  
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);
    
    useEffect(() => {
        if (donationPage && donationPage.endDate) {
            const endDate = new Date(donationPage.endDate);
            const today = new Date();
            if (endDate < today) {
                setSelectedTab('news');
            }
        }
    }, [donationPage]);
    

    return (
        <>
            <div css={s.container}>
                <Link css={s.link} to={"/main"}>메인으로 </Link>
            </div>
            <div css={s.header}>
                <Link css={s.button1} to={`/main/donation/donationnews?page=${donationPageId}`}>후기 작성하기</Link>
                <Link css={s.button1} to={`/main/donation/news/update?page=${donationPageId}`}>후기수정하기</Link>
                <Link css={s.button2} to={`/main/donation/update?page=${donationPageId}`}>수정하기</Link>
                <button css={s.button3} onClick={handleDeleteButtonClick} >삭제하기</button>
            </div>
            <div css={s.storyHeader}>
                <h1>Donation Stories</h1>
                <p>page: {donationPageId}</p>
            </div>
            <div css={s.storyContent}>
                <div css={s.main}>
                    <img src={donationPage.mainImgUrl} alt="Story" css={s.storyImage} />
                    <div>
                        <h2 css={s.donationtitle}>{donationPage.storyTitle}</h2>
                        <div css={s.currentAmount}>{currentAmount}원</div>
                        <div css={s.goalAmount}>{donationPage.goalAmount}원 목표</div>
                        <button onClick={handleShareKakao}>카카오톡공유하기</button>
                        <Progress pageId={donationPageId} />
                        <div css={s.dates}>
                            <div css={s.dates2}>기부 시작일: {donationPage.createDate ? donationPage.createDate.substring(0, 10) : ''}</div>
                            <div css={s.dates3}>기부 종료일: {calculateDaysRemaining(donationPage.createDate, donationPage.endDate)}</div>
                            <div css={s.dates4}>●기부금은 100% 단체에 전달됩니다.</div>
                            <div css={s.likebutton}>
                                <Link css={s.donation} to={"/test"}>기부하기</Link>
                                <div css={s.likebutton1}>
                                    <LikeButton donationPageId={donationPageId} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div css={s.container2}>
                    <button css={s.button4} onClick={() => handleTabChange('story')}>Story</button>
                    <button css={s.button4} onClick={() => handleTabChange('donators')}>Donators</button>
                    <button css={s.button4} onClick={() => handleTabChange('news')}>news</button>
                    <div css={s.boxbox1}>
                        <div>
                            <h2>분리공간 </h2>
                            { selectedTab === 'story' ?
                            <Story />
                            :selectedTab === 'news' ? 
                            <NewsPage donationPageId={donationPageId} /> 
                            : <Donators donationPageId={donationPageId} />
                            }

                        </div>
                    </div>
                    <h3>덧글</h3>
                    <div css={s.commentBox}>
                        <div>
                            <CommentSection donationPageId={donationPageId} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default DonationStoryPage;