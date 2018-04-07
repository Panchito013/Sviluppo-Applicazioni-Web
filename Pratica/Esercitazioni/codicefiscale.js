function checkCode() {
    var cf = document.getElementById("codicefiscale").value;
    var pattern = /[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]/;
    if (cf.search(pattern) == -1) {
        alert("Codice Fiscale non Valido");
    } else {
        alert("Codice Fiscale Valido!");
    }
}