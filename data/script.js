function xhttpRequest() {
    let xmlhttp = new XMLHttpRequest();
    if (!window.XMLHttpRequest) {
        //for old IE browsers
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = ()  => {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("display").innerHTML = xmlhttp.responseText; //should be sth else, just experimenting
        }
    };
    xmlhttp.open("GET", "/?data=ae", true);
    xmlhttp.send();
}