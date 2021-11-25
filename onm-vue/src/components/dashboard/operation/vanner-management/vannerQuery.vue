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
                <v-text>배너타입</v-text>
            </v-col>
            <v-col >
            <v-select 
            label="전체"
            :items="items"
            v-model="param.img_type"
            @change="changeValue"
            solo
            style="width: 150px;"
            >
            </v-select>
            </v-col>
            <v-col style="padding-top:25px; flex:0 0 5%;" cols="auto" v-model="param.img_name">
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
            v-model="this.param.disp_yn"
            label="전체"
            solo
            style="width: 150px;"
            >
            </v-select></v-col>
            <v-col  cols="2">
                <v-btn class="black" right absolute
                 @click="searchMethod"
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
                        v-model="param.disp_start_date"
                        prepend-icon="mdi-calendar"
                        readonly
                        label="시작일"
                        v-bind="attrs"
                        v-on="on"
                        style="width:150px"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.disp_start_date" no-title scrollable type="date">
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
                        v-model="param.disp_end_date"
                        prepend-icon="mdi-calendar"
                        readonly
                        label="종료일"
                        v-bind="attrs"
                        v-on="on"
                        style="width:150px"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.disp_end_date" no-title scrollable type="date">
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
                        v-model="param.reg_date"
                        label="시작일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        style="width:150px"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.reg_date" no-title scrollable type="date">
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
                        v-model="param.reg_date"
                        label="종료일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        style="width:150px"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.reg_date" no-title scrollable type="date">
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
            images: [],
            items: ["전체", "타입명 A", "타입명 B", "타입명 C"],
            items2: ["전체", "노출", "미노출"],
            vitem:'전체',
            vitem2: '',
            editedItem: {
                img_type: '',
                disp_yn: '',
                img_name: '',
                disp_start_date: '',
                disp_end_date: '',
                reg_date: '',
                cmd_type: '',
                local_gw_id: '0',
            },
            defaultItem: {
                img_type: '',
                disp_yn: '',
                img_name: '',
                disp_start_date: '',
                disp_end_date: '',
                reg_date: '',
                cmd_type: 'I',
                local_gw_id: '0',
            },
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
            // if(this.editedItem.img_type=="전체"){
            //     this.param.process_status=''
            // }else{
            //     this.param.process_status=this.editedItem.img_type
            // }
            if(this.param.disp_yn == '노출'){
                this.param.disp_yn = 'Y'
            }
            if(this.param.disp_yn == '미노출'){
                this.param.disp_yn = 'N'
            }
            if(this.param.disp_yn == '전체'){
                this.param.disp_yn = ''
            }
            this.$emit('search', this.param)
            console.log(this.param)
            console.log(this.editedItem)
            
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
        changeValue(){
            if(this.param.img_type == this.items[1]){
                    this.param.img_type = '01'
            }
            if(this.param.img_type == '타입명 B'){
                    this.param.img_type = '02'
            }
            if(this.param.img_type == '타입명 C'){
                    this.param.img_type = '03'
            }
            if(this.param.img_type == '전체'){
                    this.param.img_type = ''
            }
            this.searchMethod()
            console.log(this.param)
        },
        test123(){
            console.log(this.param)
            
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