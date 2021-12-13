//last-update = 06/12/2021

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

function getValue(id) {
  return document.getElementById(id).value;
}

function setValue(id, value) {
  document.getElementById(id).value = value;
}

function getChecked(id) {
  return document.getElementById(id).checked;
}

function setChecked(id, checked) {
  document.getElementById(id).checked = checked;
}

function setConfig(data) {
  var date = new Date();
  date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
  document.cookie = "config=" + JSON.stringify(data) + ";" + "expires=" + date.toUTCString() + ";path=/";
}

function getConfig() {
  var cookie = document.cookie;
  if (cookie.includes("config=")) {
    var index_cookie_start = cookie.indexOf("config=");
    var index_cookie_end = cookie.indexOf("}");
    if (index_cookie_start != -1 && index_cookie_end != -1) {
      return JSON.parse(cookie.substring(index_cookie_start + 7, index_cookie_end + 1));
    }
  }
  return null;
}

function reset() {
  var date = new Date();
  date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
  document.cookie = "config=;" + "expires=" + date.toUTCString() + ";path=/";
}

function setItem(item) {
  window.localStorage.setItem("data", item);
}

function getItem() {
  return window.localStorage.getItem("data");
}

function clearData() {
  window.localStorage.clear();
  document.cookie.split(";").forEach(function(c) {
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
}

function getSetting() {
  var setting = {};
  setting.nama = getValue("nama");
  setting.alamat = getValue("alamat");
  var head_type = "0";
  if (getChecked("head-type-1")) {
    head_type = "1";
  }
  if (getChecked("head-type-2")) {
    head_type = "2";
  }
  if (getChecked("head-type-3")) {
    head_type = "3";
  }
  setting.head_type = head_type;
  setting.hide_alamat = getChecked("hide-alamat");
  setting.hide_jam = getChecked("hide-jam");
  setting.hide_jam_detik = getChecked("hide-jam-detik");
  setting.hide_tanggal_masehi = getChecked("hide-tanggal-masehi");
  setting.hide_tanggal_hijriah = getChecked("hide-tanggal-hijriah");
  setting.background = getValue("background");
  var content_type = "0";
  if (getChecked("content-type-1")) {
    content_type = "1";
  }
  if (getChecked("content-type-2")) {
    content_type = "2";
  }
  if (getChecked("content-type-3")) {
    content_type = "3";
  }
  if (getChecked("content-type-4")) {
    content_type = "4";
  }
  setting.content_type = content_type;
  var jadwal_type = "0";
  if (getChecked("jadwal-type-1")) {
    jadwal_type = "1";
  }
  if (getChecked("jadwal-type-2")) {
    jadwal_type = "2";
  }
  setting.jadwal_type = jadwal_type;
  setting.id = getValue("id-lokasi");
  setting.imsak = getValue("adj-imsak");
  setting.subuh = getValue("adj-subuh");
  setting.dzuhur = getValue("adj-dzuhur");
  setting.ashar = getValue("adj-ashar");
  setting.maghrib = getValue("adj-maghrib");
  setting.isya = getValue("adj-isya");
  setting.informasi_1 = getValue("informasi-1");
  setting.informasi_2 = getValue("informasi-2");
  return setting;
}

function setSetting(setting) {
  if (setting == null) {
    return;
  }
  setValue("nama", setting.nama);
  setValue("alamat", setting.alamat);
  var head_type = setting.head_type;
  if (head_type == "1") {
    setChecked("head-type-1", true)
  }
  if (head_type == "2") {
    setChecked("head-type-2", true);
  }
  if (head_type == "3") {
    setChecked("head-type-3", true);
  }
  setChecked("hide-alamat", setting.hide_alamat);
  setChecked("hide-jam", setting.hide_jam);
  setChecked("hide-jam-detik", setting.hide_jam_detik);
  setChecked("hide-tanggal-masehi", setting.hide_tanggal_masehi);
  setChecked("hide-tanggal-hijriah", setting.hide_tanggal_hijriah);
  setValue("background", setting.background);
  var content_type = setting.content_type;
  if (content_type == "1") {
    setChecked("content-type-1", true);
  }
  if (content_type == "2") {
    setChecked("content-type-2", true);
  }
  if (content_type == "3") {
    setChecked("content-type-3", true);
  }
  if (content_type == "4") {
    setChecked("content-type-4", true);
  }
  var jadwal_type = setting.jadwal_type;
  if (jadwal_type == "1") {
    setChecked("jadwal-type-1", true);
  }
  if (jadwal_type == "2") {
    setChecked("jadwal-type-2", true);
  }
  setValue("id-lokasi", setting.id);
  setValue("adj-imsak", setting.imsak);
  setValue("adj-subuh", setting.subuh);
  setValue("adj-dzuhur", setting.dzuhur);
  setValue("adj-ashar", setting.ashar);
  setValue("adj-maghrib", setting.maghrib);
  setValue("adj-isya", setting.isya);
  setValue("informasi-1", setting.informasi_1);
  setValue("informasi-2", setting.informasi_2);
}

function selesai() {
  var setting = getSetting();
  if (setting != null) {
    setConfig(setting);
    var self = window.location;
    self.href = self.origin + self.pathname + "?action=preview&id=" + setting.id + "&ht=" + setting.head_type + "&ha=" + setting.hide_alamat + "&hj=" + setting.hide_jam + "&hs=" + setting.hide_jam_detik + "&hm=" + setting.hide_tanggal_masehi + "&hh=" + setting.hide_tanggal_hijriah + "&bg=" + setting.background + "&ct=" + setting.content_type + "&jt=" + setting.jadwal_type + "&im=" + setting.imsak + "&sb=" + setting.subuh + "&dz=" + setting.dzuhur + "&as=" + setting.ashar + "&mg=" + setting.maghrib + "&is=" + setting.isya + "&nama=" + setting.nama + "&alamat=" + setting.alamat + "&info1=" + setting.informasi_1 + "&info2=" + setting.informasi_2;
  }
}

var url = new URL(window.location.href);
var action = url.searchParams.get("action");
var id_lokasi = url.searchParams.get("id");
if (id_lokasi == null) {
  id_lokasi = "1609";
}
var adj_imsak = url.searchParams.get("im");
var adj_subuh = url.searchParams.get("sb");
var adj_dzuhur = url.searchParams.get("dz");
var adj_ashar = url.searchParams.get("as");
var adj_maghrib = url.searchParams.get("mg");
var adj_isya = url.searchParams.get("is");

function preview() {
  var head_type = url.searchParams.get("ht");
  var hide_alamat = url.searchParams.get("ha");
  var hide_jam = url.searchParams.get("hj");
  var hide_second = url.searchParams.get("hs");
  var hide_masehi = url.searchParams.get("hm");
  var hide_hijri = url.searchParams.get("hh");
  var nama = url.searchParams.get("nama");
  var alamat = url.searchParams.get("alamat");
  var url_background = url.searchParams.get("bg");
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
  document.getElementById("tunggu").style.display = "none";
  document.getElementById("preview").style.backgroundImage = "url(" + url_background + ")";
  document.getElementById("preview").style.display = "block";
}

var data = {};
var cur_date = new Date();
var cur_index = 0;
var cur_bulan = cur_date.getMonth() + 1;
var cur_tahun = cur_date.getFullYear();

function callApi(url_api) {
  console.log(url_api);
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open("GET", url_api, true);
  xhr.onload = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      data[cur_bulan + "_" + cur_tahun] = xhr.response.data.jadwal;
      cur_index++;
      if (cur_bulan == 12) {
        cur_bulan = 1;
        cur_tahun++;
      } else {
        cur_bulan++;
      }
      document.getElementById("tunggu_value").value = cur_index;
      if (cur_index < 12) {
        callApi("https://api.myquran.com/v1/sholat/jadwal/" + id_lokasi + "/" + cur_tahun + "/" + cur_bulan);
      } else {
        setItem(JSON.stringify(data));
        preview();
      }
    }
  };
  xhr.send();
}

