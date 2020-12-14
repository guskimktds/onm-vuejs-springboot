<style src="../../../css/body.css"></style>

<template>
  <div>
    <p style="font-size:30px; font-weight:bold">{{ title }}</p>

<!-- search -->
    <table class="search">
      <tr>
        <td class="header">검색기간 : </td>
        <td><input> ~ <input></td>
        <td class="header">국사코드 : </td>
        <td colspan="2"><input></td>
      </tr>
      <tr>
        <td class="header">프로세스 : </td>
        <td><input></td>
        <td class="header">상태 : </td>
        <td><input></td>
        <td class="buttons" style="align:right" ><button>검색</button></td>
      </tr>
    </table>

<!-- contents -->
    <table class="contents">
      <tr>
        <th>국사코드</th>
        <th>서버명</th>
        <th>프로세스종류</th>
        <th>프로세스 명</th>
        <th>상태</th>
        <th>마지막 보고 일시</th>
      </tr>
      <tr>
        <td>1</td>
        <td>STM</td>
        <td>STREAM</td>
        <td>WowzaStreamingEngine</td>
        <td>U</td>
        <td>2018-06-27 06:38:22</td>
      </tr>
      <tr>
        <td>1</td>
        <td>TB_VSAAS_CTRL</td>
        <td>VMS</td>
        <td>vms_ctrl</td>
        <td>U</td>
        <td>2020-11-24 02:52:01</td>
      </tr>
      <tr>
        <td>1</td>
        <td>TB_VSAAS_INT</td>
        <td>INT</td>
        <td>int</td>
        <td>U</td>
        <td>2020-11-24 02:52:01</td>
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
      title: '프로세스 현황 화면'
    }
  }
}
</script>

<style scoped>

</style>