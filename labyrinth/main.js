var text = "おめでとう！正解した<br><br><br><br>今の体験版はまだこれ。完全版をお楽しみに"

function submit(){
    let value = document.getElementById("text").value;
    div(value);
}

function div(value){
    let body = document.getElementById("body");
    if (value == "c3RhcnQ" || value == "start"){
        body.innerHTML = text;
    }
}