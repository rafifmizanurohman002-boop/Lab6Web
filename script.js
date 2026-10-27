// =====================================================
// Praktikum 6 - JavaScript DOM dan Event Handling
// =====================================================
// Script dihubungkan dengan atribut defer sehingga seluruh
// elemen HTML sudah tersedia saat script ini dijalankan.

// ---------- Latihan 1: Mengubah teks dengan DOM ----------
const judul = document.getElementById("judul");
const pesan = document.getElementById("pesan");

judul.textContent = "Belajar JavaScript DOM";
pesan.textContent = "Konten berhasil diubah oleh JavaScript.";

console.log("Latihan 1 — judul:", judul.textContent);
console.log("Latihan 1 — pesan:", pesan.textContent);

// ---------- Latihan 2: Event click ----------
const tombolAksi = document.getElementById("tombolAksi");

tombolAksi.addEventListener("click", function () {
    pesan.textContent = "Tombol diklik pada " + new Date().toLocaleTimeString();
    console.log("Latihan 2 —", pesan.textContent);
});

// ---------- Latihan 3: Mengubah kelas dan gaya CSS ----------
const tombolGaya = document.getElementById("tombolGaya");
const teksGaya = document.getElementById("teksGaya");

tombolGaya.addEventListener("click", function () {
    teksGaya.classList.toggle("highlight");
    teksGaya.classList.toggle("teks-besar");
    console.log("Latihan 3 — class teksGaya:", teksGaya.className || "(kosong)");
});

// ---------- Latihan 4: Event input dan penghitung karakter ----------
const namaInput = document.getElementById("namaInput");
const jumlahKarakter = document.getElementById("jumlahKarakter");

namaInput.addEventListener("input", function () {
    jumlahKarakter.textContent = namaInput.value.length;
});

// ---------- Latihan 5: Validasi form pendaftaran ----------
const form = document.getElementById("formPendaftaran");
const pesanForm = document.getElementById("pesanForm");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // cegah halaman dimuat ulang sebelum pemeriksaan selesai

    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const usiaInput = document.getElementById("usia").value;
    const usia = Number(usiaInput);
    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    pesanForm.className = "error";

    if (nama === "") {
        pesanForm.textContent = "Nama wajib diisi.";
    } else if (!polaEmail.test(email)) {
        pesanForm.textContent = "Masukkan email yang valid.";
    } else if (usiaInput === "" || !Number.isInteger(usia) || usia < 17 || usia > 100) {
        pesanForm.textContent = "Usia harus berupa bilangan bulat 17–100.";
    } else {
        pesanForm.className = "sukses";
        pesanForm.textContent = "Validasi berhasil. Form siap diproses.";
        form.reset();
    }

    console.log("Latihan 5 —", pesanForm.textContent);
});

// ---------- Latihan 6: Daftar tugas (To-do List) ----------
const inputTugas = document.getElementById("inputTugas");
const tambahTugas = document.getElementById("tambahTugas");
const daftarTugas = document.getElementById("daftarTugas");
const pesanTugas = document.getElementById("pesanTugas");

tambahTugas.addEventListener("click", function () {
    const teks = inputTugas.value.trim();

    if (teks === "") {
        pesanTugas.className = "error";
        pesanTugas.textContent = "Tulis tugas terlebih dahulu.";
        return;
    }

    daftarTugas.appendChild(buatItemTugas(teks));
    inputTugas.value = "";
    pesanTugas.className = "sukses";
    pesanTugas.textContent = "Tugas ditambahkan.";
    inputTugas.focus();
    console.log("Latihan 6 — Tugas ditambahkan:", teks);
});

// Memperbolehkan menambah tugas dengan tombol Enter
inputTugas.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        tambahTugas.click();
    }
});

