# onm-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### GiGAeyes ONM 개발 절차 
### 0. @vue/cli 4.5.7 사용 
### 1. vue create onm-vue 로 프로젝트 생성

### 2. Base UI 컴포넌트 구성 만들기 

### 3. sidebar menu 화면 데이터 바인딩 처리

### 4. 계정관리 화면 구현
### 4-1 계정관리 레이아웃 구조

/account  - 계정관리 메인(로그인 시 마이페이지 표시, 로그아웃 시 로그아웃 뷰 표시)
/account/mypage - 로그인 시 마이페이지 뷰(ID, IP, 연락처, EMAIL, 권한그룹, 처리권한 표시), 수정(권한에 따라 조회/수정), 마지막 접속일시(?)
/account/signout - 로그아웃 처리 후 뷰 -> 5초 뒤 로그인 페이지로 이동
/signin  - 로그인 폼 뷰 (LDAP 등록된 ID, PASSWORD 입력 후 OTP 인증 요청 -> OTP 입력 후 정상 -> 메인페이지로 이동  )
/signup  - 계정생성 폼 뷰, (접속할 계정(사번), 접속지정보(IP),)

### 4-2 계정생성 뷰 구현하기

우선 화면 디자인을 위한 라이브러리 설치 : jquery, popper.js, bootstrap
npm install jquery popper.js bootstrap --save
src/main.js 에 아래와 같이 설정 추가
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

### 4-2-1 계정생성 폼 뷰는 접속ID(사번), 접속지정보(IP) 로 생성(OTP 처리는 ldap 연동으로 기 연락처를 조회해서 처리함)
입력 : 사번, ip, otp 수신코드
버튼 : otp 요청, 계정생성요청, 이전화면으로, 로그인 뷰 이동

### 개별 구현 소스를 develop 에 1차 머지한다. 매주 화, 목 퇴근전에 commit 후 merge 진행

### GNB 및 Sideba Sub Menu 구조에 대한 메뉴 및 권한 처리 ###
권한 그룹

### 캡차 적용 ###

### CORS 방지를 위한 axios 호출 시 아래와 같이 처리 ### 

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8001';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

### material 디자인 적용 시 index.html 에 링크 추가 ###

<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"> -->

### 주석 처리함 -> 나중에 처리

### 로그인 후 router 처리 시 
this.$router.push 시 서버로 axios 통신 후 .then() 처리 시 동작안함

해결 : this.$router.replace() 로 처리가능 


### 웹브라우저 리프레시 상태관리 값 초기화 방지 처리 vuex-persistedstate 처리
npm install --save vuex-persistedstate

store/index.js 에서 아래와 같이 처리

import createPersistedState from "vuex-persistedstate"

...
plugins: [createPersistedState()],  // 선택적 처리 가능 
...

### 선택적으로 특정 모듈만 vuex-persistedstate 처리 가능
