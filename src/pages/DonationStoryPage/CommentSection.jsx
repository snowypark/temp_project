// CommentSection.jsx

import { useMutation, useQuery } from 'react-query';
import * as s from "./style";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { commentRequest, commentResponse, deleteComment } from '../../apis/api/DonationAPI';
import { TbTrashXFilled } from 'react-icons/tb';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getPrincipalRequest } from '../../apis/api/principal';

function CommentSection({ donationPageId }) {
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState("");
    const [userId, setUserId ] = useState();

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

    useEffect(() => {
        commentResponse(donationPageId)
            .then(response => setCommentList(response.data))
            .catch(console.error);
    }, [donationPageId]);

    const handleCommentChange = (e) => setComment(e.target.value);

    const handleCommentSubmit = async () => {
        try {
            const data = {
                commentText: comment,
                donationPageId,
                userId
            };
            const response = await commentRequest(data);
            alert("전송 완료");
            setCommentList([...commentList, response.data]);
            setComment("");
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleCommentDeleteButton = (donationCommentId) => {
        if (!userId) {
            alert("로그인이 필요합니다.");
            return;
        }
        console.log("Deleting ID:", userId);
        deleteCommentMutation.mutate({ donationCommentId, userId });
    };
    

    const deleteCommentMutation = useMutation({
        mutationKey: "deleteCommentMutation",
        mutationFn: deleteComment,
        onSuccess: response => {
            alert("삭제완료")
            window.location.reload();
        },
        onError: response => {
            alert("삭제할 권한이 없습니다.")
        }
    });


    return (
        <>
            <div css={s.commentBox}>
                <div>
                    <input css={s.inputbox}
                        type="text"
                        placeholder='따뜻한 댓글을 남겨주세요'
                        value={comment}
                        onChange={handleCommentChange}
                    />
                </div>
                    <button onClick={handleCommentSubmit}>덧글 입력</button>
                <div>
                {commentList.map((comment, index) => (
                <div key={index}>
                    <p>{comment.commentText}
                        <button onClick={() => handleCommentDeleteButton(comment.donationCommentId)}>
                            덧글 삭제 <TbTrashXFilled />
                        </button>
                    </p>
                </div>
            ))}
                </div>
            </div>
        </>
    );
}


export default CommentSection;