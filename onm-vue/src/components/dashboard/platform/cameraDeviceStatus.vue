<style src="../../../css/body.css"></style>

<template>
  <div>
    <p style="font-size:30px; font-weight:bold">{{ title }}</p>

<!-- search -->
    <table class="search">
      <tr>
        <td class="header">국사코드 : </td>
        <td><input></td>
        <td class="buttons" style="align:right" ><button>검색</button></td>
      </tr>
    </table>

<!-- contents -->
    <table class="contents">
      <tr>
        <th>국사코드</th>
        <th>전체</th>
        <th>정상</th>
        <th>개통 대기</th>
        <th>개통 진행</th>
        <th>개통 실패</th>
        <th>네트워크 장애</th>
      </tr>
      <tr>
        <td>1</td>
        <td>33</td>
        <td>345</td>
        <td>23</td>
        <td>123</td>
        <td>14</td>
        <td>56</td>
      </tr>
      <tr>
        <td>2</td>
        <td>68</td>
        <td>5</td>
        <td>56</td>
        <td>453</td>
        <td>88</td>
        <td>44</td>
      </tr>
      <tr>
        <td>3</td>
        <td>234</td>
        <td>34</td>
        <td>2323</td>
        <td>343</td>
        <td>123</td>
        <td>13</td>
      </tr>
      <tr>
        <td>4</td>
        <td>345</td>
        <td>54</td>
        <td>124</td>
        <td>23423</td>
        <td>2342</td>
        <td>345</td>
      </tr>
      <tr>
        <td>5</td>
        <td>234</td>
        <td>56</td>
        <td>88</td>
        <td>67</td>
        <td>55</td>
        <td>22</td>
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
      title: '카메라 상태현황'
    }
  }
}
</script>

<style scoped>
  
</style>