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
  
 
    const dateInfo = {
        current
    }
// //   const dateInfo = year
//   var d = new Date(); 
//   var dateInfo = d.getFullYear() + "" + ("00" + (d.getMonth() + 1)).slice(-2) + "" + ("00" + d.getDate()).slice(-2) + "" + ("00" + d.getHours()).slice(-2) + "" + ("00" + d.getMinutes()).slice(-2) + "" + ("00" + d.getSeconds()).slice(-2)
  return dateInfo
}