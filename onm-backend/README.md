### Express 서버 기동 및 설정 ###
npm init onm_backend 으로 package.json 프로젝트를 생성한다.
npm install --save express 등 필요한 라이브러리를 설치한다.
app.js 파일을 생성하고 미들웨어를 구현한다.

app.js 디렉토리로 이동하여 아래와 같이 미들웨어 서버를 띄운다. 포트 3000 
node app.js

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


### MongoDB 실행 
1. 터미널을 열어서 아래와 같이 command line 입력
C:\MongoDB\bin>mongod --dbpath C:\MongoDB\data\db

2. 새로 터미널 하나 더 열어서 아래와 같이 command line 입력
C:\MongoDB\bin>mongo


