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

    accountList.innerHTML = "";

    accounts.forEach((acc, index)=>{

        const card = document
        .getElementById("cardTemplate")
        .content
        .cloneNode(true);

        card.querySelector(".username").textContent = acc.username;
        card.querySelector(".pw").textContent = maskPassword(acc.password);
        card.querySelector(".gmail").textContent = maskEmail(acc.gmail);
        card.querySelector(".gmailpw").textContent = maskPassword(acc.gmailPassword);
        card.querySelector(".note").textContent = acc.note || "-";


        // DETAIL
        card.querySelector(".detailBtn")
        .addEventListener("click", function(){

            const pw = card.querySelector(".pw");
            const mail = card.querySelector(".gmail");
            const gpw = card.querySelector(".gmailpw");

            if(this.dataset.show === "true"){

                pw.textContent = maskPassword(acc.password);
                mail.textContent = maskEmail(acc.gmail);
                gpw.textContent = maskPassword(acc.gmailPassword);

                this.dataset.show = "false";
                this.textContent = "👁 Detail";

            }else{

                pw.textContent = acc.password;
                mail.textContent = acc.gmail;
                gpw.textContent = acc.gmailPassword;

                this.dataset.show = "true";
                this.textContent = "🔒 Tutup";

            }

        });


        // COPY
        card.querySelector(".copyBtn")
        .addEventListener("click", ()=>{

            let text =
`Username: ${acc.username}
Password: ${acc.password}
Gmail: ${acc.gmail}
Password Gmail: ${acc.gmailPassword}`;

            navigator.clipboard.writeText(text);

            alert("Data berhasil dicopy");

        });


        // HAPUS
        card.querySelector(".deleteBtn")
        .addEventListener("click", ()=>{

            if(confirm("Hapus akun ini?")){

                accounts.splice(index,1);

                saveData();
                render();

            }

        });


        accountList.appendChild(card);

    });

}

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
