let stream;

function twoDigit(num) {
  let ret;
  if( num < 10 ) 
    ret = "0" + num; 
  else 
    ret = num; 
  return ret;
}

function threeDigit(num) {
  let ret;
  if( num < 100 ) 
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
  let nowMilliSec = threeDigit(twoDigit(nowTime.getMilliseconds()));
  let ret = nowYear + nowMonth + nowDate + "_" + nowHour + nowMin + nowSec + "_" + nowMilliSec;
  return ret;
}

async function scanCamera(){
  const devices = (await navigator.mediaDevices.enumerateDevices())
  .filter((device) => device.kind === 'videoinput')
  .map((device) => {
    return {
      text: device.label,
      value: device.deviceId,
    };
  });
  console.log(devices);
  console.log(devices.length)
}

async function scanCamera2(){
  const devices = (await navigator.mediaDevices.enumerateDevices())
  .filter((device) => device.kind === 'videoinput')
  console.log(devices);
  console.log(devices.length);
  return devices;
}


async function createWebcamSelect() {
  let devices = await scanCamera2();
  console.log("test")
  n = await devices.length;
  console.log("number of camera: " + n)
  for (i=0; i<n; i++){
    let select = document.getElementById("cameraSelect");
    let option = document.createElement("option");
    option.text = i + ": "+ devices[i].label;
    option.value = devices[i].deviceId;
    select.appendChild(option);
    console.log(option);
  }
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


async function loadAndPlay() {
  const selectedDeviceId = await document.getElementById("cameraSelect").value;
  console.log("selectedDeviceId:"+ selectedDeviceId)
  const frameSize = await document.getElementById("frameSize").value;
  console.log("frameSize:"+ frameSize)
  const video = document.getElementById('myVideo');
  stream = await getDeviceStream({
    video: {deviceId:selectedDeviceId, width:frameSize, height: frameSize,},
    audio: false
  });


  
  video.srcObject = stream;
}

flip_mode = 1;
function flip() {
  const video = document.getElementById('myVideo');
  flip_mode = flip_mode*(-1);
  video.style.transform="scaleX(" + flip_mode + ")"; //horizontal flip
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
  const selectedLabel = document.getElementById("labelSelect").value;
  const video = document.getElementById('myVideo');
  const canvas = document.getElementById('myCanvas');
  const frameSize = await document.getElementById("frameSize").value;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/jpeg");
  link.download = "label_"+selectedLabel+"_"+date_and_time()+ "_.jpg";
  link.click();

  // canvas.width = frameSize;
  // canvas.height = frameSize;
  // canvas.getContext('2d').drawImage(video, 0, 0);
}




