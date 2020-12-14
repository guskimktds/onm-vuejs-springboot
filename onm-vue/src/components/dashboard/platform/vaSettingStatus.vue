<style src="../../../css/body.css"></style>

<template>
  <div>
    <p style="font-size:30px; font-weight:bold">{{ title }}</p>

<!-- search -->
    <table class="search">
      <tr>
        <td class="header">VA IP : </td>
        <td><input></td>
        <td class="header">VA 상태 : </td>
        <td><select><option>진체</option></select></td>
        <td class="buttons" style="align:right" ><button>검색</button></td>
      </tr>
    </table>

<!-- contents -->
    <table class="contents">
      <tr>
        <th>VA IP</th>
        <th>VA 상태</th>
        <th>최대용량</th>
        <th>요청 카메라</th>
        <th>분석 카메라</th>
        <th>중지 카메라</th>

        <th></th>
        <th>3rd VA 상태</th>
        <th>3rd 용량</th>
        <th>3rd 요청 카메라</th>
        <th>3rd 분석 카메라</th>
        <th>요약영상 처리</th>
        <th>가중치</th>

      </tr>
      <tr>
        <td>192.168.91.131</td>
        <td>SL</td>
        <td>400</td>
        <td>22</td>
        <td>8</td>
        <td>2</td>
        <td>6</td>
        <td>active</td>
        <td>320</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0.0550</td>
      </tr>
      <tr>
        <td>192.168.91.132</td>
        <td>MA</td>
        <td>400</td>
        <td>20</td>
        <td>17</td>
        <td>1</td>
        <td>16</td>
        <td>active</td>
        <td>320</td>
        <td>2</td>
        <td>1</td>
        <td>0</td>
        <td>0.0563</td>
      </tr>
      <tr>
        <td>192.168.91.133</td>
        <td>N1</td>
        <td>400</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>standby</td>
        <td>320</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0.0000</td>
      </tr>
    </table>

<!-- pager -->
  <ul class="pagination">
  <!-- li태그의 클래스에 disabled를 넣으면 마우스를 위에 올렸을 때 클릭 금지 마크가 나오고 클릭도 되지 않는다.-->
  <!-- disabled의 의미는 앞의 페이지가 존재하지 않다는 뜻이다. -->
    <li class="disabled">
      <a href="#">
        <span>«</span>
      </a>
    </li>
    <!-- li태그의 클래스에 active를 넣으면 색이 반전되고 클릭도 되지 않는다. -->
    <!-- active의 의미는 현재 페이지의 의미이다. -->
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
      title: 'VA 설정 현황'
    }
  }
}
</script>

<style scoped>

</style>