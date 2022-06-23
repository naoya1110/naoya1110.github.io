function twoDigit(num) {
    let ret;
    if( num < 10 ) 
      ret = "0" + num; 
    else 
      ret = num; 
    return ret;
  }
  function showClock() {
    let nowTime = new Date();
    let nowYear = nowTime.getFullYear();
    let nowMonth = twoDigit( nowTime.getMonth()+1 );
    let nowDate = twoDigit( nowTime.getDate() );
    let nowHour = twoDigit( nowTime.getHours() );
    let nowMin  = twoDigit( nowTime.getMinutes() );
    let nowSec  = twoDigit( nowTime.getSeconds() );
    let msg = " " + nowYear +"."+ nowMonth +"."+  nowDate + " "+  nowHour + ":" + nowMin + ":" + nowSec;
    document.getElementById("realtime").innerHTML = msg;
  }
  setInterval('showClock()',1000);
