<style src="../../../css/body.css"></style>

<template>
  <div>
    <p style="font-size:30px; font-weight:bold">{{ title }}</p>

    <table class="pop">
      <tr>
        <th>Wowza 서버 INDEX : </th> <td><input></td>
        <th>RTSP 포트 : </th> <td><input></td>
      </tr>
      <tr>
        <th>프로토콜 : </th> <td><input></td>
        <th>RTMP 포트 : </th> <td><input></td>
      </tr>
      <tr>
        <th>사설 IP : </th> <td><input></td>
        <th>RTMPS 포트 : </th> <td><input></td>
      </tr>
      <tr>
        <th>공인 IP : </th> <td><input></td>
        <th>WOWZA URL : </th> <td><input></td>
      </tr>
      <tr>
        <th>스트림 주소 : </th> <td><input></td>
        <th>WOWZA 상태 : </th> <td><input></td>
      </tr>
      <tr>
        <th>포트 : </th> <td><input></td>
        <th>GLS 여부: </th> <td><select><option value="Y">Y</option><option value="N">N</option></select></td>
      </tr>
      <tr>
        <th>계정 : </th> <td><input></td>
        <th>GLS RTC 포트 : </th> <td><input></td>
      </tr>
      <tr>
        <th>패스워드 : </th> 
        <td colspan="3"><input></td>
      </tr>
      <tr>
        <td colspan="4" style="text-align:center">
          <router-link to="/platform/streamer"><button>완료</button></router-link>
          <router-link to="/platform/streamer"><button>취소</button></router-link>
        </td>
      </tr>
    </table>

  </div>

</template>

<script>
export default {
  data () {
    return {
      title: '스트리머 관리'
    }
  }
}
</script>

<style scoped>

table.pop tr th {
  background :#cecece;
  text-align: right;
  font-weight: normal;
}

table.pop tr td {
  background :#cecece;
  text-align: left;
  padding : 10px;
}

table.pop{
  background : #cecece;
  padding : 10px 10px 10px 10px;
  margin : auto;
  margin-bottom: 100px;
}

</style>