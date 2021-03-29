
let getId = (id) => {
    return document.getElementById(id);
}

let emptyCheck = (id) => {

    if(document.getElementById(id).value == ""){
        alert(id + " field is missing");
        return true;
    }

    return false;

}

let startLoader = (message = 'loader') => {
    console.log(message + " started");
    document.getElementById('loader-modal').style.display = 'block';
}

let endLoader = (message = 'loader') => {
    console.log(message + " ended");
    document.getElementById('loader-modal').style.display = 'none';
}

let errorCheck = (value) => {

    if(value.includes("Error:")){
        vals = value.split("Error:");
        alert(vals[1]);
        return true;
    }

    return false;

}