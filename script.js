// ==============================
// PASSWORD WEBSITE
// ==============================

const PASSWORD_WEBSITE = "201230rw";


// ==============================
// BUAT HALAMAN LOGIN OTOMATIS
// ==============================

document.body.insertAdjacentHTML("afterbegin", `
    <div id="loginScreen">
        <div id="loginBox">
            <div style="font-size:45px;">🔐</div>

            <h2>Roblox Vault</h2>

            <p>Masukkan password untuk masuk</p>

            <input
                type="password"
                id="loginPassword"
                placeholder="Password"
                autocomplete="off"
            >

            <button id="loginButton">
                Masuk
            </button>

            <p id="loginError"></p>
        </div>
    </div>
`);


// ==============================
// STYLE LOGIN OTOMATIS
// ==============================

const loginStyle = document.createElement("style");

loginStyle.innerHTML = `
    #loginScreen {
        position: fixed;
        inset: 0;
        z-index: 999999;

        display: flex;
        justify-content: center;
        align-items: center;

        padding: 20px;

        background:
        linear-gradient(135deg, #111827, #2563eb);
    }

    #loginBox {
        width: 100%;
        max-width: 380px;

        padding: 30px;

        border-radius: 20px;

        text-align: center;

        color: white;

        background: rgba(255,255,255,0.12);

        backdrop-filter: blur(15px);

        box-shadow:
        0 15px 40px rgba(0,0,0,0.35);
    }

    #loginBox h2 {
        margin: 10px 0;
    }

    #loginBox p {
        color: #d1d5db;
    }

    #loginPassword {
        width: 100%;

        padding: 13px;

        margin-top: 10px;

        border: none;
        outline: none;

        border-radius: 10px;

        font-size: 15px;
    }

    #loginButton {
        width: 100%;

        padding: 13px;

        margin-top: 12px;

        border: none;

        border-radius: 10px;

        background: #22c55e;

        color: white;

        font-size: 15px;

        font-weight: bold;

        cursor: pointer;
    }

    #loginButton:hover {
        opacity: 0.85;
    }

    #loginError {
        color: #f87171 !important;

        min-height: 20px;
    }
`;

document.head.appendChild(loginStyle);


// ==============================
// FUNGSI LOGIN
// ==============================

function loginWebsite() {

    const password =
        document.getElementById("loginPassword").value;

    const error =
        document.getElementById("loginError");


    if (password === PASSWORD_WEBSITE) {

        document.getElementById("loginScreen").remove();

    } else {

        error.textContent = "Password salah!";

        document.getElementById("loginPassword").value = "";

    }
}


document
    .getElementById("loginButton")
    .addEventListener("click", loginWebsite);


document
    .getElementById("loginPassword")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            loginWebsite();
        }

    });


// ==============================
// DATA AKUN
// ==============================

let akun =
    JSON.parse(localStorage.getItem("akunRoblox")) || [];


// ==============================
// SIMPAN DATA
// ==============================

function simpan() {

    localStorage.setItem(
        "akunRoblox",
        JSON.stringify(akun)
    );

}


// ==============================
// SENSOR GMAIL
// ==============================

function sensorGmail(gmail) {

    if (!gmail) return "-";

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
// TAMBAH AKUN
// ==============================

function tambahAkun() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const gmail =
        document.getElementById("gmail").value.trim();

    const keterangan =
        document.getElementById("keterangan").value.trim();


    if (!username || !password) {

        alert(
            "Username dan Password Roblox wajib diisi!"
        );

        return;
    }


    akun.push({

        username: username,

        password: password,

        gmail: gmail,

        keterangan: keterangan

    });


    simpan();

    document.getElementById("username").value = "";

    document.getElementById("password").value = "";

    document.getElementById("gmail").value = "";

    document.getElementById("keterangan").value = "";


    tampilkanAkun();

}


// ==============================
// TAMPILKAN AKUN
// ==============================

function tampilkanAkun() {

    const list =
        document.getElementById("listAkun");


    if (!list) return;


    list.innerHTML = "";


    akun.forEach((item, index) => {

        list.innerHTML += `

        <div class="card">

            <h3>🎮 ${item.username}</h3>

            <div class="info">

                <p>
                    Password : ********
                </p>

                <p>
                    Gmail : ${sensorGmail(item.gmail)}
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

    });

}


// ==============================
// DETAIL
// ==============================

function detailAkun(index) {

    const item = akun[index];


    alert(
`Username : ${item.username}

Password : ${item.password}

Gmail : ${item.gmail}

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
Gmail : ${item.gmail}`;


    navigator.clipboard.writeText(text)
        .then(() => {

            alert("Data berhasil dicopy!");

        })
        .catch(() => {

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


    simpan();

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

        simpan();

        tampilkanAkun();

    }

}


// ==============================
// JALANKAN
// ==============================

tampilkanAkun();
