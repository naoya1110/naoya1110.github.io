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


function addOption() {
  // selectタグを取得する
  var select = document.getElementById("sampleSelect");
  // optionタグを作成する
  var option = document.createElement("option");
  // optionタグのテキストを4に設定する
  option.text = 4;
  // optionタグのvalueを4に設定する
  option.value = 4;
  // selectタグの子要素にoptionタグを追加する
  select.appendChild(option);
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
    option.value = i + devices[i].deviceId;
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
  const video = document.getElementById('myVideo');
  stream = await getDeviceStream({
    video: { width: 320, height: 320, deviceId:selectedDeviceId }, audio: false});
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


function capture(filename){
  const video = document.getElementById('myVideo');
  const canvas = document.getElementById('myCanvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/jpeg");
  link.download = filename
  link.click();
}

function capture_0(){
  capture("label_0_" + date_and_time()+ "_.jpg");
}

function capture_1(){
  capture("label_1_" + date_and_time()+ "_.jpg");
}

function capture_2(){
  capture("label_2_" + date_and_time()+ "_.jpg");
}



