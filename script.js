
/* ==========================================
   CALCULATOR DESKTOP 3.0
   Format Angka Indonesia
========================================== */


// ==========================================
// 1. ELEMENT HTML
// ==========================================

const resultDisplay = document.querySelector("#result");
const historyDisplay = document.querySelector("#history");

const buttons = document.querySelectorAll(".buttons button");


// ==========================================
// 2. VARIABEL UTAMA
// ==========================================

let angkaSekarang = "0";
let angkaPertama = null;
let operator = null;

let menungguAngkaKedua = false;
let hasilSelesai = false;


// ==========================================
// 3. FORMAT ANGKA INDONESIA
// ==========================================

function formatAngka(nilai) {

    const stringNilai = String(nilai);

    // Jangan format pesan error
    if (!Number.isFinite(Number(stringNilai))) {
        return stringNilai;
    }

    // Pisahkan angka dan desimal
    const bagian = stringNilai.split(".");

    const angkaBulat = bagian[0];

    // Format ribuan
    const formatBulat = new Intl.NumberFormat("id-ID", {
        maximumFractionDigits: 0
    }).format(Number(angkaBulat));

    // Jika ada desimal, tampilkan koma
    if (bagian.length > 1) {
        return formatBulat + "," + bagian[1];
    }

    return formatBulat;
}


// ==========================================
// 4. UPDATE DISPLAY
// ==========================================

function updateDisplay() {

    resultDisplay.textContent = formatAngka(angkaSekarang);

}


// ==========================================
// 5. UPDATE RIWAYAT
// ==========================================

function updateHistory(angkaKedua = null) {

    if (operator === null || angkaPertama === null) {
        return;
    }

    if (angkaKedua === null) {

        historyDisplay.textContent =
            `${formatAngka(angkaPertama)} ${operator}`;

    } else {

        historyDisplay.textContent =
            `${formatAngka(angkaPertama)} ${operator} ${formatAngka(angkaKedua)}`;

    }

}


// ==========================================
// 6. INPUT ANGKA
// ==========================================

function masukkanAngka(angka) {

    if (menungguAngkaKedua || hasilSelesai) {

        angkaSekarang = angka;

        menungguAngkaKedua = false;
        hasilSelesai = false;

    }

    else if (angkaSekarang === "0") {

        angkaSekarang = angka;

    }

    else {

        angkaSekarang += angka;

    }

    updateDisplay();

    // Update ekspresi secara langsung
    if (operator !== null) {
        updateHistory(angkaSekarang);
    }

}


// ==========================================
// 7. INPUT DESIMAL
// ==========================================

function masukkanDesimal() {

    if (menungguAngkaKedua || hasilSelesai) {

        angkaSekarang = "0.";

        menungguAngkaKedua = false;
        hasilSelesai = false;

    }

    else if (!angkaSekarang.includes(".")) {

        angkaSekarang += ".";

    }

    updateDisplay();

    if (operator !== null) {
        updateHistory(angkaSekarang);
    }

}


// ==========================================
// 8. PILIH OPERATOR
// ==========================================

function pilihOperator(operatorBaru) {

    // Jika ada operasi sebelumnya, hitung dahulu
    if (operator !== null && !menungguAngkaKedua) {
        hitung();
    }

    angkaPertama = Number(angkaSekarang);

    operator = operatorBaru;

    menungguAngkaKedua = true;
    hasilSelesai = false;

    updateHistory();

}


// ==========================================
// 9. LOGIC PERHITUNGAN
// ==========================================

function hitung() {

    if (operator === null || menungguAngkaKedua) {
        return;
    }

    const angkaKedua = Number(angkaSekarang);

    let hasil;

    switch (operator) {

        case "+":
            hasil = angkaPertama + angkaKedua;
            break;

        case "−":
        case "-":
            hasil = angkaPertama - angkaKedua;
            break;

        case "×":
        case "*":
            hasil = angkaPertama * angkaKedua;
            break;

        case "÷":
        case "/":

            if (angkaKedua === 0) {
                tampilkanError("Tidak bisa dibagi 0");
                return;
            }

            hasil = angkaPertama / angkaKedua;
            break;

        default:
            return;

    }

    // Periksa hasil perhitungan
    if (!Number.isFinite(hasil)) {
        tampilkanError("Hasil tidak valid");
        return;
    }

    // Mengurangi masalah presisi desimal
    hasil = Number(hasil.toPrecision(12));

    // Tampilkan riwayat perhitungan
    historyDisplay.textContent =
        `${formatAngka(angkaPertama)} ${operator} ${formatAngka(angkaKedua)} =`;

    // Simpan hasil
    angkaSekarang = String(hasil);

    angkaPertama = null;
    operator = null;

    menungguAngkaKedua = false;
    hasilSelesai = true;

    updateDisplay();

}


// ==========================================
// 10. ERROR HANDLING
// ==========================================

function tampilkanError(pesan) {

    angkaSekarang = pesan;

    angkaPertama = null;
    operator = null;

    menungguAngkaKedua = true;
    hasilSelesai = false;

    historyDisplay.textContent = "";

    updateDisplay();

}


// ==========================================
// 11. RESET SEMUA
// ==========================================

