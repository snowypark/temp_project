import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { donationGivingResponse } from '../../../apis/api/DonationAPI';
import { useSearchParams } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import * as s from "./style";


function Donators({ donationPageId }) {

    const [ donationDate, setDonationDate ] = useState();
    const [ amount, setAmount] = useState();
    const [ anonymous, setAnonymous ] = useState();

    const [donationList, setDonationList] = useState([]);
    

    useEffect(() => {
        if (donationPageId) {
            donationGivingResponse(donationPageId)
                .then(response => {
                    setDonationList(response.data);
                    console.log(response.data)
                })
                .catch(error => {
                    console.error("에러남:", error);
                });
        }
        
    }, [donationPageId]);
    


    return (
        <div>
            <h1>Donators Page2</h1>
            <div >
                {donationList.map((donation, index) => (
                    <div key={index} css={s.DonatorBox} >
                        <p>기부아이디: {donation.userId} </p>
                        <p>금액: {donation.amount} 원 </p>
                        <p>날짜: {donation.donationDate.substring(0, 10) }</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Donators;
