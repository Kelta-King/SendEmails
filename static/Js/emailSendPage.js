


let selectEmailColumn = () => {

    let email = getId('emailColumn');
    
    if(emptyCheck('emailColumn')){
        return false;
    }

    let column = email.value;
    
    let xhttp = new XMLHttpRequest();
    let obj = {
        column: column,
    }
    obj = JSON.stringify(obj);
    obj = window.btoa(obj)

    xhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            if(errorCheck(this.responseText)){
                return false;
            }
            alert(this.responseText);

        }

    }

    xhttp.open("GET", "setEmailColumn?vals="+obj, true);
    xhttp.send();

}