<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>국사코드</th><th>프로세스타입</th><th>프로세스명</th><th>상태</th><th>보고일시(Last)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(process, idx) in pList" :key="idx">
                    <td>{{process.local_gw_id}}</td>
                    <td>{{process.proc_type}}</td>
                    <td>{{process.proc_name}}</td>
                    <td>{{process.proc_status}}</td>
                    <td>{{process.last_upd_date}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    props: ['pList'],
    created() {
        console.log(this.props)
    }
}
</script>
<style>
    
</style>