if (action == "setting") {
  setSetting(getConfig());
  document.getElementById("setting").style.display = "block";
} else if (action == "preview") {
  document.getElementById("tunggu").style.display = "block";
  var cur_data = getItem();
  if (cur_data != null) {
    data = JSON.parse(cur_data);
    preview();
  } else {
    callApi("https://api.myquran.com/v1/sholat/jadwal/" + id_lokasi + "/" + cur_tahun + "/" + cur_bulan);
  }
  //preview();
} else {
  document.getElementById("selamat-datang").style.display = "block";
}

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

function adjustWaktu(orig, adj) {
  if (!orig.includes(":") && !adj.includes(":")) {
    return null;
  }
  var origs = orig.split(":");
  if (origs.length != 2) {
    return null;
  }
  var orig_kiri = parseInt(origs[0]);
  var orig_kanan = parseInt(origs[1]);
  var adj_res = orig_kanan + parseInt(adj);
  if (adj_res > 59) {
    var orig_kiri_res = orig_kiri + 1;
    if (orig_kiri_res < 10) {
      orig_kiri_res = "0" + orig_kiri_res;
    }
    if (adj_res == 60) {
      return orig_kiri_res + ":00";
    } else {
      var adj_kanan_res = adj_res - 60;
      if (adj_kanan_res < 10) {
        adj_kanan_res = "0" + adj_kanan_res;
      }
      return orig_kiri_res + ":" + adj_kanan_res;
    }
  } else {
    var orig_kiri_res = orig_kiri;
    if (orig_kiri_res < 10) {
      orig_kiri_res = "0" + orig_kiri_res;
    }
    var adj_kanan_res = adj_res;
    if (adj_kanan_res < 10) {
      adj_kanan_res = "0" + adj_kanan_res;
    }
    return orig_kiri_res + ":" + adj_kanan_res;
  }
}

