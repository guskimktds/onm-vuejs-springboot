### CORS 방지를 위한 axios 호출 시 처리 ### 

이 문제를 해결하기 위해서는 API 요청을 받는 쪽. 즉, API서버의 응답 헤더를 변경해주는 것으로 

해결 해 줄 수 있습니다. 서버 헤더 중 Access-Control-Allow-Origin이라는 헤더 프로퍼티가 있는데, 

이 헤더는 CORS를 허용해 주는 도메인을 설정해 주는 역할을 합니다.
이렇게 node.js Express기반의 API 서버에서 Access-Control-Allow-Origin 헤더를 

설정해줄 수 있는 cors npm 모듈이 있습니다. 

npm install --save cors

### 아래 샘플과 같이 처리

const express = require('express');
const cors = require('cors');

let corsOption = {
    origin: 'http://localhost:8000' // 허락하는 요청 주소
    credentials: true // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
} 

app.use(cors(corsOption)); // CORS 미들웨어 추가