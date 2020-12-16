<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th></th>
                    <th>사번</th>
                    <th>이름</th>
                    <th>권한</th>
                    <th>생성일자</th>
                    <th>수정일자</th>
                    <th>생성자</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.vo1">
                    <td><input type="checkbox" v-model="identification_number" value="item.vo1"></td>
                    <td>{{item.vo1}}</td>
                    <td>{{item.vo2}}</td>
                    <td>{{item.vo3}}</td>
                    <td>{{item.vo4}}</td>
                    <td>{{item.vo5}}</td>
                    <td>{{item.vo6}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    props: ['pList'],

    data(){
        return{
            identification_number : [],
        }
    },
    
    created() {
        console.log(this.props)
    }
}
</script>