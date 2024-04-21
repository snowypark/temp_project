function KakaoShareButton({ route, title }) {
    const handleClick = () => {
      if (window.Kakao) {
        const kakao = window.Kakao;
        if (!kakao.isInitialized()) {
          kakao.init(process.env.REACT_APP_KAKAO); // 카카오에서 제공받은 javascript key
        }
  
        kakao.Link.sendDefault({
          objectType: "feed",
          content: {
            title: title,
            description: "This is description",
            imageUrl: "Image URL",
            link: {
              mobileWebUrl: route,
              webUrl: route
            }
          },
          buttons: [
            {
              title: "View More",
              link: {
                mobileWebUrl: route,
                webUrl: route
              }
            }
          ]
        });
      }
    };
  
    return (
      <button onClick={handleClick}>
        카카오톡 공유하기
      </button>
    );
  }
  
  export default KakaoShareButton;
  