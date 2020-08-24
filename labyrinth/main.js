var text = [];
var key = [];
var bStyle = [];
var visitText = [];

function readTextFile(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function (){
        if (rawFile.readyState === 4){
            if (rawFile.status === 200 || rawFile.status == 0){
                var allText = rawFile.responseText;
                if (file == "./encrypt.txt"){
                    EncryptText(allText);
                }else{
                    VisitText(allText);
                }
            }
        }
    };
    rawFile.send(null);
}
readTextFile("./encrypt.txt");
readTextFile("./visit.txt");

function EncryptText(allText){
    let row = allText.split("\n");
    for (i = 0; i < row.length; i++){
        let r = row[i].split(", ");
        bStyle.push(r[0])
        key.push(r[1]);
        text.push(r[2]);
    }
}

function VisitText(allText){
    let row = allText.split("\n");
    for (i = 0; i < row.length; i++){
        visitText.push(row[i]);
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
            body.innerHTML = decodeURI(text[text.length-1]);
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
            let noWinText = decodeURI(text[text.length-3]);
            let osIndex = noWinText.indexOf("、");
            noWinText = TextInsert(noWinText, osIndex, platform.os);
            let productIndex = noWinText.indexOf("(");
            if (platform.product == null){
                body.innerHTML = noWinText.substring(0, productIndex);
            }else{
                noWinText = TextInsert(noWinText, productIndex, platform.product);
                body.innerHTML = noWinText;
            }

            if (document.cookie == ""){
                document.cookie = "visit=1";
            }else{
                let c = document.cookie;
                let visit = Number(c.split("=")[1]) + 1;
                document.cookie = "visit=" + visit;
                if (visit >= visitText.length + 1){
                    visit = visitText.length + 1;
                }
                body.innerHTML += "<br><br>" + visitText[visit-2];
            }
        }
    }
}

function isWin(){
    return navigator.platform.indexOf('Win') > -1;
}

function TextInsert(string, index, str){
    if (index > 0){
        return string.substring(0, index+1) + str + string.substring(index+1, string.length);
    }
}