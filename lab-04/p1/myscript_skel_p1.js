/***
 * TODO - Add an alert to be displayed
 *        when the page is _loaded_
 * 
 * > Hint - EventListener()
 */

document.addEventListener("DOMContentLoaded", function(){
    alert("Page loaded!");
    // interioriul functiei
}); 

/**
 * TODO - Replace the text of the <h1 /> header
 * 
 * > Hint - use the _id_ associated with it
 */
document.getElementById("header_1").innerText = "New Header Text";


/**
 * TODO - Display a message when the button with the id = "btn"
 *        is clicked
 *  - you can either display it as an alert, or as a text in the page
 */
document.getElementById("btn").addEventListener("click", function(){
    alert("Button Clicked!");
    // interioriul functiei
}); 

/***
 * Don't change
 */

let curr = ``;
let ids = [];

for (let i = 0; i < 10; i++) {
    let aux = "d_" + i;
    ids.push(aux);

    curr += `<div class="ex2" id = ${ids[i]}> </div>`;
}

// use console.log() to check the content of ids
console.log(ids);

document.getElementById('res').innerHTML = curr;

for (let i = 0; i < 10; i++) {
    randColor = Math.floor(Math.random() * 16777215).toString(16);
    document.getElementById(ids[i]).style.backgroundColor = "#" + randColor;
}

/**
 * TODO - For each element having the id "d_<even_number>"
 *        remove the "ex2" class and replace it with "ex" class
 * 
 *      - Also, for each of these elements, add some text
 * 
 * > Hint - classList()
 */

for (let i = 0; i < 10; i++){
    if(i%2==0){
        let element = document.getElementById(ids[i]);
        element.classList.remove("ex2");
        element.classList.add("ex");
        element.innerText = "This is element " + ids[i];
    }
}

/**
 * TODO - For each element having the class "ex2"
 *        add a border
 * 
 * > Hint - getElementsByClassName()
 */

let ex2Elements = document.getElementsByClassName("ex2");
for(let element of ex2Elements){
    element.style.border = "2px solid black";

}