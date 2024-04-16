
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import {Link, useLocation, useParams } from 'react-router-dom';
import { commentReqest, commentResponse, deleteDonationPage, getChallengeRequest, getDonationStoryRequest, updatePageRequest } from '../../apis/api/DonationAPI';
import DOMPurify from 'dompurify';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from 'axios';
import CommentSection from '../DonationStoryPage/CommentSection'; 
import { FcLike } from "react-icons/fc";

function DonationStoryPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page'); 
    const[donationPage, setDonationPage] = useState({});
    const [ challengePage, setChallegePage ] = useState({});
    const [ commentList, setCommentList ] = useState([]);
    const donationCommentId = queryParams.get('commentId')

    const [comment, setComment ] = useState("");

    const getDonationChallengeQuery = useQuery(
        ["getDonationChallengeQuery", donationPageId], 
        async () => {
            const response = await getChallengeRequest({ page: donationPageId });
            return response.data; 
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {setChallegePage(data);
            }
        }
    );


    useEffect(() => {
        axios.get(`http://localhost:8080/comment/getcomment/${donationPageId}`)
            .then(response => setCommentList(response.data))
            .catch(console.error);
    }, [donationPageId]);
    

    


    const { storyContent, storyTitle, mainImgUrl, createDate, endDate } = challengePage || {};

    const safeHTML = DOMPurify.sanitize(challengePage.storyContent);
    
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
                const response = await getChallengeRequest({ page: donationPageId });
                setChallegePage(response.data);
            } catch (error) {
                console.error('Error fetching donation page:', error);
            }
        };
        fetchData();
    }, [donationPageId]);

    
    return (
        <>
            <div>                
             <Link to={"/main"}>메인으로 </Link>
                </div>
            
                <div>
                <Link to={`/main/donation/update?page=${donationPageId}`}>수정하기</Link>                
                <button onClick={handleDeleteButtonClick} >삭제하기</button>
            </div>


            <div>
                <h1>Donation Stories</h1>
                <p>page:{donationPageId}</p>
            </div>

            <div>
                    <h2>{challengePage.storyTitle}</h2>                     
                    <button> 좋아요<FcLike /></button>
                    <img src={challengePage.mainImgUrl} alt="" />
                    <p>기부 시작일: {challengePage.createDate}</p>
                    <p>기부 종료일: {challengePage.endDate}</p>
                    <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
            </div>



                <h3>덧글</h3>
                    <div css={s.commentBox}>

                    <div>
                        <CommentSection donationPageId={donationPageId}>                    
                        </CommentSection>
                    </div>

            </div>

        </>
    
    )
}
export default DonationStoryPage;