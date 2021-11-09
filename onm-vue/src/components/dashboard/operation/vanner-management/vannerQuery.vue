<template>   
    <v-container
        id="regular-tables"
        tag="section"
        fluid
    >
    <h3 style="font-size: 30px; height: 20px">배너 검색</h3>
        <!-- <base-material-card
            icon="mdi-magnify"
            title="배너 검색"
            class="px-5 py-3"
        > -->
        <v-card class="border-black px-5 py-3" >
        <v-row style="padding-top: 10px">
            <v-col   style="padding-top:25px;" cols="auto">
                <v-text>배너타입</v-text>
            </v-col>
            <v-col >
            <v-select 
            label="전체"
            :items="items"
            v-model="vitem"
            @change="test123"
            solo
            style="width: 150px;"
            >
            </v-select>
            </v-col>
            <v-col style="padding-top:25px; flex:0 0 5%;" cols="auto">
                <v-text>제목</v-text>
            </v-col>
            <v-col style="margin-top:-10px;" >
                <v-text-field label="입력" style="width: 335px"></v-text-field>
                <!-- <input type="text" class="border-black"> -->
            </v-col>
            <v-col style="padding-top:25px;" cols="auto">
                <v-text>노출여부</v-text>
            </v-col>
            <v-col cols="auto"><v-select 
            :items="items2"
            label="전체"
            solo
            style="width: 150px;"
            >
            </v-select></v-col>
            <v-col cols="2">
                <v-btn class="black" right absolute
                 @click="test123"
                 elevation="2"
                 >검색</v-btn>
            </v-col>
        </v-row>
        <v-row style="margin-top:-40px">
            <v-col style="padding-top:35px;" cols="auto">
                <v-text>노출기간</v-text>
            </v-col>
            <v-col cols="auto">
                    <v-menu
                    offset-y
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.start_date2"
                        prepend-icon="mdi-calendar"
                        readonly
                        label="시작일"
                        v-bind="attrs"
                        v-on="on"
                        style="width:150px"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.start_date2" no-title scrollable type="date">
                    </v-date-picker>
                    </v-menu>
                </v-col>
                <v-text style="padding-top:35px">~</v-text>
                <v-col cols="auto">
                    <v-menu
                    offset-y
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.end_date2"
                        prepend-icon="mdi-calendar"
                        readonly
                        label="종료일"
                        v-bind="attrs"
                        v-on="on"
                        style="width:150px"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.end_date2" no-title scrollable type="date">
                    </v-date-picker>
                    </v-menu>
                </v-col>

                <v-col style="padding-top:35px; padding-left: 75px" cols="auto">
                <v-text>등록일자</v-text>
                </v-col>
                <v-col cols="auto">
                    <v-menu
                    offset-y
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.start_date"
                        label="시작일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        style="width:150px"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.start_date" no-title scrollable type="date">
                    </v-date-picker>
                    </v-menu>
                    
                </v-col>
                <v-text style="padding-top:35px">~</v-text>
                <v-col cols="auto">
                    <v-menu
                    offset-y
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.end_date"
                        label="종료일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        style="width:150px"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.end_date" no-title scrollable type="date">
                    </v-date-picker>
                    </v-menu>
                </v-col>
        </v-row>
    </v-card>
    </v-container>
</template>

