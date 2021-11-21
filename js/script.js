//http://www.al-habib.info/islamic-calendar/hijricalendartext.htm
function gmod(n,m){
  return ((n%m)+m)%m;
}

function kuwaiticalendar(adjust){
  var today = new Date();
  if(adjust) {
    adjustmili = 1000*60*60*24*adjust; 
    todaymili = today.getTime()+adjustmili;
    today = new Date(todaymili);
  }
  day = today.getDate();
  month = today.getMonth();
  year = today.getFullYear();
  m = month+1;
  y = year;
  if(m<3) {
    y -= 1;
    m += 12;
  }

  a = Math.floor(y/100.);
  b = 2-a+Math.floor(a/4.);
  if(y<1583) b = 0;
  if(y==1582) {
    if(m>10)  b = -10;
    if(m==10) {
      b = 0;
      if(day>4) b = -10;
    }
  }

  jd = Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+day+b-1524;

  b = 0;
  if(jd>2299160){
    a = Math.floor((jd-1867216.25)/36524.25);
    b = 1+a-Math.floor(a/4.);
  }
  bb = jd+b+1524;
  cc = Math.floor((bb-122.1)/365.25);
  dd = Math.floor(365.25*cc);
  ee = Math.floor((bb-dd)/30.6001);
  day =(bb-dd)-Math.floor(30.6001*ee);
  month = ee-1;
  if(ee>13) {
    cc += 1;
    month = ee-13;
  }
  year = cc-4716;

  if(adjust) {
    wd = gmod(jd+1-adjust,7)+1;
  } else {
    wd = gmod(jd+1,7)+1;
  }

  iyear = 10631./30.;
  epochastro = 1948084;
  epochcivil = 1948085;

  shift1 = 8.01/60.;

  z = jd-epochastro;
  cyc = Math.floor(z/10631.);
  z = z-10631*cyc;
  j = Math.floor((z-shift1)/iyear);
  iy = 30*cyc+j;
  z = z-Math.floor(j*iyear+shift1);
  im = Math.floor((z+28.5001)/29.5);
  if(im==13) im = 12;
  id = z-Math.floor(29.5001*im-29);

  var myRes = new Array(8);

  myRes[0] = day; //calculated day (CE)
  myRes[1] = month-1; //calculated month (CE)
  myRes[2] = year; //calculated year (CE)
  myRes[3] = jd-1; //julian day number
  myRes[4] = wd-1; //weekday number
  myRes[5] = id; //islamic date
  myRes[6] = im-1; //islamic month
  myRes[7] = iy; //islamic year

  return myRes;
}

function writeIslamicDate(adjustment) {
  var wdNames = new Array("Ahad","Ithnin","Thulatha","Arbaa","Khams","Jumuah","Sabt");
  var iMonthNames = new Array("Muharram","Safar","Rabi'ul Awwal","Rabi'ul Akhir","Jumadal Ula","Jumadal Akhira","Rajab","Sha'ban","Ramadan","Shawwal","Dhul Qa'ada","Dhul Hijja");
  var iDate = kuwaiticalendar(adjustment);
  var outputIslamicDate = wdNames[iDate[4]] + ", " + iDate[5] + " " + iMonthNames[iDate[6]] + " " + iDate[7] + " AH";
  return outputIslamicDate;
}

var cur_date;
function updateJam() {
  var date = new Date();
  var jam = date.getHours();
  if (jam < 10) {
    jam = "0" + jam;
  }
  var menit = date.getMinutes();
  if (menit < 10) {
    menit = "0" + menit;
  }
  var detik = date.getSeconds();
  if (detik < 10) {
    detik = "0" + detik;
  }
  document.getElementById("digital").innerHTML = jam + ":" + menit + ":" + detik;
  if (cur_date != date.getDate()) {
    var tahun = date.getFullYear();
    var bulan = date.getMonth();
    var tanggal = date.getDate();
    var hari = date.getDay();
    var list_hari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu"];
    var list_bulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    document.getElementById("tanggal").innerHTML = list_hari[hari] + ", " + tanggal + " " + list_bulan[bulan] + " " + tahun;
    document.getElementById("tanggal-hijri").innerHTML = writeIslamicDate();
    cur_date = tanggal;
    console.log("update!");
  }
}

setInterval(updateJam, 1000);

function callApi(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(true, xhr.responseText);
    } else {
      callback(false, xhr.responseText);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

callApi("https://api.myquran.com/v1/sholat/jadwal/1609/2021/11/20", function(status, response) {
  if (status) {
    var api = JSON.parse(response);
    document.getElementById("imsak").innerHTML = api.data.jadwal.imsak;
    document.getElementById("subuh").innerHTML = api.data.jadwal.subuh;
    document.getElementById("dzuhur").innerHTML = api.data.jadwal.dzuhur;
    document.getElementById("ashar").innerHTML = api.data.jadwal.ashar;
    document.getElementById("maghrib").innerHTML = api.data.jadwal.maghrib;
    document.getElementById("isya").innerHTML = api.data.jadwal.isya;
  } else {
    console.log("Error : " + response);
  }
});
