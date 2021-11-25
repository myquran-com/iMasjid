
var url = new URL(window.location.href);
var action = url.searchParams.get("action");
var id_lokasi = url.searchParams.get("id");
if (id_lokasi == null) {
  id_lokasi = "1609";
}

var list_nama = ["Imsak","Subuh","Dzuhur","Ashar","Maghrib","Isya"];
var list_jadwal = [];
var cur_date; 

if (action == "setting") {
  document.getElementById("setting").style.display = "block";
} else if (action == "preview") {
  var head_type = url.searchParams.get("ht");
  var hide_alamat = url.searchParams.get("ha");
  var hide_jam = url.searchParams.get("hj");
  var hide_second = url.searchParams.get("hs");
  var hide_masehi = url.searchParams.get("hm");
  var hide_hijri = url.searchParams.get("hh");
  var nama = url.searchParams.get("nama");
  var alamat = url.searchParams.get("alamat");
  var content_type = url.searchParams.get("ct");
  var jadwal_type = url.searchParams.get("jt");
  var informasi_1 = url.searchParams.get("info1");
  var informasi_2 = url.searchParams.get("info2");
  if (head_type == "1") {
    var p_node_nama = document.createElement("p");
    p_node_nama.className = "nama";
    var p_textnode_nama = document.createTextNode(nama);
    p_node_nama.appendChild(p_textnode_nama);

    var p_node_alamat = document.createElement("p");
    p_node_alamat.className = "alamat";
    if (hide_jam == "true" && hide_masehi == "true" && hide_hijri == "true") {
      p_node_nama.style.textAlign = "center";
      p_node_alamat.style.textAlign = "center";
    } else {
      p_node_nama.style.textAlign = "left";
      p_node_alamat.style.textAlign = "left";
    }
    var p_textnode_alamat = document.createTextNode(alamat);
    p_node_alamat.appendChild(p_textnode_alamat);
    if (hide_jam == "false") {
      document.getElementById("head-kiri").style.width = "40%";
    } else {
      if (hide_jam != "false" || hide_masehi != "false" || hide_hijri != "false") {
        document.getElementById("head-kiri").style.width = "60%";
      }
    }
    if (hide_jam == "true" && hide_masehi == "true" && hide_hijri == "true") {
      document.getElementById("head-tengah").appendChild(p_node_nama);
      if (hide_alamat == "false") {
        document.getElementById("head-tengah").appendChild(p_node_alamat);
      }
      document.getElementById("head-tengah").style.width = "100%";
    } else {
      document.getElementById("head-kiri").appendChild(p_node_nama);
      if (hide_alamat == "false") {
        document.getElementById("head-kiri").appendChild(p_node_alamat);
      }
    }

    if (hide_jam == "false") {
      var p_node_jam = document.createElement("p");
      p_node_jam.className = "jam";
      p_node_jam.style.textAlign = "center";
      var span_node_jam = document.createElement("span");
      span_node_jam.id = "jam";
      var span_textnode_jam = document.createTextNode("--");
      span_node_jam.appendChild(span_textnode_jam);
      p_node_jam.appendChild(span_node_jam);
      var span_node_tanda_kiri = document.createElement("span");
      var span_textnode_tanda_kiri = document.createTextNode(":");
      span_node_tanda_kiri.appendChild(span_textnode_tanda_kiri);
      p_node_jam.appendChild(span_node_tanda_kiri);
      var span_node_menit = document.createElement("span");
      span_node_menit.id = "menit";
      var span_textnode_menit = document.createTextNode("--");
      span_node_menit.appendChild(span_textnode_menit);
      p_node_jam.appendChild(span_node_menit);
      if (hide_second == "false") {
        var span_node_tanda_kanan = document.createElement("span");
        var span_textnode_tanda_kanan = document.createTextNode(":");
        span_node_tanda_kanan.appendChild(span_textnode_tanda_kanan);
        p_node_jam.appendChild(span_node_tanda_kanan);
        var span_node_detik = document.createElement("span");
        span_node_detik.id = "detik";
        var span_textnode_detik = document.createTextNode("--");
        span_node_detik.appendChild(span_textnode_detik);
        p_node_jam.appendChild(span_node_detik);
      }
      document.getElementById("head-tengah").appendChild(p_node_jam);
      document.getElementById("head-tengah").style.width = "20%";
    }

    if (hide_masehi == "false") {
      var p_node_masehi = document.createElement("p");
      p_node_masehi.className = "tanggal";
      p_node_masehi.id = "tanggal";
      p_node_masehi.style.textAlign = "right";
      p_node_masehi.style.fontSize = "2.2vw";
      var p_textnode_masehi = document.createTextNode("-, -/-/-");
      p_node_masehi.appendChild(p_textnode_masehi);
      document.getElementById("head-kanan").appendChild(p_node_masehi);
    }

    if (hide_hijri == "false") {
      var hr_node = document.createElement("hr");
      hr_node.style.margin = "1vh 0 1vh 12vw";
      document.getElementById("head-kanan").appendChild(hr_node);

      var p_node_hijri = document.createElement("p");
      p_node_hijri.className = "tanggal";
      p_node_hijri.id = "tanggal-hijri";
      p_node_hijri.style.textAlign = "right";
      p_node_hijri.style.fontSize = "1.8vw";
      var p_textnode_hijri = document.createTextNode("-, -/-/-");
      p_node_hijri.appendChild(p_textnode_hijri);
      document.getElementById("head-kanan").appendChild(p_node_hijri);
    }
    if (hide_masehi == "false" || hide_hijri == "false") {
      document.getElementById("head-kanan").style.width = "40%";
    }
  } else if (head_type == "2") {
    if (hide_masehi == "false") {
      var p_node_masehi = document.createElement("p");
      p_node_masehi.className = "tanggal";
      p_node_masehi.id = "tanggal";
      p_node_masehi.style.textAlign = "left";
      p_node_masehi.style.fontSize = "2.2vw";
      var p_textnode_masehi = document.createTextNode("-, -/-/-");
      p_node_masehi.appendChild(p_textnode_masehi);
      document.getElementById("head-kiri").appendChild(p_node_masehi);
    }

    if (hide_hijri == "false") {
      var hr_node = document.createElement("hr");
      hr_node.style.margin = "1vh 1vw 1vh 0";
      document.getElementById("head-kiri").appendChild(hr_node);

      var p_node_hijri = document.createElement("p");
      p_node_hijri.className = "tanggal";
      p_node_hijri.id = "tanggal-hijri";
      p_node_hijri.style.textAlign = "left";
      p_node_hijri.style.fontSize = "1.6vw";
      var p_textnode_hijri = document.createTextNode("-, -/-/-");
      p_node_hijri.appendChild(p_textnode_hijri);
      document.getElementById("head-kiri").appendChild(p_node_hijri);
    }
    if (hide_masehi == "false" || hide_hijri == "false") {
      document.getElementById("head-kiri").style.width = "25%";
    }

    var p_node_nama = document.createElement("p");
    p_node_nama.className = "nama";
    p_node_nama.style.textAlign = "center";
    var p_textnode_nama = document.createTextNode(nama);
    p_node_nama.appendChild(p_textnode_nama);
    document.getElementById("head-tengah").appendChild(p_node_nama);

    var p_node_alamat = document.createElement("p");
    p_node_alamat.className = "alamat";
    p_node_alamat.style.textAlign = "center";
    var p_textnode_alamat = document.createTextNode(alamat);
    p_node_alamat.appendChild(p_textnode_alamat);
    if (hide_alamat == "false") {
      document.getElementById("head-tengah").appendChild(p_node_alamat);
    }
    if (hide_jam == "false") {
      document.getElementById("head-tengah").style.width = "50%";
    } else {
      document.getElementById("head-tengah").style.width = "75%";
    }
    if (hide_jam == "true" && hide_masehi == "true" && hide_hijri == "true") {
      document.getElementById("head-tengah").style.width = "100%";
    }

    if (hide_jam == "false") {
      var p_node_jam = document.createElement("p");
      p_node_jam.className = "jam";
      p_node_jam.style.textAlign = "right";
      var span_node_jam = document.createElement("span");
      span_node_jam.id = "jam";
      var span_textnode_jam = document.createTextNode("--");
      span_node_jam.appendChild(span_textnode_jam);
      p_node_jam.appendChild(span_node_jam);
      var span_node_tanda_kiri = document.createElement("span");
      var span_textnode_tanda_kiri = document.createTextNode(":");
      span_node_tanda_kiri.appendChild(span_textnode_tanda_kiri);
      p_node_jam.appendChild(span_node_tanda_kiri);
      var span_node_menit = document.createElement("span");
      span_node_menit.id = "menit";
      var span_textnode_menit = document.createTextNode("--");
      span_node_menit.appendChild(span_textnode_menit);
      p_node_jam.appendChild(span_node_menit);
      if (hide_second == "false") {
        var span_node_tanda_kanan = document.createElement("span");
        var span_textnode_tanda_kanan = document.createTextNode(":");
        span_node_tanda_kanan.appendChild(span_textnode_tanda_kanan);
        p_node_jam.appendChild(span_node_tanda_kanan);
        var span_node_detik = document.createElement("span");
        span_node_detik.id = "detik";
        var span_textnode_detik = document.createTextNode("--");
        span_node_detik.appendChild(span_textnode_detik);
        p_node_jam.appendChild(span_node_detik);
      }
      document.getElementById("head-kanan").appendChild(p_node_jam);
      document.getElementById("head-kanan").style.width = "25%";
    }
  } else if (head_type == "3") {
    var p_node_nama = document.createElement("p");
    p_node_nama.className = "nama";
    var p_textnode_nama = document.createTextNode(nama);
    p_node_nama.appendChild(p_textnode_nama);

    var p_node_alamat = document.createElement("p");
    p_node_alamat.className = "alamat";
    var p_textnode_alamat = document.createTextNode(alamat);
    p_node_alamat.appendChild(p_textnode_alamat);
    if (hide_jam == "true" && hide_masehi == "true" && hide_hijri == "true") {
      p_node_nama.style.textAlign = "center";
      p_node_alamat.style.textAlign = "center";
      document.getElementById("head-tengah").appendChild(p_node_nama);
      if (hide_alamat == "false") {
        document.getElementById("head-tengah").appendChild(p_node_alamat);
      }
      document.getElementById("head-tengah").style.width = "100%";
    } else {
      p_node_nama.style.textAlign = "left";
      p_node_alamat.style.textAlign = "left";
      document.getElementById("head-kiri").style.width = "80%";
      document.getElementById("head-kiri").appendChild(p_node_nama);
      if (hide_alamat == "false") {
        document.getElementById("head-kiri").appendChild(p_node_alamat);
      }
    }

    if (hide_jam == "false") {
      var p_node_jam = document.createElement("p");
      p_node_jam.className = "jam";
      p_node_jam.style.textAlign = "center";
      p_node_jam.style.fontSize = "3.6vw";
      p_node_jam.style.margin = "0";
      var span_node_jam = document.createElement("span");
      span_node_jam.id = "jam";
      var span_textnode_jam = document.createTextNode("--");
      span_node_jam.appendChild(span_textnode_jam);
      p_node_jam.appendChild(span_node_jam);
      var span_node_tanda_kiri = document.createElement("span");
      var span_textnode_tanda_kiri = document.createTextNode(":");
      span_node_tanda_kiri.appendChild(span_textnode_tanda_kiri);
      p_node_jam.appendChild(span_node_tanda_kiri);
      var span_node_menit = document.createElement("span");
      span_node_menit.id = "menit";
      var span_textnode_menit = document.createTextNode("--");
      span_node_menit.appendChild(span_textnode_menit);
      p_node_jam.appendChild(span_node_menit);
      if (hide_second == "false") {
        var span_node_tanda_kanan = document.createElement("span");
        var span_textnode_tanda_kanan = document.createTextNode(":");
        span_node_tanda_kanan.appendChild(span_textnode_tanda_kanan);
        p_node_jam.appendChild(span_node_tanda_kanan);
        var span_node_detik = document.createElement("span");
        span_node_detik.id = "detik";
        var span_textnode_detik = document.createTextNode("--");
        span_node_detik.appendChild(span_textnode_detik);
        p_node_jam.appendChild(span_node_detik);
      }
      document.getElementById("head-kanan").appendChild(p_node_jam);
    }

    if (hide_masehi == "false") {
      var p_node_masehi = document.createElement("p");
      p_node_masehi.className = "tanggal";
      p_node_masehi.id = "tanggal";
      p_node_masehi.style.textAlign = "center";
      if (hide_hijri == "false") {
        if (hide_jam == "false") {
          p_node_masehi.style.fontSize = "1.2vw";
        } else {
          p_node_masehi.style.fontSize = "1.8vw";
        }
      } else {
        if (hide_jam == "false") {
          p_node_masehi.style.fontSize = "1.6vw";
        } else {
          p_node_masehi.style.fontSize = "1.8vw";
        }
      }
      p_node_masehi.style.margin = "0";
      var p_textnode_masehi = document.createTextNode("-, -/-/-");
      p_node_masehi.appendChild(p_textnode_masehi);
      document.getElementById("head-kanan").appendChild(p_node_masehi);
    }

    if (hide_hijri == "false") {
      var p_node_hijri = document.createElement("p");
      p_node_hijri.className = "tanggal";
      p_node_hijri.id = "tanggal-hijri";
      p_node_hijri.style.textAlign = "center";
      if (hide_jam == "false") {
        p_node_hijri.style.fontSize = "1.2vw";
      } else {
        p_node_hijri.style.fontSize = "1.4vw";
      }
      p_node_hijri.style.margin = "0";
      var p_textnode_hijri = document.createTextNode("-, -/-/-");
      p_node_hijri.appendChild(p_textnode_hijri);
      document.getElementById("head-kanan").appendChild(p_node_hijri);
    }
    if (hide_jam != "false" || hide_masehi != "false" || hide_hijri != "false") {
      document.getElementById("head-kanan").style.width = "20%";
    }
  }
  if (content_type == "1") {
    document.getElementById("content").style.alignItems = "flex-end";
    document.getElementById("content").style.flexDirection = "row";
  } else if (content_type == "2") {
    document.getElementById("content").style.alignItems = "flex-start";
    document.getElementById("content").style.flexDirection = "row";
  } else if (content_type == "3") {
    document.getElementById("content").style.alignItems = "flex-start";
    document.getElementById("content").style.flexDirection = "column";
    document.getElementById("akhir").style.marginBottom = "-4vh";
  } else if (content_type == "4") {
    document.getElementById("content").style.alignItems = "flex-end";
    document.getElementById("content").style.flexDirection = "column";
    document.getElementById("akhir").style.marginBottom = "-4vh";
  }
  if (jadwal_type == "2") {
    var m0 = document.getElementsByClassName("m0");
    for (var i = 0; i < m0.length; i++) {
      m0[i].style.display = "block";
    }
  }
  var p_node_info_1 = document.createElement("p");
  var p_textnode_info_1 = document.createTextNode(informasi_1);
  p_node_info_1.appendChild(p_textnode_info_1);
  document.getElementById("informasi").appendChild(p_node_info_1);
  var p_node_info_2 = document.createElement("p");
  var p_textnode_info_2 = document.createTextNode(informasi_2);
  p_node_info_2.appendChild(p_textnode_info_2);
  document.getElementById("informasi").appendChild(p_node_info_2);
  document.getElementById("preview").style.display = "block";
}