// Membuat satu item daftar: teks + tombol "Tandai selesai" + tombol "Hapus" (Eksperimen 1)
function buatItemTugas(teks) {
    const item = document.createElement("li");
    const label = document.createElement("span");
    const selesai = document.createElement("button");
    const hapus = document.createElement("button");

    label.textContent = teks + " ";

    selesai.type = "button";
    selesai.textContent = "Tandai selesai";
    selesai.addEventListener("click", function () {
        item.classList.toggle("selesai");
        selesai.textContent = item.classList.contains("selesai")
            ? "Batalkan selesai"
            : "Tandai selesai";
        console.log("Latihan 6 —", (item.classList.contains("selesai") ? "Selesai: " : "Belum selesai: ") + teks);
    });

    // Eksperimen 1: tombol untuk menghapus satu item
    hapus.type = "button";
    hapus.className = "hapus";
    hapus.textContent = "Hapus";
    hapus.addEventListener("click", function () {
        item.remove();
        pesanTugas.className = "error";
        pesanTugas.textContent = 'Tugas "' + teks + '" dihapus.';
        console.log("Latihan 6 — Tugas dihapus:", teks);
    });

    item.append(label, selesai, hapus);
    return item;
}

// ---------- Mini Project: Form Pendaftaran Workshop ----------
const formWorkshop = document.getElementById("formWorkshop");
const wsNama = document.getElementById("wsNama");
const wsEmail = document.getElementById("wsEmail");
const wsSesi = document.getElementById("wsSesi");
const hitungNama = document.getElementById("hitungNama");
const isiRingkasan = document.getElementById("isiRingkasan");
const sesiTerpilih = document.getElementById("sesiTerpilih");
const pesanWorkshop = document.getElementById("pesanWorkshop");

// Event input: penghitung karakter nama + ringkasan langsung
wsNama.addEventListener("input", function () {
    hitungNama.textContent = wsNama.value.length;
    perbaruiRingkasan();
});

wsEmail.addEventListener("input", perbaruiRingkasan);

// Eksperimen 3: event change pada dropdown sesi workshop
wsSesi.addEventListener("change", function () {
    sesiTerpilih.textContent = wsSesi.value !== ""
        ? "Sesi terpilih: " + wsSesi.value
        : "Sesi terpilih: belum dipilih";
    perbaruiRingkasan();
    console.log("Eksperimen 3 —", sesiTerpilih.textContent);
});

function perbaruiRingkasan() {
    const bagian = [];

    bagian.push(wsNama.value !== ""
        ? "Nama: " + wsNama.value.trim() + " (" + wsNama.value.length + " kar)"
        : "Nama: —");
    bagian.push(wsEmail.value !== "" ? "Email: " + wsEmail.value.trim() : "Email: —");
    bagian.push(wsSesi.value !== "" ? "Sesi: " + wsSesi.value : "Sesi: —");

    isiRingkasan.textContent = bagian.join(" • ");
}

function tampilkanPesanWorkshop(teks, sukses) {
    pesanWorkshop.textContent = teks;
    pesanWorkshop.className = sukses ? "sukses" : "error";
    console.log("Mini Project —", teks);
}

formWorkshop.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = wsNama.value.trim();
    const email = wsEmail.value.trim();
    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nama === "") {
        tampilkanPesanWorkshop("Nama wajib diisi.", false);
    } else if (nama.length < 3) {
        // Eksperimen 2: nama minimal 3 karakter
        tampilkanPesanWorkshop("Nama minimal terdiri dari 3 karakter.", false);
    } else if (!polaEmail.test(email)) {
        tampilkanPesanWorkshop("Masukkan email yang valid.", false);
    } else if (wsSesi.value === "") {
        tampilkanPesanWorkshop("Silakan pilih sesi workshop terlebih dahulu.", false);
    } else {
        tampilkanPesanWorkshop(
            "Pendaftaran berhasil. " + nama + " terdaftar pada " + wsSesi.value + ".",
            true
        );
    }
});

// Tombol reset / hapus input
document.getElementById("resetWorkshop").addEventListener("click", function () {
    formWorkshop.reset();
    hitungNama.textContent = "0";
    isiRingkasan.textContent = "belum ada data";
    sesiTerpilih.textContent = "Sesi terpilih: belum dipilih";
    pesanWorkshop.textContent = "";
    pesanWorkshop.className = "";
    console.log("Mini Project — isi form direset.");
});

// ---------- Eksperimen 4: Sembunyikan/tampilkan paragraf dengan class CSS ----------
const toggleParagraf = document.getElementById("toggleParagraf");
const paragrafToggle = document.getElementById("paragrafToggle");

toggleParagraf.addEventListener("click", function () {
    paragrafToggle.classList.toggle("tersembunyi");
    console.log(
        "Eksperimen 4 — paragraf tersembunyi:",
        paragrafToggle.classList.contains("tersembunyi")
    );
});
