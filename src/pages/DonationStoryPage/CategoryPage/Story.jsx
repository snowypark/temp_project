import DOMPurify from 'dompurify';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getDonationStoryRequest } from '../../../apis/api/DonationAPI';

function Story(props) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page'); 
    const[donationPage, setDonationPage] = useState({});

    const getDonationStoryQuery = useQuery(
        ["getDonationPageQuery", donationPageId], 
        async () => {
            const response = await getDonationStoryRequest({ page: donationPageId });
            return response.data; 
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {setDonationPage(data);
            }
        }
    );

    

    const safeHTML = DOMPurify.sanitize(donationPage.storyContent);
    return (
        <div>
            Story


            
            <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
        </div>
    );
}

export default Story;