function callApi(url_api, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(true, xhr.responseText);
    } else {
      callback(false, xhr.responseText);
    }
  };
  var date = new Date();
  //console.log(url_api + id_lokasi + "/" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate());
  xhr.open("GET", url_api + id_lokasi + "/" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate(), true);
  xhr.send();
}

callApi("https://api.myquran.com/v1/sholat/jadwal/", function(status, response) {
  if (status) {
    var api = JSON.parse(response);
    document.getElementById("imsak").innerHTML = api.data.jadwal.imsak;
    list_jadwal.push(api.data.jadwal.imsak);
    document.getElementById("subuh").innerHTML = api.data.jadwal.subuh;
    list_jadwal.push(api.data.jadwal.subuh);
    document.getElementById("dzuhur").innerHTML = api.data.jadwal.dzuhur;
    list_jadwal.push(api.data.jadwal.dzuhur);
    document.getElementById("ashar").innerHTML = api.data.jadwal.ashar;
    list_jadwal.push(api.data.jadwal.ashar);
    document.getElementById("maghrib").innerHTML = api.data.jadwal.maghrib;
    list_jadwal.push(api.data.jadwal.maghrib);
    document.getElementById("isya").innerHTML = api.data.jadwal.isya;
    list_jadwal.push(api.data.jadwal.isya);
  } else {
    console.log("Error : " + response);
  }
});

