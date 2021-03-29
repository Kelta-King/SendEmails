


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
            
            let divS = document.createElement("DIV");
            divS.setAttribute('class', 'w3-padding w3-margin-top');
            let labelS = document.createElement("LABEL");
            labelS.innerText = "Email subject";

            let textAreaS = document.createElement("TEXTAREA");
            labelS.setAttribute('for', 'emailSubject');
            textAreaS.setAttribute('id', 'emailSubject');
            textAreaS.setAttribute('class', 'w3-input w3-border w3-round');
            textAreaS.setAttribute('placeholder', 'Subject of email...');
            textAreaS.setAttribute('rows', '2');

            divS.appendChild(labelS);
            divS.appendChild(textAreaS);

            let divD = document.createElement("DIV");
            divD.setAttribute('class', 'w3-padding w3-margin-top');
            let labelD = document.createElement("LABEL");
            labelD.innerText = "Email Data";
            
            let textAreaD = document.createElement("TEXTAREA");
            labelD.setAttribute('for', 'emailData');
            textAreaD.setAttribute('id', 'emailData');
            textAreaD.setAttribute('class', 'w3-input w3-border w3-round');
            textAreaD.setAttribute('placeholder', 'Start writing email body...');
            textAreaD.setAttribute('rows', '4');

            divD.appendChild(labelD);
            divD.appendChild(textAreaD);

            let divF = document.createElement("DIV");
            divF.setAttribute('class', 'w3-padding w3-center w3-margin-top');
            let labelF = document.createElement("LABEL");
            labelF.innerText = "Email attachments";
            
            let inputF = document.createElement("INPUT");
            inputF.setAttribute('id', 'emailAttach');
            inputF.setAttribute('type', 'file');
            inputF.setAttribute('class', 'w3-input w3-center');

            divF.appendChild(labelF);
            divF.appendChild(inputF);

            let divB = document.createElement("DIV");
            divB.setAttribute('class', 'w3-padding w3-center w3-margin-top');
            
            let btn = document.createElement("BUTTON");
            btn.setAttribute('id', 'sendBtn');
            btn.setAttribute('class', 'w3-button w3-theme kel-hover w3-round');

            let txt = document.createTextNode(' Send');
            let i = document.createElement('I');
            i.setAttribute('class', 'fa fa-paper-plane');

            btn.appendChild(i);
            btn.appendChild(txt);

            divB.appendChild(btn);

            document.getElementById('content').appendChild(divS);
            document.getElementById('content').appendChild(divD);
            document.getElementById('content').appendChild(divF);
            document.getElementById('content').appendChild(divB);

        }

    }

    xhttp.open("GET", "setEmailColumn?vals="+obj, true);
    xhttp.send();

}