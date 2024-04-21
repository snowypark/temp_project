import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteAllMessageRequest, getMessageListRequest } from '../../apis/api/Message';

function MessagePage(props) {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    const [ messageList, setMessageList ] = useState([]);
    const messageListQuery = useQuery(["messageListQuery"],  async () => {
        return await getMessageListRequest({
            userId: principalData?.data.userId
        })
    }, {
        retry: 0,
        enabled: !!principalData?.data, 
        refetchOnWindowFocus: false,
        onSuccess: response => {
            setMessageList(() => response.data);
        }
    });
    const deleteMessageMutation = useMutation({
        mutationKey: "deleteNessageMutation",
        mutationFn: deleteAllMessageRequest,
        onSuccess: response => {
            console.log(response);
            alert("삭제완료.");
        },
        onError: error => {}
    })  
    const deleteAllMessage = () => {
        deleteMessageMutation.mutate(principalData.data.userId)
    }
    return (
        <div>{
            messageList.length > 0 ?
            <>
                <div>
                    메세지 리스트
                </div>
                {messageList.map(message => (
                    <div key={message.messageId}>
                        <img src={message.teamLogoUrl} alt="" />
                        <div>{message.teamName}</div>
                        <div>{message.message}</div>
                        <div>{message.date}</div>
                    </div>
                ))}
                <div>
                    60일이 지난 메세지는 자동 삭제됩니다.
                </div>
                <button onClick={deleteAllMessage}>전체 메세지 삭제</button>
            </>
            : <div>
                새로운 알림이 없습니다.
                중요한 알림을 한꺼번에 모아서 확인할 수 있어요.
            </div>
        }
        </div>
    );
}

export default MessagePage;