//http://www.al-habib.info/islamic-calendar/hijricalendartext.htm
function gmod(n, m) {
  return ((n % m) + m) % m;
}

function kuwaiticalendar(adjust) {
  var today = new Date();
  if (adjust) {
  adjustmili = 1000*60*60*24*adjust; 
  todaymili = today.getTime()+adjustmili;
  today = new Date(todaymili);
  }
  day = today.getDate();
  month = today.getMonth();
  year = today.getFullYear();
  m = month+1;
  y = year;
  if (m < 3) {
    y -= 1;
    m += 12;
  }

  a = Math.floor(y / 100.);
  b = 2-a+Math.floor(a / 4.);
  if (y < 1583) b = 0;
  if (y == 1582) {
    if (m > 10)  b = -10;
    if (m == 10) {
      b = 0;
      if (day > 4) b = -10;
    }
  }

  jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;

  b = 0;
  if (jd > 2299160) {
    a = Math.floor((jd - 1867216.25) / 36524.25);
    b = 1 + a - Math.floor(a / 4.);
  }
  bb = jd + b + 1524;
  cc = Math.floor((bb - 122.1) / 365.25);
  dd = Math.floor(365.25 * cc);
  ee = Math.floor((bb-dd) / 30.6001);
  day = (bb - dd) - Math.floor(30.6001 * ee);
  month = ee - 1;
  if (ee > 13) {
    cc += 1;
    month = ee - 13;
  }
  year = cc - 4716;

  if (adjust) {
    wd = gmod(jd + 1 - adjust, 7) + 1;
  } else {
    wd = gmod(jd + 1, 7) + 1;
  }

  iyear = 10631. / 30.;
  epochastro = 1948084;
  epochcivil = 1948085;

  shift1 = 8.01 / 60.;

  z = jd - epochastro;
  cyc = Math.floor(z / 10631.);
  z = z - 10631 * cyc;
  j = Math.floor((z - shift1) / iyear);
  iy = 30 * cyc + j;
  z = z-Math.floor(j * iyear + shift1);
  im = Math.floor((z + 28.5001) / 29.5);
  if (im == 13) im = 12;
  id = z - Math.floor(29.5001 * im - 29);

  var myRes = new Array(8);

  myRes[0] = day; //calculated day (CE)
  myRes[1] = month - 1; //calculated month (CE)
  myRes[2] = year; //calculated year (CE)
  myRes[3] = jd - 1; //julian day number
  myRes[4] = wd - 1; //weekday number
  myRes[5] = id; //islamic date
  myRes[6] = im - 1; //islamic month
  myRes[7] = iy; //islamic year

  return myRes;
}

