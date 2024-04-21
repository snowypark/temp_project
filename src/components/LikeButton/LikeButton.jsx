import { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { FcLike } from "react-icons/fc";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getLike, postLike } from "../../apis/api/Like";
import { CiHeart } from "react-icons/ci";



function LikeButton({donationPageId}) {
    const [likeStatus, setLikeStatus] = useState({ isLiked: 0, likeCount: 0});
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery") || {};
    const postLikeQuery = useMutation({
        mutationKey: "postLikeQuery",
        mutationFn: postLike,
        onSuccess: response => {
            alert("완료");
        },
        onError: error => {}
    })

    const getLikeQuery = useQuery(
        ["getLikeQuery", donationPageId, principalData?.data?.userId ?? null],
        async () => {
            const response = await getLike({ donationPageId, userId: principalData.data.userId});
            console.log(response.data);
            return response.data;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                setLikeStatus(data);
            },
            onError: error => {}
        }
    );

    const handleLikeCount = () => {
        if (principalData.data) {
          postLikeQuery.mutate({ donationPageId, userId: principalData?.data.userId }, {
            onSuccess: (data) => {
              getLikeQuery.refetch({ donationPageId, userId: principalData?.data.userId });
            
            }
          });
        } else {
          // principalData.data가 없는 경우 처리할 로직을 작성합니다.
          console.log("로그인 하세요.");
        }

    };
    let isLike = likeStatus.isLiked > 0;

    
    return (
        <div css={s.like}>
            <button onClick={handleLikeCount} css={s.likeButton}>
            {isLike ? <FcLike  /> : <CiHeart />} 공감 {likeStatus.countLike}
            </button>
        </div>
    );
}

export default LikeButton;