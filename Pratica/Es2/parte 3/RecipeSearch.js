function searchFunction() {
    if (document.getElementById("imgLoader") != null)
        document.getElementById("imgLoader").remove();

    if (document.getElementById("errorMex") != null)
        document.getElementById("errorMex").remove();

    document.getElementsByClassName("recipesContainer")[0].style.display = 'none';
    var searchImg = document.createElement('img');
    searchImg.src = "img/search.gif";
    searchImg.setAttribute('id', 'imgLoader');
    searchImg.style.borderRadius = "10px";
    searchImg.style.padding = "10px";
    document.getElementById("searchContainer").style.textAlign = "center";
    document.getElementById("searchContainer").appendChild(searchImg);

    var endpoint = "https://api.edamam.com/search";
    var searchKey = document.getElementById('searchBar').value;
    var api_key = "fe56c085f458daf43ae219ec1f39420b";
    var api_id = "82293082";
    var url = encodeURI(endpoint + "?q=" + searchKey + "&app_id=" + api_id + "&app_key=" + api_key);

    for (n = 0; n < 5; n++)
        if (document.getElementById("list-" + n) != null)
            document.getElementById("list-" + n).remove();

    for (n = 0; n < 10; n++)
        if (document.getElementById("tr-" + n) != null)
            document.getElementById("tr-" + n).remove();



    jsonRes = fetch(url, {

        mode: 'cors',
        redirect: 'follow',
        method: 'get',
        crossDomain: true,
    }).then(function(response) {
        // Convert to JSON
        return response.json();
    }).then(function(j) {
        // Yay, `j` is a JavaScript object
        document.getElementById("imgLoader").remove();
        if (j.hits.length != 0) {
            for (k = 0; k < 5; k++) {
                var ulNode = document.createElement("ul");
                ulNode.setAttribute('id', 'list-' + k);
                document.getElementById("recipeDescription-" + k).style.display = 'inline-block';
                document.getElementById("recipeDescription-" + k).style.background = 'rgba(255, 255, 255, 0.55)'
                document.getElementById("recipeDescription-" + k).style.textAlign = 'left';
                document.getElementById("recipeDescription-" + k).style.fontWeight = 'bold';

                document.getElementById("recipeLabel-" + k).innerHTML = j.hits['' + k].recipe.label;
                document.getElementById("recipeImage-" + k).src = j.hits['' + k].recipe.image;
                for (l = 0; l < j.hits['' + k].recipe.ingredientLines.length; l++) {
                    var liNode = document.createElement('li');
                    var strBuilder = j.hits['' + k].recipe.ingredientLines['' + l];
                    liNode.innerText = strBuilder;
                    ulNode.appendChild(liNode);
                }
                document.getElementById("recipeDescription-" + k).appendChild(ulNode);

                /*Nutrients Tables*/
                var tr = document.createElement("tr");
                tr.setAttribute('id', 'tr-' + k);

                var tdV = document.createElement("td");
                tdV.innerHTML = "Values";
                tdV.style.fontWeight = "bold";
                tr.appendChild(tdV);

                var trPer = document.createElement("tr");
                trPer.setAttribute('id', 'tr-' + (k + 5) * 1);

                var tdPer = document.createElement("td");
                tdPer.innerHTML = "Daily %";
                tdPer.style.fontWeight = "bold";
                trPer.appendChild(tdPer);


                var tdC = document.createElement("td");
                tdC.innerHTML = Math.round(j.hits['' + k].recipe.calories);
                tr.appendChild(tdC);

                var tdCd = document.createElement("td");
                tdCd.innerHTML = Math.round(j.hits['' + k].recipe.totalDaily.ENERC_KCAL.quantity);
                trPer.appendChild(tdCd);

                var tdF = document.createElement("td");
                tdF.innerHTML = Math.round(j.hits['' + k].recipe.totalNutrients.FAT.quantity);
                tr.appendChild(tdF);

                var tdFd = document.createElement("td");
                tdFd.innerHTML = Math.round(j.hits['' + k].recipe.totalDaily.FAT.quantity);
                trPer.appendChild(tdFd);


                var tdS = document.createElement("td");
                tdS.innerHTML = Math.round(j.hits['' + k].recipe.totalNutrients.SUGAR.quantity);
                tr.appendChild(tdS);

                var tdSd = document.createElement("td");
                tdSd.innerHTML = Math.round((j.hits['' + k].recipe.totalNutrients.SUGAR.quantity * 100) / 25.0);
                trPer.appendChild(tdSd);


                var tdP = document.createElement("td");
                tdP.innerHTML = Math.round(j.hits['' + k].recipe.totalNutrients.PROCNT.quantity);
                tr.appendChild(tdP);

                var tdPd = document.createElement("td");
                tdPd.innerHTML = Math.round(j.hits['' + k].recipe.totalDaily.PROCNT.quantity);
                trPer.appendChild(tdPd);

                var tdCar = document.createElement("td");
                tdCar.innerHTML = Math.round(j.hits['' + k].recipe.totalNutrients.CHOCDF.quantity);
                tr.appendChild(tdCar);

                var tdCard = document.createElement("td");
                tdCard.innerHTML = Math.round(j.hits['' + k].recipe.totalDaily.CHOCDF.quantity);
                trPer.appendChild(tdCard);


                document.getElementById("nutrientTableBody-" + k).appendChild(tr);
                document.getElementById("nutrientTableBody-" + k).appendChild(trPer);


                document.getElementsByClassName("recipesContainer")[0].style.display = 'block';
            }
        } else {
            var searchImg = document.createElement('img');
            searchImg.src = "img/errorSearch.png";
            searchImg.setAttribute('id', 'imgLoader');
            searchImg.style.borderRadius = "10px";
            searchImg.style.padding = "10px";
            document.getElementById("searchContainer").style.textAlign = "center";
            document.getElementById("searchContainer").appendChild(searchImg);
        }


    }).catch(err => {
        document.getElementsByClassName("recipesContainer")[0].style.display = 'none';

        if (document.getElementById("imgLoader") != null)
            document.getElementById("imgLoader").remove();

        if (document.getElementById("errorMex") != null)
            document.getElementById("errorMex").remove();

        var searchImg = document.createElement('img');
        var errorMex = document.createElement('h1');

        searchImg.src = "img/spilled.png";
        searchImg.setAttribute('id', 'imgLoader');
        searchImg.style.backgroundColor = "orange";
        searchImg.style.borderRadius = "10px";
        errorMex.style.padding = "10px";
        errorMex.innerHTML = "Sorry, something went Wrong";
        errorMex.setAttribute('id', 'errorMex');
        document.getElementById("searchContainer").style.textAlign = "center";
        document.getElementById("searchContainer").appendChild(searchImg);
        document.getElementById("searchContainer").appendChild(errorMex);
    });
}