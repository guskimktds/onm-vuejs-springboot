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
