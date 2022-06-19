function ToPage() {
    sessionStorage.setItem("difficulty-choice", "Easy");
    //change the location to index
    location.assign("../side page/index.html");
    //location.replace("index.html");
    //location.reload();
}


function ToMedium() {
    //change the location to medium
    sessionStorage.setItem("difficulty-choice", "Medium");
    location.assign("../side page/index2.html");
    //location.replace("index2.html");
    //location.reload();
}

function To99fail() {
    //change the location to 99fail
    sessionStorage.setItem("difficulty-choice", "Hard");
    location.assign("../side page/index3.html");
    //location.replace("index3.html");
    //location.reload();
}

function To100fail() {
    //change the location to 99fail
    sessionStorage.setItem("difficulty-choice", "Very Hard");
    location.assign("../side page/index4.html");
    //location.replace("index3.html");
    //location.reload();
}

document.getElementById("xoro").onchange = function() {
    sessionStorage.setItem("player-choice", this.value);
}