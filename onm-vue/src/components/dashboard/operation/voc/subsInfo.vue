<template>
  <!-- <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">guid</th>
          <th class="text-left">
            said
          </th>
          <th class="text-left">
            pprodcd
          </th>
          <th class="text-left">
            pprodnm
          </th>
          <th class="text-left">
            bizpnm
          </th>
          <th class="text-left">
            custnm
          </th>
          <th class="text-left">otype</th>
          <th class="text-left">said</th>
          <th class="text-left">orderno</th>
          <th class="text-left">seq</th>
          <th class="text-left">utype</th>
          <th class="text-left">appoint</th>
          <th class="text-left">use</th>
          <th class="text-left">ctime</th>
          <th class="text-left">psaid</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="orderinfo in orderInfos"
          :key="orderinfo.guid"
        >
          <td>{{ orderinfo.guid }}</td>
          <td>{{ orderinfo.said }}</td>
          <td>{{ orderinfo.pprodcd }}</td>
          <td>{{ orderinfo.pprodnm }}</td>
          <td>{{ orderinfo.bizpnm }}</td>
          <td>{{ orderinfo.custnm }}</td>
          <td>{{ orderinfo.otype }}</td>
          <td>{{ orderinfo.said }}</td>
          <td>{{ orderinfo.orderno }}</td>
          <td>{{ orderinfo.seq }}</td>
          <td>{{ orderinfo.utype }}</td>
          <td>{{ orderinfo.appoint }}</td>
          <td>{{ orderinfo.use }}</td>
          <td>{{ orderinfo.ctime }}</td>
          <td>{{ orderinfo.psaid }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table> -->
  <v-data-table
    :headers="headers"
    :items="orderInfos"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
data () {
      return {
          headers: [
            {
                text: 'guid',
                align: 'start',
                value: 'guid',
            },
            { text: 'said', value: 'said' },
            { text: 'pprodcd', value: 'pprodcd' },
            // { text: 'Carbs (g)', value: 'carbs' },
            // { text: 'Protein (g)', value: 'protein' },
            // { text: 'Iron (%)', value: 'iron' },
            ],
          orderInfos: [
              {
                  guid: 'GPNA_20210623180256563_LVSPWS0001',
                  said: 'S21062318020' ,
                  pprodcd: 'B046',
                //   pprodnm: 'GiGAeyes i-specia',
                //   bizpnm: 'i-special_Test_2106231806',
                //   custnm: '엔비웨어_개발',
                //   otype: '4201',
                //   orderno: 'ORD21062318020',
                //   seq: '1',
                //   utype: '',
                //   appoint: '2021062318',
                //   use: 'Y',
                //   ctime: '21-06-23 18:03',
                //   psaid: 'P21062318020'
              }
            ]
        }
    }
}
</script>

<style scoped>

td {
    font-size: 1rem;
    height: 48px;
}
</style>