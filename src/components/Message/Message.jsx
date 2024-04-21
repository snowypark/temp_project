import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { postMessageRequest } from '../../apis/api/Admin';

function Message({userList}) {
    const [ message, setMessage ] = useState();

    const sendMessageMutation = useMutation({
        mutationKey: "sendMessageMutation",
        mutationFn: postMessageRequest,
        onSuccess: response => {
            console.log(response);
            alert("전송완료.");
        },
        onError: error => {}
    })
    const handleTextareaOnchange = (e) => {
        setMessage(() => e.target.value);
        console.log(message);
    }
    const handleMessageOnClick = (e) => {
        let userIds = [];
        for(let user of userList) {
            if(user.checked) {
                userIds = [...userIds, user.userId];
            }
        }
        sendMessageMutation.mutate({
            message,
            userId: userIds
        });
    }
    return (
        <div>
            <p><textarea placeholder="공지 사항 입력" value={message} onChange={handleTextareaOnchange}></textarea></p>
            <button onClick={handleMessageOnClick}>공지보내기</button>
        </div>
    );
}

export default Message;