var n, m, res;


function sum() {
    n = document.getElementById("n").value;
    m = document.getElementById("m").value;
    res = n * 1 + m * 1;
    document.getElementById("res").value = res;
}

function sub() {
    n = document.getElementById("n").value;
    m = document.getElementById("m").value;
    res = n * 1 - m * 1;
    document.getElementById("res").value = res;
}

function molt() {
    n = document.getElementById("n").value;
    m = document.getElementById("m").value;
    res = n * 1 * m * 1;
    document.getElementById("res").value = res;
}

function div() {
    n = document.getElementById("n").value;
    m = document.getElementById("m").value;
    res = n * 1 / m * 1;
    document.getElementById("res").value = res;
}