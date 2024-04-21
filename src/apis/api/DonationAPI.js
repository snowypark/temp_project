import instance from "../utils/instance";

export const getDonationListRequest = async (params) => {
    return await instance.get("/main/donations", { params });
}

export const getDonationTagRequest = async (params) => {
    return await instance.get("/main/donationtag", { params });
}
export const registerDonationPage = async (data) => {
    return await instance.post("/main/write", data);
}

export const registerChallengePage = async (data) => {
    return await instance.post("/main/challenge/write", data);
}

export const getDonationStoryRequest = async (params) => {
    return await instance.get("/main/donation", { params });
}

export const getDonationNewsRequest = async (pageId) => {
    return await instance.get(`/main/donation/news/${pageId}`);
};


export const getChallengeRequest = async (params) => {
    return await instance.get("/main/donations/challenge", { params });
};

export const registerReviewPage = async (data) => {
    return await instance.post("/main/donation/review", data);
}

export const registerNewsPage = async (data) => {
    return await instance.post(`/main/donation/news${data.donationPageId}`, data);
}

export const registerDonationNews = async (data) => {
    return await instance.post('/main/donation/donationnews', data);
}
export const getAllDonationTag = async () => {
    return await instance.get("/main/storytypes")
}

export const updatePageRequest = async (data) => {
    return await instance.put(`main/donation/update/${data.donationPageId}`, data);
}

export const updateNewsRequest = async (data) => {
    return await instance.put(`/mian/donation/news/update${data.donationPageId}`, data);
}

export const searchDonationRequest = async (params) => {
    return await instance.get("/main/search", { params });
}

export const getDonationPageRequest = async (pageId) => {
    return await instance.get(`/main/donation/${pageId}`);
}
export const submitDonationData = async (data) => {
    return await instance.post("/main/test", data); 
}

export const deleteDonationPage = async (data) => {   
      return await instance.delete(`/main/donation/${data.donationPageId}`, { data });   
  };

export const commentRequest = async (data) => {
    return await instance.post(`/comment/upload/`, data);
}

export const commentResponse = async (donationPageId) => {
    return await instance.get(`/comment/getcomment/${donationPageId}`);
}

export const donationGivingResponse = async (donationPageId) => {
    return await instance.get(`/main/donators/${donationPageId}`)
}

export const deleteComment = async (data) => {   
    const { donationCommentId } = data; 
    return await instance.delete(`/comment/delete/${donationCommentId}`); 
};

export const getNowFundingRequest = async (data) => {
    return await instance.get("/main/donation/fundings/now", data);
}

export const getEndFundingRequest = async (data) => {
    return await instance.get("/main/donation/fundings/end", data);
}

export const getAllAmount = async (params) => {
    return await instance.get("/main/amount", {params});
}
export const getProgressAmount = async (params) => {
    console.log(params);
    return await instance.get("/main/progress", {params});
}
