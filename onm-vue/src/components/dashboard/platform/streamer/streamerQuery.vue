<template>
    <div>

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


    </div>
</template>
<script>
// import Popup from '../streamerStatusPopup;'

export default {
    // methods: {
    //     search: function() {
    //         this.$emit('search')
    //     }
    // },  
}

// export default new Router({
//     mode: 'history',
//     base: process.env.BASE_URL,
//     routes: [
//       { 
//         path: "/popup", 
//         name: 'popup',
//         component: Popup
//       }

//     ]
// })

</script>
<style>
    
</style>