function writeIslamicDate(adjustment) {
  var wdNames = new Array("Ahad","Ithnin","Thulatha","Arbaa","Khams","Jumuah","Sabt");
  var iMonthNames = new Array("Muharram","Safar","Rabi'ul Awwal","Rabi'ul Akhir","Jumadal Ula","Jumadal Akhira","Rajab","Sha'ban","Ramadan","Shawwal","Dhul Qa'ada","Dhul Hijja");
  var iDate = kuwaiticalendar(adjustment);
  var outputIslamicDate = wdNames[iDate[4]] + ", " + iDate[5] + " " + iMonthNames[iDate[6]] + " " + iDate[7] + " H";
  return outputIslamicDate;
}

function updateJam() {
  if (action != "preview") {
    return;
  }
  var date = new Date();
  //date.setHours(1);
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
  var hour = document.getElementById("jam");
  if (hour != null) {
    hour.innerHTML = jam;
  }
  var minute = document.getElementById("menit");
  if (minute != null) {
    minute.innerHTML = menit;
  }
  var second = document.getElementById("detik");
  if (second != null) {
    second.innerHTML = detik;
  }
  if (cur_date != date.getDate()) {
    var tahun = date.getFullYear();
    var bulan = date.getMonth();
    var tanggal = date.getDate();
    var hari = date.getDay();
    var list_hari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu"];
    var list_bulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    var tanggal_masehi = document.getElementById("tanggal");
    if (tanggal_masehi != null) {
      tanggal_masehi.innerHTML = list_hari[hari] + ", " + tanggal + " " + list_bulan[bulan] + " " + tahun;
    }
    var tanggal_hijriah = document.getElementById("tanggal-hijri");
    if (tanggal_hijriah != null) {
      tanggal_hijriah.innerHTML = writeIslamicDate();
    }
    cur_date = tanggal;
    console.log("updatex!");
  }
  if (list_jadwal.length == 6) {
    var x = -1;
    for (var i = 0; i < list_jadwal.length; i++) {
      if (parseInt(list_jadwal[i].split(":")[0]) > parseInt(jam) || parseInt(list_jadwal[i].split(":")[0]) == parseInt(jam) && parseInt(list_jadwal[i].split(":")[1]) > parseInt(menit)) {
        x = i;
        break;
      }
    }
    if (x != -1) {
      var re_jam = parseInt(list_jadwal[x].split(":")[0]) - parseInt(jam);
      var re_menit = parseInt(list_jadwal[x].split(":")[1]) - parseInt(menit);
      if (re_menit < 0) {
        re_menit = 60 - parseInt(menit) + parseInt(list_jadwal[x].split(":")[1]) - 1;
        re_jam = re_jam - 1;
      }
      if (re_jam < 10) {
        re_jam = "0" + re_jam;
      }
      if (re_menit < 10) {
        re_menit = "0" + re_menit;
      }
      var re_detik = 60 - parseInt(detik);
      if (re_detik < 10) {
        re_detik = "0" + re_detik;
      }
      document.getElementById("waktu-reminder").innerHTML = "-" + re_jam + ":" + re_menit + ":" + re_detik + " menuju waktu " + list_nama[x];
      document.getElementById("reminder").style.backgroundColor = "rgba(180, 20, 0, 0.6)";
    }
  }
}

