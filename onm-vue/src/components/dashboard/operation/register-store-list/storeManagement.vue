<template>
    <div>
        <v-container            
            id="regular-tables"
            fluid
            tag="section"
            style="margin-top: -30px;"
            >
            <h2 style="margin-top: 10px; margin-left:10px;">매장 목록
                <p style="float:right; margin-bottom:2px;"> 
                    <v-dialog
                        v-model="dialog"
                        max-width="900px"
                        scrollable  
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="darkGray"
                            class="registerBtn"
                            v-bind="attrs"
                            v-on="on"
                        >
                            매장검색
                        </v-btn>
                        </template>
                        <v-card height="vh">
                            <v-card-title>
                                <span class="headline" >매장검색</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <table>
                                         <tr>
                                            <th  style=" margin-left: 20px; font-size:8px;">
                                                <label id ="user_name">
                                                    매장 명:
                                                </label>
                                            </th>
                                            <td cols="2" >
                                                <v-text-field
                                                v-model="searchStore.ex_user_name"
                                                id="user_name"
                                                
                                                >
                                                </v-text-field>
                                            </td>
                                            <th style=" margin-left: 20px; font-size:8px;" >
                                                <label id ="tel_no">
                                                    담당자 번호:
                                                </label>
                                            </th>
                                            <td cols="3" >
                                                <v-text-field
                                                v-model="searchStore.ex_tel_no"
                                                id="tel_no"   
                                                >
                                                </v-text-field>
                                            </td>
                                            <td cols="3" style="text-align:center">
                                                <button class="findStore" @click="findStores">검색</button>
                                            </td>
                                        </tr>
                                    </table>
                                    <div style="width:827px; height:300px; margin-top:10px;">
                                        <p align="center" style= "font-size:18px; height:300px; padding-top:120px; border:1px solid #999999;" v-show="searchedStoreList.length === 0">검색된 매장이 없습니다.</p>
                                        <table v-show="searchedStoreList.length > 0">
                                            <tr>
                                                <td></td>
                                                <td style="text-align:center">매장명</td>
                                                <td style="text-align:center">담당자 명</td>
                                                <td style="text-align:center">담당자 번호</td>
                                            </tr>
                                            <tr v-for="(searchedStore, index) in searchCalData" v-bind:key="index">
                                                 <td style="text-align:center"> 
                                                     <input type="checkbox" v-model="checkedList" :value ="searchedStore">
                                                 </td>    
                                                 <td>{{searchedStore.store_name}}</td>
                                                 <td>{{searchedStore.user_name}}</td>
                                                 <td style="text-align:center">{{searchedStore.tel_no}}</td>   
                                            </tr>
                                        </table>
                                         <v-pagination :length= "searchNumofpage" v-model="serachCurPagenum" style="margin-top:12px;"> </v-pagination>
                                    </div>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                color="blue darken-1"
                                text
                                @click="saveStores"
                                >
                                저장
                                </v-btn>
                                <v-btn
                                color="blue darken-1"
                                text
                                @click="closeSure"
                                >
                                취소
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>  
                </p>    
            </h2>
            <div style="width:99%; height:400px;" v-show="user_list.length > 0">
                <table width="100%">
                    <tr>
                        <td style="text-align:center; font-weight:bold">매장 명</td>
                        <!-- <td style="text-align:center; font-weight:bold">담당자 명</td> -->
                        <td style="text-align:center; font-weight:bold">담당자 번호</td>
                        <td style="text-align:center; font-weight:bold">진행 상태</td>
                        <td style="text-align:center; font-weight:bold">승인 요청 및 상태</td>
                        <td style="text-align:center; font-weight:bold">삭제</td>
                    </tr>
                    <tr v-for="(store,index) in calData" v-bind:key="index" v-show="user_list.length > 0">
                        <td style="width:20%;">{{store.user_name}}</td>
                        <!-- <td style="width:15%">{{store.cust_name}}</td> -->
                        <td style="width:20%; text-align:center;">{{store.tel_no}}</td>
                        <td v-if="store.status_code === ''" style="color:red;text-align:center;width:16%;">
                            승인대기
                        </td>
                        <td v-else-if="store.status_code === 'N'" style="color:red;text-align:center;width:16%">
                            미승인
                        </td>
                        <td v-else style="text-align:center;width:16%">
                            승인
                        </td>
                        <!--  -->
                         <td v-if="store.status_code === ''" style="text-align:center;width:20%">
                            -
                        </td>
                        <td v-else-if="store.status_code === 'N'" style="color:red;text-align:center;width:20%"> <!--N으로 바꾸기-->
                            <button @click="sendApproval(store)" style="color:white;background-color:black;width:70px;border-radius:3px;">승인요청</button>
                            <button @click="approvalByforce(store)" style="color:white;background-color:black;width:70px;border-radius:3px;margin-left:20px;">강제승인</button>
                        </td>
                        <td v-else style="text-align:center;width:20%">
                            -
                        </td> 
                        <td style="width:15%;text-align:center;">
                            <button class="deleteBtn" @click="deleteList(store)">삭제</button>
                        </td>
                    </tr>
                </table>
                 <v-pagination :length= "numofpage" v-model="curpagenum" style="margin-top:20px;"> </v-pagination>
            </div>
            <div style="width:99%; height:400px; margin-top:30px; margin-bottom:30px; border: 1px solid" v-show="user_list.length === 0">
                <p align="center" style="font-size:20px;padding-top:220px;">[매장 검색] 버튼을 클릭하여, 매장을 추가하세요</p>
            </div>
      
        </v-container>
    </div>
