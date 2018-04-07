function loadTable() {
    var jsonArray = [{
            "name": "Mario",
            "surname": "Bianchi",
            "year": "2001"
        },
        {
            "name": "Federico",
            "surname": "Bruni",
            "year": "2003"
        },
        {
            "name": "Riccardo",
            "surname": "Gialli",
            "year": "2009"
        },
        {
            "name": "Angela",
            "surname": "Verdi",
            "year": "2000"
        },
        {
            "name": "Chiara",
            "surname": "Zardi",
            "year": "2002"
        }
    ];

    var jsonStr = JSON.stringify(jsonArray);
    var jsonObj = JSON.parse(jsonStr);


    for (j = 0, i = 0; j < 5; j++, i += 3) {
        document.getElementsByTagName('p')[i].innerText = jsonObj[j].name;
        document.getElementsByTagName('p')[i + 1].innerText = jsonObj[j].surname;
        document.getElementsByTagName('p')[i + 2].innerText = jsonObj[j].year;
    }
}