let akun = JSON.parse(localStorage.getItem("akunRoblox")) || [];

function tambahAkun() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const gmail = document.getElementById("gmail").value.trim();
    const keterangan = document.getElementById("keterangan").value.trim();


    if (username === "" || password === "") {
        alert("Username dan Password Roblox wajib diisi!");
        return;
    }


    akun.push({
        username,
        password,
        gmail,
        keterangan
    });


    localStorage.setItem("akunRoblox", JSON.stringify(akun));


    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("gmail").value = "";
    document.getElementById("keterangan").value = "";


    tampilkanAkun();

    alert("Akun berhasil ditambahkan!");
}



function sensorGmail(gmail){

    if(!gmail) return "-";

    let data = gmail.split("@");

    if(data.length < 2) return gmail;


    return data[0].substring(0,2) + "*****@" + data[1];

}



function tampilkanAkun(){

    let list = document.getElementById("listAkun");

    list.innerHTML = "";


    akun.forEach((item,index)=>{

        list.innerHTML += `

        <div class="card">

        <h3>🎮 ${item.username}</h3>

        <p>Password : ********</p>

        <p>Gmail : ${sensorGmail(item.gmail)}</p>

        <p>Keterangan : ${item.keterangan}</p>


        <button onclick="detailAkun(${index})">
        Detail
        </button>

        <button onclick="editAkun(${index})">
        Edit
        </button>

        <button onclick="hapusAkun(${index})">
        Hapus
        </button>


        </div>

        `;

    });

}




function detailAkun(index){

    let a = akun[index];

    alert(
`Username : ${a.username}
Password : ${a.password}
Gmail : ${a.gmail}
Keterangan : ${a.keterangan}`
    );

}




function editAkun(index){

    let a = akun[index];


    let username = prompt("Username:", a.username);
    let password = prompt("Password:", a.password);
    let gmail = prompt("Gmail:", a.gmail);
    let ket = prompt("Keterangan:", a.keterangan);


    if(username){

        akun[index] = {
            username,
            password,
            gmail,
            keterangan: ket
        };


        localStorage.setItem("akunRoblox", JSON.stringify(akun));

        tampilkanAkun();

    }

}




function hapusAkun(index){

    if(confirm("Yakin hapus akun?")){

        akun.splice(index,1);

        localStorage.setItem("akunRoblox", JSON.stringify(akun));

        tampilkanAkun();

    }

}



tampilkanAkun();

function login() {
    const password = document.getElementById("loginPassword").value;
    const error = document.getElementById("loginError");

    if (password === "201230rw") {
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("loginPassword").value = "";
    } else {
        error.textContent = "Password salah!";
        document.getElementById("loginPassword").value = "";
    }
}
