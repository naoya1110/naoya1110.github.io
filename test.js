var now = new Date();

function ShowClock(){
    var target = document.getElementById("DateTimeDisp");

    var Year = now.getFullYear();
    var Month = now.getMonth()+1;
    var Date = now.getDate();
    var Hour = now.getHours();
    var Min = now.getMinutes();
    var Sec = now.getSeconds();
    var Day = now.getDay();
    var DayOfWeekStr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][Day];
    target.innerHTML = Year + "." + Month + ". " + Date + " " + DayOfWeekStr + " "+ Hour+":"+Min+":"+Sec
}
setInterval('ShowClock()',1000);
