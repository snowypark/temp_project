import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "../../pages/DonationChallengerPage/style";

 function ChallengeAlbum({ uploadedImages  }) {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    const handleNext = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === uploadedImages.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    const handlePrev = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? uploadedImages.length - 1 : prevIndex - 1
      );
    };
  
    useEffect(() => {
      const interval = setInterval;
      return () => clearInterval(interval);
    }, [currentImageIndex, uploadedImages]); // uploadedImages가 변경될 때마다 useEffect 실행

  return (
<div>
      <button onClick={handlePrev}>이전</button>
      <img src={uploadedImages[currentImageIndex]} alt="slide" />
      <button onClick={handleNext}>다음</button>
    </div>
  );
}

export default ChallengeAlbum;