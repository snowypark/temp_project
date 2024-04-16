// useFetchDataAndUpdateState.js
import { useEffect } from 'react';
import axios from 'axios';

function useFetchDataAndUpdateState(donationPageId, setTitle, setContent, setMainImg, setStartDate, setEndDate, setAmount, setSelectedMainTag, setSelectedSecondTag) {
    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/main/donation/update/${donationPageId}`);
                const data = response.data;
                setTitle(data.storyTitle);
                setContent(data.storyContent);
                setMainImg(data.mainImgUrl);
                setStartDate(new Date(data.createDate));
                setEndDate(new Date(data.endDate));
                setAmount(data.amount !== null ? data.amount : 0);
                setSelectedMainTag(data.mainCategoryId);
                setSelectedSecondTag(data.donationTagId);
                console.log(data);
            } catch (error) {
                console.error('Error fetching donation page for update:', error);
            }
        };
        fetchDataAndUpdateState();
    }, [donationPageId, setTitle, setContent, setMainImg, setStartDate, setEndDate, setAmount, setSelectedMainTag, setSelectedSecondTag]);
}

export default useFetchDataAndUpdateState;
