// ==============================
// PASSWORD
// ==============================

const PASSWORD_WEBSITE = "201230rw";


// ==============================
// DATA AKUN
// ==============================

let akun = JSON.parse(
    localStorage.getItem("akunRoblox")
) || [];


// ==============================
// LOGIN
// ==============================

const loginScreen =
    document.getElementById("loginScreen");

const loginPassword =
    document.getElementById("loginPassword");

const loginButton =
    document.getElementById("loginButton");

const loginError =
    document.getElementById("loginError");

const app =
    document.getElementById("app");


// Sembunyikan website utama
// sampai password benar
app.style.display = "none";


function login() {

    const password = loginPassword.value;

    if (password === PASSWORD_WEBSITE) {

        loginScreen.style.display = "none";

        app.style.display = "block";

        loginPassword.value = "";

        loginError.textContent = "";

    } else {

        loginError.textContent =
            "❌ Sandi yang Anda masukkan salah!";

        loginPassword.value = "";

        loginPassword.focus();
    }
}


loginButton.addEventListener(
    "click",
    login
);


loginPassword.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            login();
        }

    }
);


// ==============================
// TAMBAH AKUN
// ==============================

const addButton =
    document.getElementById("addButton");


addButton.addEventListener(
    "click",
    tambahAkun
);


function tambahAkun() {

    const username =
        document.getElementById("username")
        .value
        .trim();

    const password =
        document.getElementById("password")
        .value
        .trim();

    const gmail =
        document.getElementById("gmail")
        .value
        .trim();

    const keterangan =
        document.getElementById("keterangan")
        .value
        .trim();


    if (username === "") {

        alert("Username Roblox wajib diisi!");

        return;
    }


    if (password === "") {

        alert("Password Roblox wajib diisi!");

        return;
    }


    akun.push({

        username: username,

        password: password,

        gmail: gmail,

        keterangan: keterangan

    });


    simpanData();


    document.getElementById("username").value = "";

    document.getElementById("password").value = "";

    document.getElementById("gmail").value = "";

    document.getElementById("keterangan").value = "";


    tampilkanAkun();

    alert("✅ Akun berhasil ditambahkan!");
}


// ==============================
// SIMPAN
// ==============================

function simpanData() {

    localStorage.setItem(
        "akunRoblox",
        JSON.stringify(akun)
    );

}


// ==============================
// SENSOR GMAIL
// ==============================

function sensorGmail(gmail) {

    if (!gmail) {
        return "-";
    }

    if (!gmail.includes("@")) {
        return gmail;
    }

    const bagian = gmail.split("@");

    const nama = bagian[0];

    const domain = bagian[1];


    if (nama.length <= 2) {

        return nama + "*****@" + domain;

    }


    return (
        nama.substring(0, 2) +
        "*****@" +
        domain
    );
}


// ==============================
// TAMPILKAN AKUN
// ==============================

function tampilkanAkun() {

    const list =
        document.getElementById("listAkun");


    list.innerHTML = "";


    akun.forEach(
        function(item, index) {

            list.innerHTML += `

                <div class="card">

                    <h3>
                        🎮 ${item.username}
                    </h3>

                    <div class="info">

                        <p>
                            Password : ********
                        </p>

                        <p>
                            Gmail :
                            ${sensorGmail(item.gmail)}
                        </p>

                        <p>
                            Keterangan :
                            ${item.keterangan || "-"}
                        </p>

                    </div>


                    <div class="action">

                        <button
                            class="detail"
                            onclick="detailAkun(${index})">
                            Detail
                        </button>

                        <button
                            class="copy"
                            onclick="copyAkun(${index})">
                            Copy
                        </button>

                        <button
                            class="edit"
                            onclick="editAkun(${index})">
                            Edit
                        </button>

                        <button
                            class="delete"
                            onclick="hapusAkun(${index})">
                            Hapus
                        </button>

                    </div>

                </div>

            `;

        }
    );

}


// ==============================
// DETAIL
// ==============================

function detailAkun(index) {

    const item = akun[index];


    alert(
`Username : ${item.username}

Password : ${item.password}

Gmail : ${item.gmail || "-"}

Keterangan : ${item.keterangan || "-"}`
    );

}


// ==============================
// COPY
// ==============================

function copyAkun(index) {

    const item = akun[index];


    const text =
`Username : ${item.username}
Password : ${item.password}
Gmail : ${item.gmail || "-"}`;


    navigator.clipboard
        .writeText(text)
        .then(function() {

            alert("✅ Data berhasil dicopy!");

        })
        .catch(function() {

            alert("Gagal menyalin data.");

        });

}


// ==============================
// EDIT
// ==============================

function editAkun(index) {

    const item = akun[index];


    const username = prompt(
        "Username Roblox:",
        item.username
    );

    if (username === null) return;


    const password = prompt(
        "Password Roblox:",
        item.password
    );

    if (password === null) return;


    const gmail = prompt(
        "Gmail:",
        item.gmail
    );

    if (gmail === null) return;


    const keterangan = prompt(
        "Keterangan:",
        item.keterangan
    );

    if (keterangan === null) return;


    akun[index] = {

        username: username,

        password: password,

        gmail: gmail,

        keterangan: keterangan

    };


    simpanData();

    tampilkanAkun();

}


// ==============================
// HAPUS
// ==============================

function hapusAkun(index) {

    if (
        confirm(
            "Yakin ingin menghapus akun ini?"
        )
    ) {

        akun.splice(index, 1);

        simpanData();

        tampilkanAkun();

    }

}


// ==============================
// TAMPILKAN DATA AWAL
// ==============================

tampilkanAkun();
