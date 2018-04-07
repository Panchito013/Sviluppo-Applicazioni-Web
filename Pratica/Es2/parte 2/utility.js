function cv(mode) {
    var xhr = new XMLHttpRequest();
    var endpoint = 'https://saw1718.herokuapp.com/validation.php';
    var email = document.getElementById('eml').value;
    var url = encodeURI(endpoint + "?mail=" + email);

    function uv() {
        if (xhr.readyState == 4) {
            if (xhr.status == '200') {
                if (xhr.responseText != null) {
                    var jsonStr = xhr.responseText;
                    var jsonO = JSON.parse(jsonStr);
                    if (mode == 'mail') {
                        if (document.getElementById('eml').value != '' && jsonO[0].status == 'ko') {
                            document.getElementById('status').style.display = 'block';
                            document.getElementById('status').innerHTML = "Email Already Present, please change";
                        } else
                            document.getElementById('status').style.display = 'none';
                    } else if (mode == 'user') {
                        if (document.getElementById('user').value != '' && jsonO[0].status == 'ko') {
                            document.getElementById('statusUser').style.display = 'block';
                            document.getElementById('statusUser').innerHTML = "Username Already Present, please change";
                        } else {
                            document.getElementById('statusUser').style.display = 'none';
                        }
                    }

                } else {
                    alert("Ajax error: No data received");
                }

            } else {
                alert("Ajax error: " + xhr.statusText);
            }
        }
    }


    xhr.open('GET', url, true);
    xhr.onreadystatechange = uv;
    xhr.send(null);
}