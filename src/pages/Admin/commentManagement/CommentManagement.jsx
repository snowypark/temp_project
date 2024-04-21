import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { deleteCommentRequest, getUserCommentListRequest } from '../../../apis/api/Admin';

function CommentManagement({userId} ) {
    const [ commentList, setCommentList] = useState([]);
    const getCommentListQuery = useQuery(
        [ "getCommentListQuery" ],
        async () => {
            return await getUserCommentListRequest({
                userId: userId
            })
        },
        {
            refetchOnWindowFocus: false,
            enabled: !!userId,
            onSuccess: response => {
                setCommentList(() => response.data.map(comment => {
                    return {
                        ...comment,
                        checked: false
                    }
                }));
            },
        }
    );
    const deleteCommentMutation = useMutation({
        mutationKey: "deleteCommentMutation",
        mutationFn: deleteCommentRequest,
        onSuccess: response => {
            console.log(response);
            alert("삭제완료.");
        },
        onError: error => {}
    })
    const handleCheckOnChange = (e) => {
        const commentId = parseInt(e.target.value);
        setCommentList(() =>commentList.map(comment => {
            if (commentId === comment.donationCommentId) {
                return {
                    ...comment,
                    checked: e.target.checked
                }
            } else {
                return comment
            }
            }));
    }
    const handleDeleteButtonOnClick = () => {
        const deleteComments = commentList.filter(comment => comment.checked === true).map(comment => comment.donationCommentId);
        deleteCommentMutation.mutate(deleteComments);
    }
    return (
        <div>
            댓글 관리
            <button onClick={handleDeleteButtonOnClick}>댓글 삭제</button>
            {
                commentList.map(comment => {
                    return <>
                    <div key={comment.donationCommentId}>
                        <input type="checkbox" value={comment.donationCommentId} checked={comment.checked} onChange={handleCheckOnChange}/>
                        <span>{comment.storyTitle}</span>
                        <span>{comment.commentText}</span>
                    </div>
                    </>
                })
            }
        </div>
    );
}

export default CommentManagement;