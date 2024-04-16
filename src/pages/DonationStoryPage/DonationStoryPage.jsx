
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import {Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { commentReqest, commentResponse, deleteDonationPage, getDonationNewsRequest, getDonationStoryRequest, updatePageRequest } from '../../apis/api/DonationAPI';
import DOMPurify from 'dompurify';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from 'axios';
import CommentSection from '../../pages/DonationStoryPage/CommentSection'; 
import NewsPage from './CategoryPage/NewsPage'; // NewsPage 경로 수정
import Story from './CategoryPage/Story'; // Story 경로 수정

function DonationStoryPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page'); 
    const[donationPage, setDonationPage] = useState({});
    const[donationNewsPage, setDonationNewsPage] = useState({});
    const [ commentList, setCommentList ] = useState([]);
    const donationCommentId = queryParams.get('commentId')

    const [comment, setComment ] = useState("");

    const [selectedTab, setSelectedTab] = useState('story'); // news, story 중 하나의 값을 가짐

    const getDonationStoryQuery = useQuery(
        ["getDonationPageQuery", donationPageId], 
        async () => {
            const response = await getDonationStoryRequest({ page: donationPageId });
            return response.data; 
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {setDonationPage(data);
            }
        }
    );

    
    useEffect(() => {
        axios.get(`http://localhost:8080/comment/getcomment/${donationPageId}`)
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

    const handleCommentSubmit = () => {

        axios.post("http://localhost:8080/comment/upload", {
            donationCommentId: null,
            commentText : comment,
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
    
    return (
        <>
            <div>                
             <Link to={"/main"}>메인으로 </Link>
                </div>
            
                <div>
                <button>
                <Link to={`/main/donation/donationnews?page=${donationPageId}`}>후기 작성하기</Link>
                    </button>
                <button> 
                    <Link to={`/main/donation/news/update?page=${donationPageId}`}>후기수정하기</Link>
                </button>
                <Link to={`/main/donation/update?page=${donationPageId}`}>수정하기</Link>                
                <button onClick={handleDeleteButtonClick} >삭제하기</button>
            </div>


            <div>
                <h1>Donation Stories</h1>
                <p>page:{donationPageId}</p>
            </div>

            <div>
                    <h2>{donationPage.storyTitle}</h2>
                    <img src={donationPage.mainImgUrl} alt="" />
                    <p>기부 시작일: {donationPage.createDate}</p>
                    <p>기부 종료일: {donationPage.endDate}</p>
                    <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
            </div>

            <button onClick={() => handleTabChange('news')}>news</button>
            <button onClick={() => handleTabChange('story')}>Story</button>


            <div css={s.boxbox1}>
                <div>
                    <h2>분리공간 </h2>

                {selectedTab === 'news' ? <NewsPage donationPageId={donationPageId} />: <Story />}
                </div>                
            </div>

                <h3>덧글</h3>
            <div css={s.commentBox}>

                <div>
                <CommentSection donationPageId={donationPageId}>
                    
                </CommentSection>
                </div>

                {/* <div>
                    <input 
                        type="text" 
                        value={comment}
                        onChange={handleCommentChange}
                    />
                    <p>{commentList.commentText}</p>
                    <button onClick={handleCommentSubmit}>덧글입력</button>
                </div> */}

            </div>

        </>
    
    )
}
export default DonationStoryPage;