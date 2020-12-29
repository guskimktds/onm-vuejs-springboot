var express = require('express');
var http = require('http');
var serveStatic = require('serve-static');      //특정 폴더의 파일들을 특정 패스로 접근할 수 있도록 열어주는 역할
var path = require('path');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
const fs = require('fs');
const cors = require('cors');

let corsOption = {
    origin: ['http://localhost:8080', 'http://localhost:8081'], // 허락하는 요청 주소
    credentials: true // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
} 


const jsonAdminMenuFile = fs.readFileSync('./public/adminMenuMock.json', 'utf8');
const jsonUserMenuFile = fs.readFileSync('./public/userMenuMock.json', 'utf8');
const jsonOperatorMenuFile = fs.readFileSync('./public/operatorMenuMock.json', 'utf8');

const jsonAccountListFile = fs.readFileSync('./public/accountListMock.json', 'utf8');

const jsonOperatorListFile = fs.readFileSync('./public/operationListMock.json', 'utf8');
 
var app = express();      //express 서버 객체
 
var bodyParser_post = require('body-parser');       //post 방식 파서

app.use(cors(corsOption)); // CORS 미들웨어 추가 
app.set('port', 3000);
 
 
//미들웨어들 등록 시작, 아래 미들웨어들은 내부적으로 next() 가실행됨
 
//join은 __dirname : 현재 .js 파일의 path 와 public 을 합친다
//이렇게 경로를 세팅하면 public 폴더 안에 있는것을 곧바로 쓸 수 있게된다
app.use(serveStatic(path.join(__dirname, 'public'))); 
 
//post 방식 일경우 begin
//post 의 방식은 url 에 추가하는 방식이 아니고 body 라는 곳에 추가하여 전송하는 방식
app.use(bodyParser_post.urlencoded({ extended: false }));            // post 방식 세팅
app.use(bodyParser_post.json());                                     // json 사용 하는 경우의 세팅
//post 방식 일경우 end
 
 
//쿠키와 세션을 미들웨어로 등록한다
app.use(cookieParser());
 
//세션 환경 세팅
//세션은 서버쪽에 저장하는 것을 말하는데, 파일로 저장 할 수도 있고 레디스라고 하는 메모리DB등 다양한 저장소에 저장 할 수가 있는데
app.use(expressSession({
    secret: 'my key',           //이때의 옵션은 세션에 세이브 정보를 저장할때 할때 파일을 만들꺼냐
                                //아니면 미리 만들어 놓을꺼냐 등에 대한 옵션들임
    resave: true,
    saveUninitialized:true
})); 
 
 
//라우트를 미들웨어에 등록하기 전에 라우터에 설정할 경로와 함수를 등록한다
//
//라우터를 사용 (특정 경로로 들어오는 요청에 대하여 함수를 수행 시킬 수가 있는 기능을 express 가 제공해 주는것)
var router = express.Router();
 
 
//http://localhost:3000/process/product 이 주소로 치면 라우터를 통해 바로 여기로 올 수 있다
// router.route('/process/product').get(
//     function (req, res)
//     {
//         console.log('/process/product  라우팅 함수 실행');
 
//         //세션정보는 req.session 에 들어 있다
//         if (req.session.user)       //세션에 유저가 있다면
//         {
//             res.redirect('/product.html');
//         }
//         else
//         {
//             res.redirect('/login2.html');
 
//         }
//     }
// );
 
// router.route('/login').post(                      //설정된 쿠키정보를 본다
//     function (req, res) {
//         console.log('/login 라우팅 함수호출 됨');
 
//         var paramID = req.body.id || req.query.id;
//         var pw = req.body.password|| req.query.password;
 
//         if (req.session.user) {
//             console.log('이미 로그인 되어 있음');
 
//             res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
//             // res.write('<h1>already Login</h1>');
//             // res.write('[ID] : ' + paramID + ' [PW] : ' + pw);
//             // res.write('<a href="/process/product">Move</a>');
//             res.end();
 
//         } else {
//             req.session.user =
//                 {
//                     id: paramID,
//                     pw: pw,
//                     name: 'UsersNames!!!!!',
//                     authorized: true
//                 };
//             res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
//             // res.write('<h1>Login Success</h1>');
//             // res.write('[ID] : ' + paramID + ' [PW] : ' + pw);
//             // res.write('<a href="/process/product">Move</a>');
//             res.end();
//         }
//     }
// );

router.route('/login').post(                      //설정된 쿠키정보를 본다
    function (req, res) {
        console.log('/login 라우팅 함수호출 됨');
 
        const { id, password } = req.body
        //const userID = isAuthenticated({ id, password });
        const userID = 1
        const data = {
            expired : '60min'
        }

        if (id === 'admin')
        {
            const status = 200
            const menu = jsonAdminMenuFile
            
            //console.log(menu)
            return res.status(status).json({ status, menu, data })

        }else if(id === 'oper'){
            const status = 200
            const menu = jsonOperatorMenuFile
            //console.log(menu)
            return res.status(status).json({ status, menu, data })

        }else if(id === 'user'){
            const status = 200
            const menu = jsonUserMenuFile
            //console.log(menu)
            return res.status(status).json({ status, menu, data })

        }else if(id === 'nouser'){
            const status = 401
            const data = 'User not exists'
            res.status(status).json({ status, data })
            return
        }else{
            const status = 402
            const data = 'Incorrect username or password'
            res.status(status).json({ status, data })
            return
        }
        //const accessToken = createToken({ id: userID })
        //res.cookie('sessionCookieName', accessToken, {httpOnly: true})
        // console.log("success 200 ok ")
        // const statusOk = 200
        // const data = {
        //     expired : '60min'
        // }
        //res.redirect('/platform');
        // res.status(statusOk).json({ statusOk, data: data });

        // res.end();
    }
);

