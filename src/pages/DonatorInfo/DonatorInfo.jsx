/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import * as s from "./style";
import { useMutation, useQueryClient } from 'react-query';
import { submitDonationData } from "../../apis/api/DonationAPI";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';


function DonatorInfo(props) {
    const [ searchParams ] = useSearchParams();
    const [ money , setMoney ] =useState(0)
    const [message, setMessage] = useState("");
    const [ checked , setChecked ] = useState(false);
    const [ userId, setUserId ] = useState();
    const inputRef = useRef(0);
    
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    const donationSubmitMutation = useMutation({
        mutationKey: "donationSubmitMutation",
        mutationFn: submitDonationData,
        onSuccess: response => {
            console.log(response);
            alert("완료하였습니다.");
        },
        onError: error => {}
    })
    
    const handlemoneyChange = (e) => {
        setMoney(e.target.value)
    }
    
    const handleMessegeChange = (e) => {
        setMessage(e.target.value)
    }
    
    
    const handleButtonClick = (amount) => {
        if (amount === 0) {
            setMoney(0);
            inputRef.current.focus()
        } else {
            setMoney(Money => Money + amount
            );
        }
    };
    
    const checkHandled = (checked) => {
        setChecked(checked);
    }
    
    const handleDonationSubmit = (e) => {
        const data = {
            amount: money,
            message: message,
            anonymous: checked,
            donationPageId:searchParams.get("id"),
            userId: principalData?.data.userId
        }
        console.log(data);
        donationSubmitMutation.mutate(data);
        
    }


    return (
        <>
        <div>
            <input type="text" id="" value={money} ref={inputRef} placeholder="기부 금액" onChange={handlemoneyChange} />
        </div>
        <div>
            <button onClick={()=> handleButtonClick(5000)}>5천원</button>
            <button onClick={()=> handleButtonClick(10000)}>1만원</button>
            <button onClick={()=> handleButtonClick(30000)}>3만원</button>
            <button onClick={()=> handleButtonClick(50000)}>5만원</button>
            <button onClick={()=> handleButtonClick(100000)}>10만원</button>
            <button onClick={()=> handleButtonClick(500000)}>50만원</button>
            <button onClick={()=> handleButtonClick(1000000)}>100만원</button>
            <button onClick={()=> handleButtonClick(0)}>직접입력</button>
        </div>
        <div>
            <input 
                type="text" 
                id="" 
                value={message}  
                placeholder="전하는 메시지" 
                onChange={handleMessegeChange}/>
        </div>
        <div>
            익명으로 기부하기
            <input 
                type="checkbox" 
                id=""
                checked={checked}
                onChange={(e) => checkHandled(e.target.checked)}/>
        </div>
        <button onClick={handleDonationSubmit}>기부하기</button>
        </>
    );
}

export default DonatorInfo;