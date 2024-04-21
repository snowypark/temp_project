import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { getDonationStoryRequest, getProgressAmount } from '../../apis/api/DonationAPI';
import { useQuery } from 'react-query';

function Progress({pageId}) {
    const [goalAmount, setGoalAmount] = useState(0);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [ progressPercent , setProgressPercent ] = useState();
    const [ donationPageId, setPageId ] = useState(pageId);
    const getamountQuery = useQuery(        
        ["getamountQuery", donationPageId],
        async () => {
            return await getProgressAmount({donationPageId});
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
    useEffect(() => {
        if (getamountQuery.isSuccess) {
            setGoalAmount(getamountQuery.data.goalAmount);
            setCurrentAmount(getamountQuery.data.currentAmount);
        }
      }, [getamountQuery.data]);

      useEffect(() => {
        if (!isNaN(currentAmount) && !isNaN(goalAmount)) {
            const calculatedProgressPercent = ((currentAmount / goalAmount) * 100).toFixed(0);
            setProgressPercent(calculatedProgressPercent);
        }
    },[currentAmount, goalAmount])
    return (
        <div>
            {getamountQuery.isLoading ? (
                <p>Loading...</p>
            ) : (
                
                <>
                    <div css={s.progressbar}>
                        <div css={s.progress} style={{ width: `${progressPercent}%` }}>
                            {isNaN(progressPercent) ? "" : ""}
                        </div>
                    </div>
                    <div>{progressPercent}%</div>
                </>
            )}
        </div>
    );
}

export default Progress;