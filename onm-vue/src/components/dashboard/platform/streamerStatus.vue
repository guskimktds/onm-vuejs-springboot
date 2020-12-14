<style src="../../../css/body.css"></style>

<template>
  <div>
    <p style="font-size:30px; font-weight:bold">{{ title }}</p>

<!-- search -->
    <table style="width:100%; right:10px">
      <tr>
        <td class="buttons" style="text-align:right;">
          <router-link to="/platform/streamerPopup" style="color:black;"><button>추가</button></router-link>
          <router-link to="/platform/streamerPopup" style="color:black;"><button>수정</button></router-link>
          <button>삭제</button>
        </td>
      </tr>
    </table>

<!-- contents -->
    <table class="contents">
      <tr>
        <th>WOWZA 서버 인덱스</th>
        <th>프로토콜</th>
        <th>사설IP</th>
        <th>공인IP</th>
        <th>스트림주소</th>
        <th>포트</th>
        <th>계정</th>
        <th>패스워드</th>
        <th>RTSP 포트</th>
        <th>RTMP 포트</th>
        <th>RTMPS 포트</th>
        <th>WOWZA URL</th>
        <th>WOWZA 상태</th>
        <th>GLS 여부</th>
        <th>GLS RTC 포트</th>
      </tr>
      <tr>
        <td>2</td>
        <td>http</td>
        <td>192.168.1.162</td>
        <td>121.156.203.232</td>
        <td>test-tbstm2.ktvsaas.co.kr</td>
        <td>8087</td>
        <td>gigasurv</td>
        <td>Gigasurv@34</td>
        <td>1935</td>
        <td>1935</td>
        <td>8443</td>
        <td>http://192..168.91.162:58080</td>
        <td>N</td>
        <td>N</td>
        <td>8443</td>
      </tr>
      <tr>
        <td>1</td>
        <td>http</td>
        <td>192.168.1.161</td>
        <td>121.156.203.238</td>
        <td>test-tbstm1.ktvsaas.co.kr</td>
        <td>8087</td>
        <td>gigasurv</td>
        <td>Gigasurv@34</td>
        <td>1935</td>
        <td>1935</td>
        <td>8443</td>
        <td>http://192..168.91.162:58080</td>
        <td>Y</td>
        <td>Y</td>
        <td>8443</td>
      </tr>
      
    </table>

<!-- pager -->
  <ul class="pagination">
    <li class="disabled">
      <a href="#">
        <span>«</span>
      </a>
    </li>
    <li class="active"><a href="#">1</a></li>
    <li style="color:black"><a href="#">2</a></li>
    <li><a href="#">3</a></li>
    <li><a href="#">4</a></li>
    <li><a href="#">5</a></li>
    <li>
      <a href="#">
        <span>»</span>
      </a>
    </li>
  </ul>

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

</style>