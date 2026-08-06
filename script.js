// ======================
// Roblox Vault
// Part 3A
// ======================

let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

const addBtn = document.getElementById("addBtn");
const modal = document.getElementById("modal");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const accountList = document.getElementById("accountList");

const username = document.getElementById("username");
const password = document.getElementById("password");
const gmail = document.getElementById("gmail");
const gmailPassword = document.getElementById("gmailPassword");
const note = document.getElementById("note");

function saveData(){
    localStorage.setItem(
        "accounts",
        JSON.stringify(accounts)
    );
}

function maskPassword(pw){
    return "*".repeat(pw.length || 8);
}

function maskEmail(email){

    if(!email.includes("@")) return "********";

    let name = email.split("@")[0];
    let domain = email.split("@")[1];

    if(name.length <=2){
        return name + "***@" + domain;
    }

    return (
        name.substring(0,2)
        +
        "*".repeat(name.length-2)
        +
        "@"
        +
        domain
    );

}

function render(){

    accountList.innerHTML="";

    accounts.forEach((acc,index)=>{

        const card=document
        .getElementById("cardTemplate")
        .content
        .cloneNode(true);

        card.querySelector(".username").textContent=acc.username;
        card.querySelector(".pw").textContent=maskPassword(acc.password);
        card.querySelector(".gmail").textContent=maskEmail(acc.gmail);
        card.querySelector(".gmailpw").textContent=maskPassword(acc.gmailPassword);
        card.querySelector(".note").textContent=acc.note;

        accountList.appendChild(card);

    });

}

render();

// ======================
// Roblox Vault
// Part 3B
// Tambah Akun
// ======================

// Buka modal
addBtn.addEventListener("click", () => {
    modal.classList.add("active");

    username.value = "";
    password.value = "";
    gmail.value = "";
    gmailPassword.value = "";
    note.value = "";

    username.focus();
});

// Tutup modal
cancelBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});

// Klik di luar modal untuk menutup
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});

// Simpan akun
saveBtn.addEventListener("click", () => {

    if (
        username.value.trim() === "" ||
        password.value.trim() === "" ||
        gmail.value.trim() === ""
    ) {
        alert("Username, Password, dan Gmail wajib diisi!");
        return;
    }

    accounts.push({
        username: username.value.trim(),
        password: password.value.trim(),
        gmail: gmail.value.trim(),
        gmailPassword: gmailPassword.value.trim(),
        note: note.value.trim()
    });

    saveData();
    render();

    modal.classList.remove("active");

    alert("Akun berhasil disimpan!");
});
