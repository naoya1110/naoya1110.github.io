let stream;

function twoDigit(num) {
  let ret;
  if( num < 10 ) 
    ret = "0" + num; 
  else 
    ret = num; 
  return ret;
}

function date_and_time(){
  let nowTime = new Date();
  let nowYear = nowTime.getFullYear();
  let nowMonth = twoDigit( nowTime.getMonth()+1 );
  let nowDate = twoDigit( nowTime.getDate() );
  let nowHour = twoDigit( nowTime.getHours() );
  let nowMin  = twoDigit( nowTime.getMinutes() );
  let nowSec  = twoDigit( nowTime.getSeconds() );
  let ret = nowYear + nowMonth + nowDate + "_" + nowHour + nowMin + nowSec;
  return ret;
}

async function loadAndPlay() {
  const video = document.getElementById('myVideo');
  stream = await getDeviceStream({
    video: { width: 320, height: 320 }, audio: false});
  video.srcObject = stream;
}

function stop() {
  const video = document.getElementById('myVideo');
  const canvas = document.getElementById('myCanvas');
  const tracks = stream.getTracks();
  tracks.forEach((track) => {track.stop();});
  video.srcObject = null;
  canvas.getContext('2d').clearRect(0, 0, 320, 320)
}

function capture(){
  const video = document.getElementById('myVideo');
  const canvas = document.getElementById('myCanvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/jpeg");
  link.download = date_and_time()+"_xxx.jpg";
  link.click();
}

function getDeviceStream(option) {
  if ('getUserMedia' in navigator.mediaDevices) {
    return navigator.mediaDevices.getUserMedia(option);
  } else {
    return new Promise(function(resolve, reject) {
      navigator.getUserMedia(option, resolve, reject);
    });
  }
}
