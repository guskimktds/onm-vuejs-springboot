<template>
  <v-container
      id="regular-tables"
      fluid
      tag="section"
    >

    <base-material-card
        color="orange"
        dark
        icon="mdi-keyboard"
        title="개통/해지 추이 LIST"
        class="px-5 py-3"
      >

      <v-data-table
        :headers="headers"
        :items="pList"
        class="elevation-1"
      >
      </v-data-table>

    </base-material-card>
  </v-container>
</template>

<script>
export default {
    props: ['pList'],
    data() {
      return {
        headers: [
          { text: '일자', value: 'date', align:'center' },
          // 매장
          { text: '가입', value: 'storeReg', align:'center'},
          { text: '해지', value: 'storeUnreg', align:'center' },

          // 카메라 
          { text: '개통', value: 'camReg', align:'center' },
          { text: '해지', value: 'camUnreg', align:'center' },

          // IOT
          { text: '개통', value: 'iotReg', align:'center' },
          { text: '해지', value: 'iotUnreg', align:'center' },
        ]
      }
    },
    
    mounted() {
      var table = document.getElementsByClassName("v-data-table-header");
      var row = document.createElement('tr');

      // 공백
      var space = document.createElement('th');

      // 매장 
      var m = document.createElement('th');
      m.setAttribute('colspan', '2');
      m.style.textAlign = "center";
      var mText = document.createTextNode('매장');
      m.appendChild(mText);

      // 카메라
      var c = document.createElement('th');
      c.setAttribute('colspan', '2');
      c.style.textAlign = "center";
      var cText = document.createTextNode('카메라');
      c.appendChild(cText);

      // IoT
      var i = document.createElement('th');
      i.setAttribute('colspan', '2');
      i.style.textAlign = "center";
      var iText = document.createTextNode('IoT');
      i.appendChild(iText);

      row.append(space)
      row.append(m);
      row.append(c);
      row.append(i);

      table[0].prepend(row);

  },
}
</script>


<style>
    
</style>