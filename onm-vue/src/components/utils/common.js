export default () => {
//   const now = new Date();
//   const year = now.getFullYear()
//   const month = now.getMonth() + 1
//   const date = now.getDate()
//   const hour = now.getHours()
// //   const weekList = new Array(
// //     "Sun.",
// //     "Mon.",
// //     "Tue.",
// //     "Wed.",
// //     "Thu.",
// //     "Fri.",
// //     "Sat."
// //   );
// //   const week = weekList[now.getDay()];
// //   const time = now.getTime();
    var d = new Date(); 
    var current = d.getFullYear() + "" + ("00" + (d.getMonth() + 1)).slice(-2) + "" + ("00" + d.getDate()).slice(-2) + "" + ("00" + d.getHours()).slice(-2) + "" + ("00" + d.getMinutes()).slice(-2) + "" + ("00" + d.getSeconds()).slice(-2)

    var currentDate = d.getFullYear() + "" + ("00" + (d.getMonth() + 1)).slice(-2) + "" + ("00" + d.getDate()).slice(-2) 

 
    //일주일전
    var dw = new Date()
    var dayOfMonth = dw.getDate()    
    dw.setDate(dayOfMonth - 7)
    var lastWeek = dw.getFullYear() + "" + ("00" + (dw.getMonth() + 1)).slice(-2) + "" + ("00" + dw.getDate()).slice(-2) 

    //1개월전
    var dm = new Date();
    var monthOfYear = dm.getMonth();
    dm.setMonth(monthOfYear - 1)
    var lastMonth = dm.getFullYear() + "" + ("00" + (dm.getMonth() + 1)).slice(-2) + "" + ("00" + dm.getDate()).slice(-2) 
 
    const dateInfo = {
        current,
        currentDate,
        lastWeek,
        lastMonth
    }
// //   const dateInfo = year
//   var d = new Date(); 
//   var dateInfo = d.getFullYear() + "" + ("00" + (d.getMonth() + 1)).slice(-2) + "" + ("00" + d.getDate()).slice(-2) + "" + ("00" + d.getHours()).slice(-2) + "" + ("00" + d.getMinutes()).slice(-2) + "" + ("00" + d.getSeconds()).slice(-2)
  return dateInfo
}