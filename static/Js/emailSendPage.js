
let selectEmailColumn = () => {

    let email = getId('emailColumn');
    
    startLoader("Select email");

    if(emptyCheck('emailColumn')){
        endLoader("Empty field");
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
                endLoader("Error found");
                return false;
            }
            
            if(this.responseText != 'success'){
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
            textAreaS.setAttribute('name', 'subject');

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
            textAreaD.setAttribute('placeholder', 'Start writing html email body...');
            textAreaD.setAttribute('rows', '6');
            textAreaD.setAttribute('name', 'data');

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
            inputF.setAttribute('name', 'file');

            divF.appendChild(labelF);
            divF.appendChild(inputF);

            let divB = document.createElement("DIV");
            divB.setAttribute('class', 'w3-padding w3-center w3-margin-top');
            
            let btn = document.createElement("BUTTON");
            btn.setAttribute('id', 'sendBtn');
            btn.setAttribute('type', 'button');
            btn.setAttribute('class', 'w3-button w3-theme kel-hover w3-round');
            btn.setAttribute('onclick', 'sendEmail()');

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
            endLoader("Select email");
        }

    }

    xhttp.open("GET", "setEmailColumn?vals="+obj, true);
    xhttp.send();

}

let sendEmail = () => {

    let subject = getId('emailSubject');
    let data = getId('emailData');

    if(emptyCheck('emailSubject')){
        return false;
    }

    if(emptyCheck('emailData')){
        return false;
    }

    subject = subject.value;
    data = data.value;

    startLoader("Send Email");

    let form = getId('content');
    form.method = 'post';
    form.enctype = 'multipart/form-data';
    form.action = 'sendEmail'
    form.submit();

}