setInterval(updateJam, 1000);

function getValue(id) {
  return document.getElementById(id).value;
}

function isChecked(id) {
  return document.getElementById(id).checked;
}

function selesai() {
  var head_type = "1";
  var head_type_1 = isChecked("head-type-1");
  if (head_type_1) {
    head_type = "1";
  }
  var head_type_2 = isChecked("head-type-3");
  if (head_type_2) {
    head_type = "2";
  }
  var head_type_3 = isChecked("head-type-3");
  if (head_type_3) {
    head_type = "3";
  }
  var hide_alamat = isChecked("hide-alamat");
  var hide_jam = isChecked("hide-jam");
  var hide_jam_detik = isChecked("hide-jam-detik");
  var hide_tanggal_masehi = isChecked("hide-tanggal-masehi");
  var hide_tanggal_hijriah = isChecked("hide-tanggal-hijriah");
  var nama = getValue("nama");
  var alamat = getValue("alamat");
  var content_type = "1";
  var content_type_1 = isChecked("content-type-1");
  if (content_type_1) {
    content_type = "1";
  }
  var content_type_2 = isChecked("content-type-2");
  if (content_type_2) {
    content_type = "2";
  }
  var content_type_3 = isChecked("content-type-3");
  if (content_type_3) {
    content_type = "3";
  }
  var content_type_4 = isChecked("content-type-4");
  if (content_type_4) {
    content_type = "4";
  }
  var jadwal_type = "1";
  var jadwal_type_1 = isChecked("jadwal-type-1");
  if (jadwal_type_1) {
    jadwal_type = "1";
  }
  var jadwal_type_2 = isChecked("jadwal-type-2");
  if (jadwal_type_2) {
    jadwal_type = "2";
  }
  var id = document.getElementById("id-lokasi").value;
  var informasi_1 = getValue("informasi-1");
  var informasi_2 = getValue("informasi-2");
  var self = window.location;
  self.href = self.origin + self.pathname + "?action=preview&id=" + id + "&ht=" + head_type + "&ha=" + hide_alamat + "&hj=" + hide_jam + "&hs=" + hide_jam_detik + "&hm=" + hide_tanggal_masehi + "&hh=" + hide_tanggal_hijriah + "&nama=" + nama + "&alamat=" + alamat + "&ct=" + content_type + "&jt=" + jadwal_type + "&info1=" + informasi_1 + "&info2=" + informasi_2;
}

function filterLokasi() {
  var cari = document.getElementById("lokasi").value;
  if (cari.length < 2) {
    return;
  }
  var last_index = -1;
  var options = document.getElementById("id-lokasi").getElementsByTagName("option");
  for (var i = 0; i < options.length; i++) {
    if (options[i].innerText.toLowerCase().includes(cari.toLowerCase())) {
      options[i].style.display = "block";
      last_index = i;
    } else {
      options[i].style.display = "none";
    }
  }
  if (last_index != -1) {
    options[last_index].selected = true;
  }
}
