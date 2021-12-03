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
        <v-card class="border-black px-5 py-3" fluid >
        <v-row style="padding-top: 10px">
            <v-col   style="padding-top:25px;" cols="auto">
                <span>배너타입</span>
            </v-col>
            <v-col cols="auto">
            <v-select 
            label="전체"
            :items="items"
            v-model="typeitem"
            solo
            style="width: 150px;"
            >
            </v-select>
            </v-col>
            <v-col cols="auto" style="padding-top:25px;">OS 타입</v-col>
            <v-col cols="auto"><v-select 
            label="All"
            :items="items3"
            v-model="param.os_type"
            solo
            style="width: 100px;"
            
            ></v-select></v-col>
            <v-col style="padding-top:25px; flex:0 0 5%;" cols="auto" >
                <span>제목</span>
            </v-col>
            <v-col style="margin-top:-10px;" cols="auto">
                <v-text-field label="입력" style="width: 335px" v-model="param.title"></v-text-field>
                <!-- <input type="text" class="border-black"> -->
            </v-col>
            <v-col style="padding-top:25px;" cols="auto">
                <span>노출여부</span>
            </v-col>
            <v-col cols="auto"><v-select 
            :items="items2"
            v-model="typeitem2"
            label="전체"
            solo
            style="width: 150px;"
            >
            </v-select></v-col>
            <v-col  cols="auto">
                <v-btn class="black" right absolute
                 @click="searchMethod"
                 elevation="2"
                 >검색</v-btn>
            </v-col>
        </v-row>
        <v-row style="margin-top:-40px">
            <v-col style="padding-top:35px;" cols="auto">
                <span>노출기간</span>
            </v-col>
            <v-col cols="auto">
                    <v-menu
                    offset-y
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="editedItem.disp_start_date"
                        prepend-icon="mdi-calendar"
                        readonly
                        label="시작일"
                        v-bind="attrs"
                        v-on="on"
                        style="width:150px"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="editedItem.disp_start_date" no-title scrollable type="date">
                    </v-date-picker>
                    </v-menu>
                </v-col>
                <span style="padding-top:35px">~</span>
                <v-col cols="auto">
                    <v-menu
                    offset-y
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="editedItem.disp_end_date"
                        prepend-icon="mdi-calendar"
                        readonly
                        label="종료일"
                        v-bind="attrs"
                        v-on="on"
                        style="width:150px"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="editedItem.disp_end_date" no-title scrollable type="date">
                    </v-date-picker>
                    </v-menu>
                </v-col>

                <v-col style="padding-top:35px; padding-left: 75px" cols="auto">
                <span>등록일자</span>
                </v-col>
                <v-col cols="auto">
                    <v-menu
                    offset-y
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="editedItem.reg_start_date"
                        label="시작일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        style="width:150px"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="editedItem.reg_start_date" no-title scrollable type="date">
                    </v-date-picker>
                    </v-menu>
                    
                </v-col>
                <span style="padding-top:35px">~</span>
                <v-col cols="auto">
                    <v-menu
                    offset-y
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="editedItem.reg_end_date"
                        label="종료일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        style="width:150px"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="editedItem.reg_end_date" no-title scrollable type="date">
                    </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col  cols="auto">
                <v-btn class="black" right absolute
                 @click="fomatdata"
                 >초기화</v-btn>
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
            dialog: false,
            dialogDelete: false,
            images: [],
            items: ["전체", "로그아웃", "공지사항", "타입명 C"],
            items2: ["전체", "노출", "미노출"],
            items3: ["All", "Android", "IOS", "PC", "PCAPP"],
            vitem:'전체',
            typeitem:'',
            typeitem2:'',
            editedItem: {
                img_type: '',
                disp_yn: '',
                img_name: '',
                disp_start_date: '',
                disp_end_date: '',
                reg_start_date: '',
                reg_end_date: '',
                reg_date: '',
                cmd_type: '',
                os_type:'',
                local_gw_id: '0',
            },
        }
    },
    computed: {
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
        fomatdata(){
            this.param.title = ''
            this.param.img_type = ''
            this.param.os_type = ''
            this.param.reg_date = ''
            this.param.disp_yn = ''
            this.typeitem= ''
            this.typeitem2 = ''
            this.editedItem.disp_start_date = ''
            this.editedItem.disp_end_date = ''
            this.editedItem.reg_start_date = ''
            this.editedItem.reg_end_date = ''
            this.searchMethod()
        },
        searchMethod: function() {
            if(this.typeitem == this.items[1]){
                    this.param.img_type = 'LOGOUT'
            }
            if(this.typeitem == this.items[2]){
                    this.param.img_type = 'NOTICE'
            }
            if(this.typeitem == this.items[3]){
                    this.param.img_type = '03'
            }
            if(this.typeitem == this.items[0]){
                    this.param.img_type = ''
            }
             if(this.typeitem2 == this.items2[1]){
                this.param.disp_yn = 'Y'
            }
            if(this.typeitem2 == this.items2[2]){
                this.param.disp_yn = 'N'
            }
            if(this.typeitem2 == this.items2[0]){
                this.param.disp_yn = ''
            }
            this.param.disp_start_date = this.editedItem.disp_start_date
            .replace(/-/g,'')
            this.param.disp_end_date = this.editedItem.disp_end_date
            .replace(/-/g,'')
                // this.param.regStartDate = this.editedItem.reg_start_date.replace(/-/g,'')
            this.param.reg_start_date = this.editedItem.reg_start_date.replace(/-/g,'')
            this.param.reg_end_date = this.editedItem.reg_end_date.replace(/-/g,'')
            if(this.param.disp_start_date != '' && this.param.disp_end_date == ''){
                alert("노출종료일을 선택하세요")
                return
            }
            if(this.param.reg_start_date != '' && this.param.reg_end_date == ''){
                alert("등록일자를 선택하세요")
                return
            }
            // this.param.reg_date = this.editedItem.reg_start_date.replace(/-/g,'')
            // this.param.reg_date = this.editedItem.disp_end_date.replace(/-/g,'')
           
            this.$emit('search', this.param)
        },
        
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