var list_nama = ["Imsak","Subuh","Dzuhur","Ashar","Maghrib","Isya"];
var list_jadwal = [];
var cur_date;

function updateJam() {
  if (action != "preview") {
    return;
  }
  var date = new Date();
  //date.setHours(23, 59);
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
  if (cur_date != date.getDate() && Object.keys(data).length == 12) {
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
    bulan++;
    list_jadwal = [];
    var imsak = adjustWaktu(data[bulan + "_" + tahun][tanggal].imsak, adj_imsak);
    document.getElementById("imsak").innerHTML = imsak;
    list_jadwal.push(imsak);
    var subuh = adjustWaktu(data[bulan + "_" + tahun][tanggal].subuh, adj_subuh);
    document.getElementById("subuh").innerHTML = subuh;
    list_jadwal.push(subuh);
    var dzuhur = adjustWaktu(data[bulan + "_" + tahun][tanggal].dzuhur, adj_dzuhur);
    document.getElementById("dzuhur").innerHTML = dzuhur;
    list_jadwal.push(dzuhur);
    var ashar = data[bulan + "_" + tahun][tanggal].ashar;
    document.getElementById("ashar").innerHTML = ashar;
    list_jadwal.push(ashar);
    var maghrib = data[bulan + "_" + tahun][tanggal].maghrib;
    document.getElementById("maghrib").innerHTML = maghrib;
    list_jadwal.push(maghrib);
    var isya = data[bulan + "_" + tahun][tanggal].isya;
    document.getElementById("isya").innerHTML = isya;
    list_jadwal.push(isya);
    cur_date = tanggal;
    console.log("update : " + tanggal + "-" + bulan + "-" + tahun);
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