function clearAll() {

    angkaSekarang = "0";

    angkaPertama = null;
    operator = null;

    menungguAngkaKedua = false;
    hasilSelesai = false;

    historyDisplay.textContent = "";

    updateDisplay();

}


// ==========================================
// 12. CLEAR ENTRY
// ==========================================

function clearEntry() {

    angkaSekarang = "0";

    hasilSelesai = false;

    updateDisplay();

    if (operator !== null) {
        updateHistory(angkaSekarang);
    }

}


// ==========================================
// 13. BACKSPACE
// ==========================================

function hapusAngka() {

    if (menungguAngkaKedua || hasilSelesai) {
        return;
    }

    if (angkaSekarang.length > 1) {

        angkaSekarang = angkaSekarang.slice(0, -1);

        if (angkaSekarang === "-") {
            angkaSekarang = "0";
        }

    }

    else {

        angkaSekarang = "0";

    }

    updateDisplay();

    if (operator !== null) {
        updateHistory(angkaSekarang);
    }

}


// ==========================================
// 14. POSITIF / NEGATIF
// ==========================================

function ubahTanda() {

    if (Number(angkaSekarang) === 0) {
        return;
    }

    if (angkaSekarang.startsWith("-")) {

        angkaSekarang = angkaSekarang.slice(1);

    }

    else {

        angkaSekarang = "-" + angkaSekarang;

    }

    updateDisplay();

    if (operator !== null) {
        updateHistory(angkaSekarang);
    }

}


// ==========================================
// 15. PERSENTASE
// ==========================================

function persen() {

    angkaSekarang = String(
        Number(angkaSekarang) / 100
    );

    hasilSelesai = false;

    updateDisplay();

    if (operator !== null) {
        updateHistory(angkaSekarang);
    }

}


// ==========================================
// 16. OPERASI SATU ANGKA
// ==========================================

function operasiSatuAngka(jenis) {

    const angka = Number(angkaSekarang);

    let hasil;

    switch (jenis) {

        case "reciprocal":

            if (angka === 0) {
                tampilkanError("Tidak bisa dibagi 0");
                return;
            }

            hasil = 1 / angka;
            break;

        case "square":

            hasil = angka * angka;
            break;

        case "sqrt":

            if (angka < 0) {
                tampilkanError("Input tidak valid");
                return;
            }

            hasil = Math.sqrt(angka);
            break;

        default:
            return;

    }

    angkaSekarang = String(
        Number(hasil.toPrecision(12))
    );

    hasilSelesai = true;

    updateDisplay();

    if (operator !== null) {
        updateHistory(angkaSekarang);
    }

}


// ==========================================
// 17. CEK PESAN ERROR
// ==========================================

function cekError() {

    if (
        angkaSekarang === "Tidak bisa dibagi 0" ||
        angkaSekarang === "Input tidak valid" ||
        angkaSekarang === "Hasil tidak valid"
    ) {

        clearAll();

    }

}


// ==========================================
// 18. EVENT MOUSE
// ==========================================

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        const nilai = button.dataset.number;
        const op = button.dataset.operator;
        const action = button.dataset.action;

        cekError();

        // Input angka
        if (nilai !== undefined) {

            masukkanAngka(nilai);
            return;

        }

        // Input operator
        if (op !== undefined) {

            pilihOperator(op);
            return;

        }

        // Input tombol fungsi
        switch (action) {

            case "equals":
                hitung();
                break;

            case "clear":
                clearAll();
                break;

            case "clear-entry":
                clearEntry();
                break;

            case "backspace":
                hapusAngka();
                break;

            case "decimal":
                masukkanDesimal();
                break;

            case "sign":
                ubahTanda();
                break;

            case "percent":
                persen();
                break;

            case "reciprocal":
            case "square":
            case "sqrt":
                operasiSatuAngka(action);
                break;

        }

    });

});


// ==========================================
// 19. EVENT KEYBOARD
// ==========================================

document.addEventListener("keydown", function(event) {

    const key = event.key;

    cekError();

    // Angka 0-9
    if (/^[0-9]$/.test(key)) {

        masukkanAngka(key);

    }

    // Penjumlahan
    else if (key === "+") {

        pilihOperator("+");

    }

    // Pengurangan
    else if (key === "-") {

        pilihOperator("−");

    }

    // Perkalian
    else if (key === "*") {

        pilihOperator("×");

    }

    // Pembagian
    else if (key === "/") {

        event.preventDefault();

        pilihOperator("÷");

    }

    // Desimal
    else if (key === "." || key === ",") {

        masukkanDesimal();

    }

    // Enter atau sama dengan
    else if (key === "Enter" || key === "=") {

        event.preventDefault();

        hitung();

    }

    // Backspace
    else if (key === "Backspace") {

        event.preventDefault();

        hapusAngka();

    }

    // Escape
    else if (key === "Escape") {

        clearAll();

    }

    // Delete
    else if (key === "Delete") {

        clearEntry();

    }

    // Persentase
    else if (key === "%") {

        persen();

    }

});


// ==========================================
// 20. TAMPILAN AWAL
// ==========================================

updateDisplay();