<script>
// import dateInfo from '../../../../utils/common';
export default {
    props:['param','localGwOptions'],
    data() {
        return{            
            status: '센터',
            status_text:'',
            dialog: false,
            dialogDelete: false,        
            editedItem: {
                code_master_id: '',
                code_id: '',
                code_name: '',
                code_type: '',
                use_yn: '',
                orderby_no: '',
                description: '',
                cmd_type: '',
                local_gw_id: '0',
            },
            defaultItem: {
                code_master_id: '',
                code_id: '',
                code_name: '',
                code_type: '',
                use_yn: '',
                orderby_no: '',
                description: '',
                cmd_type: 'I',
                local_gw_id: '0',
            },
            images: [],
            items: ["전체", "타입명 A", "타입명 B", "타이명 C"],
            items2: ["전체", "노출", "미노출"],
            vitem:'전체',
            vitem2: '',
        }
    },
    computed: {
      formTitle () {
        // return this.editedIndex === -1 ? '등록' : '수정'
        return '배너등록'
      },
      // select box => center 국사정보와 version_code가 1302이상인 
      // 국사정보만 노출하도록 추가(21.06.03)
      filteredData(){
        return this.localGwOptions.filter(function(param){
            return (Number(param.version_code) > 1301 || param.local_gw_id == '');
        });
      }
      //
    },
    methods: {
        showAuth(){
            var auth=this.$store.state.authGroupId
            if(auth=='G100'){
            return true;
            }else{
            alert('접근권한이 없습니다.')
            return false;
            }
        },
        searchMethod: function() {
            console.log(this.vitem)
            if(this.status=="센터"){
                this.param.process_status=''
            }else{
                this.param.process_status=this.status
            }
            this.$emit('search', this.param)
        },

        save () {
            console.log('save method call : ',this.editedItem)     
            // 수정
            this.editedItem.cmd_type = 'I'
            if(this.editedItem.local_gw_id==''){
                delete this.editedItem.local_gw_id
            }
            // console.log(dateInfo().current)
            // this.editedItem.mod_date = getDate 
            // this.editedItem.reg_date = getDate 

            // console.log(this.editedItem.mod_date)

            this.$emit("Items",this.editedItem)
            
            this.close()
        },

        saveSure(){
            var index=this.editedItem.local_gw_id
            if(index==undefined){
                index=0
            }
            var indexNum
            for(var i=0;i<this.localGwOptions.length;i++){
               if(this.localGwOptions[i].local_gw_id==index){
                   indexNum=i
               }
            }
            this.$fire({
            title: "정말 등록 하시겠습니까?",
            type: "question",
            html: "국사코드 : "+this.localGwOptions[indexNum].server_name+"<br/>코드구분 : "+this.editedItem.code_master_id+"<br/>코드 : "+this.editedItem.code_id+
            "<br/>코드명 : "+this.editedItem.code_name+"<br/>코드타입 : "+this.editedItem.code_type+
            "<br/>사용여부 : "+this.editedItem.use_yn+"<br/>정렬순서 : "+this.editedItem.orderby_no+
            "<br/>설명 : "+this.editedItem.description,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '예',
            cancelButtonText: '아니오'
            }).then(result => {
               if(result.value){
                   this.save()
               }else{
                 this.closeSure()
               }
            });
            
        },
    
        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            // this.editedIndex = -1
            this.images = ""
            })
        },

        closeSure(){
           var index=this.editedItem.local_gw_id
            if(index==undefined){
                index=0
            }
            var indexNum
            for(var i=0;i<this.localGwOptions.length;i++){
               if(this.localGwOptions[i].local_gw_id==index){
                   indexNum=i
               }
            }
            this.close()
            this.$fire({
                       title: "등록이 취소되었습니다.",
                       html: "국사코드 : "+this.localGwOptions[indexNum].server_name+"<br/>코드구분 : "+this.editedItem.code_master_id+"<br/>코드 : "+this.editedItem.code_id+
            "<br/>코드명 : "+this.editedItem.code_name+"<br/>코드타입 : "+this.editedItem.code_type+
            "<br/>사용여부 : "+this.editedItem.use_yn+"<br/>정렬순서 : "+this.editedItem.orderby_no+
            "<br/>설명 : "+this.editedItem.description,
                       type : "error"
                   })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            //   this.editedIndex = -1
            })
        },
        deleteItemConfirm () {
            // this.pList.splice(this.editedIndex, 1)
            this.closeDelete()
        },
         uploadImage: function() {
            let form = new FormData()
            let image = this.$refs['image'].files[0]
            
            form.append('image', image)

            // axios.post('/upload', form, {
            //     header: { 'Content-Type': 'multipart/form-data' }
            // }).then( ({data}) => {
            // this.images = data
            // })
            // .catch( err => console.log(err))
        },
            clickInputTag: function() {
            this.$refs['image'].click()
        },
        imgUpload(){
            this.openImage = true;
            console.log(this.images.name)
            console.log(this.images[0])
            console.log(this.input)
            if(this.openImage){
                this.$('#input').get(0).click();
                
                }
        },
        test123(){
            console.log(this.vitem)
        }
       
        
    },  
}
</script>
<style>
 /* .size{
    width:500px;
    
}  */

.border-black {
  border: 1px solid black;
}
</style>