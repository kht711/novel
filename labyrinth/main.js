var text = [];
var key = [];
var bStyle = [];

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
    let row = allText.split("\n");
    for (i = 0; i < row.length; i++){
        let r = row[i].split(", ");
        bStyle.push(r[0])
        key.push(r[1]);
        text.push(r[2]);
    }
}

function submit(){
    let value = document.getElementById("text").value;
    div(value);
}

function div(value){
    let stage = Number(document.getElementById("stage").value);
    let body = document.getElementById("body");
    if (stage == -1){
        if (btoa(value) == key[key.length-1]){
            body.className = bStyle[bStyle.length-1];
            body.innreHTML = decodeURI(text[text.length-1]);
        }
    }else if (btoa(value) == key[stage]){
        if (stage == 3){
            document.title = atob(key[stage+1]);
        }else{
            document.title = "Labyrinth";
        }
        body.className = bStyle[stage];
        body.innerHTML = decodeURI(text[stage]);
    }else if (stage == 0 && btoa(value) == key[key.length-2]){
        body.className = bStyle[bStyle.length-2];
        if (isWin()){
            body.innerHTML = decodeURI(text[text.length-2]);
        }else{
            body.innerHTML = "ごめんね。ここからは<br>Windows OSの人しか<br>見れないページなんだ。";
        }
    }
}

function isWin(){
    return navigator.platform.indexOf('Win') > -1;
}