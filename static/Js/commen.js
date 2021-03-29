
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

let startLoader = () => {
    
}

let endLoader = () => {
    
}

let errorCheck = (value) => {

    if(value.includes("Error:")){
        vals = value.split("Error:");
        alert(vals[1]);
        return true;
    }

    return false;

}