var text = "";

function readTextFile(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function (){
        if (rawFile.readyState === 4){
            if (rawFile.status === 200 || rawFile.status == 0){
                var allText = rawFile.responseText;
                EncryptText(allText);
            }
        }
    };
    rawFile.send(null);
}
readTextFile("./encrypt.txt");

function EncryptText(allText){
    text = allText.split("\n");
}

function submit(){
    let value = document.getElementById("text").value;
    div(value);
}

function div(value){
    let stage = document.getElementById("stage").value;
    let body = document.getElementById("body");
    if (stage == "0" && value == "start"){
        body.innerHTML = decodeURI(text[0]);
    }
}