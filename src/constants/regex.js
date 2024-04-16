export const REGEX = {
    username: {
        regexr: /^[A-Za-z0-9]{5,10}$/,
        text: "영문자, 숫자 5 ~ 10자리 형식이어야 합니다"
    },
    password: {
        regexr: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,128}$/,
        text: "하나의 영문자, 숫자, 특수문자를 포함한 5 ~ 128자리 형식이어야 합니다"
    },
    name: {
        regexr: /^[0-9a-zA-Z가-힇]{2,10}$/,
        text: "2~10자리 형식이어야 합니다(특수 문자 사용 불가능)"
    },
    email: {
        regexr: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
        text: "이메일 형식이어야 합니다"
    },
    phoneNumber: {
        regexr: /\d{3}-\d{3,4}-\d{4}/,
        text: "전화 번호 형식이어야 합니다"
    }    
};