</template>
<script>

import EventBus from '../../../../EventBus'
import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}
    export default{
        props:['receivedValue'],
        created(){
            this.infoObject.site_id = this.receivedValue.site_id
        },
        mounted(){
            this.getStoreList();
        },
        data(){
            return{
               infoObject :{
                    site_id:'',
                    checkedList:[],
                    user_id:''
                },
                checkedList:[],
                user_list:[],
                dialog: false,
                searchStore:{
                    ex_tel_no:'',
                    ex_user_name:''
                },
                searchedStoreList:[],   
              
                curpagenum : 1,
                datapage : 5,
                serachCurPagenum : 1,
            }
        },
        methods:{
            getStoreList(){  //등록된 매장 목록 가져오기
                  if(this.infoObject.site_id){
               
                    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13036/get_siteInfoDetails`
                    
                    const tsJson = new Object();
                    tsJson.site_id = this.infoObject.site_id;

                    axios.post(url, tsJson, headers)
                    .then((response) => {
                        var resCode = response.data.res_code;
                        var resMsg = response.data.res_msg;
                        if(resCode === 200){
                            if(response.data.data.user_list != null) {
                                this.user_list = response.data.data.user_list;                
                            }else{
                                this.user_list = [];
                            }
                        }else if(resCode === 204){
                        this.user_list =[];
                        console.log('매장 정보 데이터가 없습니다.');
                        }else if(resCode===410){
                        alert("로그인 세션이 만료되었습니다.");
                        EventBus.$emit('top-path-logout');
                            this.$store
                            .dispatch("LOGOUT")
                            .then( res => { 
                            console.log(res.status)}).catch(({ message }) => (this.msg = message))
                            this.$router.replace('/signin')
                        }else{
                        this.api_list = [];
                        console.log(resCode + " / " + resMsg);
                        }
                    })
                    .catch((ex) => {
                        console.log('조회 실패',ex);
                    })
                .finally(function(){})
                }
            },
            saveStores(){ // 검색한 매장 저장하기

                //var vm = this;
                if(this.checkedList.length === 0){
                    alert("값을 선택해주세요.");
                    return;
                }

                for(var i = 0; i < this.checkedList.length;i++){
                    var tjson = new Object();
                    tjson.user_id = this.checkedList[i].user_id;
                    this.infoObject.checkedList.push(tjson);
                }           
                var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13037/add_apiList`;

                 axios.post(url,this.infoObject, headers)
                .then((response)=>{
                    var resCode = response.data.res_code;
                    if(resCode === 200){
                        alert("저장되었습니다.");
                         this.closeSure();
                    }else if(resCode === 410){
                        alert("로그인 세션이 만료되었습니다.");
                        EventBus.$emit('top-path-logout');
                        this.$store
                        .dispatch("LOGOUT")
                        .then( res => { 
                        console.log(res.status)}).catch(({ message }) => (this.msg = message))
                        this.$router.replace('/signin')
                    }
                })
                .catch(() => {
                    alert("저장 중 중 오류가 발생하였습니다."); 
                    this.closeSure();       
                })    
                
            },
            approvalByforce(value){
                console.log(value);
                 var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13050/approval_by_force`; 
                 axios.post(url,value, headers)
                .then((response)=>{
                    var resCode = response.data.res_code;
                    if(resCode === 200){
                        alert("승인되었습니다.");
                        //this.infoObject.site_id = this.response.data.data.site_id;
                        this.getStoreList(); // 새로뿌리기
                    }else if(resCode===410){
                        alert("로그인 세션이 만료되었습니다.");
                        EventBus.$emit('top-path-logout');
                        this.$store
                        .dispatch("LOGOUT")
                        .then( res => { 
                        console.log(res.status)}).catch(({ message }) => (this.msg = message))
                        this.$router.replace('/signin')
                    }
                })
                .catch(() => {
                    alert("승인요청 중 오류가 발생하였습니다.");        
                })
            },
            sendApproval(value){ // 매장으로 승인 요청 보내기
                console.log(value)
                 var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13044/send_approval`; 
                 axios.post(url,value, headers)
                .then((response)=>{
                    var resCode = response.data.res_code;
                    if(resCode === 200){
                        alert("승인 요청이 전송되었습니다.");
                        //this.infoObject.site_id = this.response.data.data.site_id;
                        this.getStoreList(); // 새로뿌리기
                    }else if(resCode===410){
                        alert("로그인 세션이 만료되었습니다.");
                        EventBus.$emit('top-path-logout');
                        this.$store
                        .dispatch("LOGOUT")
                        .then( res => { 
                        console.log(res.status)}).catch(({ message }) => (this.msg = message))
                        this.$router.replace('/signin')
                    }
                })
                .catch(() => {
                    alert("승인요청 중 오류가 발생하였습니다.");        
                })
            },
            deleteList(storeInfo){

               this.infoObject.user_id = storeInfo.user_id;

                 this.$fire({
                    title: "정말 삭제 하시겠습니까?",
                    type: "question",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '예',
                    cancelButtonText: '아니오',
                    }).then(result => {
                    if(result.value){
                        var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13045/delete_store`;
                        axios.post(url,this.infoObject, headers)
                        .then((response)=>{
                            var resCode = response.data.res_code;
                            if(resCode === 200){
                                alert("삭제되었습니다.");
                                this.getStoreList(); // 새로뿌리기
                            }else if(resCode===410){
                                alert("로그인 세션이 만료되었습니다.");
                                EventBus.$emit('top-path-logout');
                                this.$store
                                .dispatch("LOGOUT")
                                .then( res => { 
                                console.log(res.status)}).catch(({ message }) => (this.msg = message))
                                this.$router.replace('/signin')
                            }
                        })
                        .catch(() => {       
                        })
                    }else{
                        this.getStoreList()
                    }
                });
            },
            closeSure(){
                this.dialog = false;
                this.searchStore.ex_tel_no='';
                this.searchStore.ex_user_name='';
                this.infoObject.checkedList = [];
                this.checkedList  = [];
                this.searchedStoreList = [];
                this.curpagenum = 1,
                this.serachCurPagenum = 1,
                this.getStoreList();
            },
            findStores(){
                 
                 if((this.searchStore.ex_tel_no === ''|| this.searchStore.ex_tel_no === 'undefined') && (this.searchStore.ex_user_name === '' || this.searchStore.ex_user_name === 'undefined')){
                    this.$fire({
                        title: " 검색 값을 넣어 주세요.",
                        type : "error",
                        html: ""
                    })
                    return;
                    }
                    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13046/search_store`;

                    axios.post(url,this.searchStore, headers)
                    .then((response)=>{
                    var resCode = response.data.res_code;
                    if(resCode === 200){
                        var searchedStoreList = response.data.data.list;                       
                        if(searchedStoreList.length > 0) {
                            this.searchedStoreList = searchedStoreList;                                         
                        } else {
                            this.searchedStoreList = [];
                        }
                    }else if(resCode===204){
                        this.searchedStoreList =[];
                        console.log('매장 정보 데이터가 없습니다.');
                    }else if(resCode===410){
                        alert("로그인 세션이 만료되었습니다.");
                        EventBus.$emit('top-path-logout');
                        this.$store
                        .dispatch("LOGOUT")
                        .then( res => { 
                        console.log(res.status)}).catch(({ message }) => (this.msg = message))
                        this.$router.replace('/signin')
                    }
                  })
                    .catch(() => {
                    alert("매장 검색 중 오류가 발생하였습니다.");        
                    })  
                }
            },
          computed: {

            startOffset() {
            return ((this.curpagenum - 1) * this.datapage);
            },
            endOffset() {
            return (this.startOffset + this.datapage);
            }, 
            numofpage() {
                return Math.ceil(this.user_list.length / this.datapage);
            },
            calData() {
            return this.user_list.slice(this.startOffset, this.endOffset);
            },
            searchStartOffset() {
            return ((this.serachCurPagenum - 1) * this.datapage);
            },
            searchEndOffset() {
            return (this.searchStartOffset + this.datapage);
            },
            searchNumofpage() {
                return Math.ceil(this.searchedStoreList.length / this.datapage);
            },
            searchCalData() {
                return this.searchedStoreList.slice(this.searchStartOffset, this.searchEndOffset);
            },
          
        },
    }
</script>
<style scoped>
  table {
    width: 100%;
    border-left: 1px solid #444444;
    border-right: 1px solid #444444;
    border-collapse: collapse;
  }
  th, td {
    padding: 10px;
    border: 1px solid #c1c2c3;

  }
  .deleteBtn{
      width:70px;
      border:1px solid black ;
      text-align:center;
  }
  .registerBtn{ 
        width:90px;
        border-radius:3px;
        font-size:10px; 
        float:right     
  }
  .findStore{
      background-color: indigo;
      color: white;
      font-size: 15px;
      padding:3px;
      border-radius: 3px;
      width:50px;
  }
</style>