router.route('/logout').post(                      //설정된 쿠키정보를 본다
    function (req, res) {
        console.log('/logout 호출 됨');
 
        const { id } = req.body
        //const userID = isAuthenticated({ id, password });
        var status = 200  
        var data = 'Success logout'

        if(id === 'nouser'){
            status = 401
            data = 'User not exists'
            return res.status(status).json({ status, data })
        }else if(id === 'incorrect'){
            status = 402
            data = 'Incorrect username or password' 
            return res.status(status).json({ status, data })          
        }

        return res.status(status).json({ status, data })

    }
);

router.route('/menu').post(                      //설정된 쿠키정보를 본다
    function (req, res) {
        console.log('/menu ');
 
        const { id, password } = req.body
        //const userID = isAuthenticated({ id, password });
        if (id === 'admin')
        {
            const status = 200
            const menu = jsonMenuFile
            console.log(menu)
            return res.status(status).json({ status, menu })
            
        }else{
            const status = 200
            const menu = jsonMenuFile
            console.log(menu)
            return res.status(status).json({ status, menu })
        }
        //const accessToken = createToken({ id: userID })
        //res.cookie('sessionCookieName', accessToken, {httpOnly: true})
        //res.status(200).json({ success: true })
    }
);

router.route('/accountlist').get(                      //설정된 쿠키정보를 본다
    function (req, res) {
        console.log('/accountlist ');
 
        const { id, password } = req.body
        //const userID = isAuthenticated({ id, password });

        const status = 200
        const menu = jsonAccountListFile
        console.log(menu)
        return res.status(status).json({ status, menu })
    }
);

router.route('/operation-history').get(                      //설정된 쿠키정보를 본다
    function (req, res) {
        console.log('/operation-history ');
 
        const { id, password } = req.body
        //const userID = isAuthenticated({ id, password });

        const status = 200
        const menu = jsonOperatorListFile
        console.log(menu)
        return res.status(status).json({ status, menu })
    }
);

router.route('/signup').post(                      //설정된 쿠키정보를 본다
    function (req, res) {
        console.log('/signup call ');
 
        const { id, ip, auth } = req.body
        //const userID = isAuthenticated({ id, password });

        console.log('/signup param ==> id :'+id, 'ip:'+ip, 'auth:'+auth);
        var status = 200  
        var data = 'Success Signup'

        // if(id === 'nouser'){
        //     status = 401
        //     data = 'User not exists'
        //     return res.status(status).json({ status, data })
        // }else if(id === 'incorrect'){
        //     status = 402
        //     data = 'Incorrect username or password' 
        //     return res.status(status).json({ status, data })          
        // }

        return res.status(status).json({ status, data })

    }
);

// const SECRET_KEY = '123456789'
// const expiresIn = '30min'
// Create a token from a payload
// function createToken(payload)
// {
//   return jwt.sign(payload, SECRET_KEY, { expiresIn })
// } 

function isAuthenticated( id, password )
{
    
    // if(id === 'nouser'){
    //     return 0
    // }
    // else 
    if(id === 'admin' && password === '1234'){
        return 1
    }
    else {
        return 0
    }    
 
} 
 
// router.route('/process/logout').get(                      //설정된 쿠키정보를 본다
//     function (req, res) {
//         console.log('/process/loginout 라우팅 함수호출 됨');
 
//         if (req.session.user) {
//             console.log('로그아웃 처리');
//             req.session.destroy(
//                 function (err) {
//                     if (err) {
//                         console.log('세션 삭제시 에러');
//                         return;
//                     }
//                     console.log('세션 삭제 성공');
//                     //파일 지정시 제일 앞에 / 를 붙여야 root 즉 public 안에서부터 찾게 된다
//                     res.redirect('/Login2.html');
//                 }
//             );          //세션정보 삭제
 
//         } else {
//             console.log('로긴 안되어 있음');
//             res.redirect('/Login2.html');
//         }
 
 
     
//     }
// );
 
 
//라우터 미들웨어 등록하는 구간에서는 라우터를 모두  등록한 이후에 다른 것을 세팅한다
//그렇지 않으면 순서상 라우터 이외에 다른것이 먼저 실행될 수 있다
app.use('/', router);       //라우트 미들웨어를 등록한다
 
 
app.all('*',
    function (req, res) {
        res.status(404).send('<h1> 요청 페이지 없음 </h1>');
    }
);
 
//웹서버를 app 기반으로 생성
var appServer = http.createServer(app);
appServer.listen(app.get('port'),
    function () {
        console.log('express 웹서버 실행' + app.get('port'));
    }
);
 