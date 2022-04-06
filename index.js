async function getUsers() {
    let url = 'https://filltext.com/?rows=10&fname={firstName}&lname={lastName}&category=[%22category1%22,%22category2%22,%22category3%22]&pretty=true';
    try {
        let responseBody = await fetch(url);
        return await responseBody.json();
    } catch (error) {
        console.log(error)
    }
}
async function renderUsers() {
    let users = await getUsers();
    let html = '';
    users.map(user => {
        let fl = user.fname.charAt(0)
        let ll = user.lname.charAt(0)
        let htmlSegment = `<div class="filterDiv ${user.category}">
        <div class="circle">${fl}${ll}</div>
        <div>${user.fname} ${user.lname}</div>
        <div class="btn">${user.category}</div>
        </div>`;
        html += htmlSegment
    });
    let container = document.querySelector('.container');
    container.innerHTML = html
}

renderUsers();
filterSelection("all")
function filterSelection(c) {

    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";

    for (i = 0; i < x.length; i++) {
        console.log("=1=")
        removeCategory(x[i], "show");
        var paragraph = document.getElementById("d");
        var text = document.createTextNode(x[i].className.indexOf(c));

        paragraph.appendChild(text);
        if (x[i].className.indexOf(c) > -1) addCategory(x[i], "show");
    }
}

function addCategory(element, name) {
    console.log("=1=")

    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");

    for (i = 0; i < arr2.length; i++) {

        if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
    }
}

function removeCategory(element, name) {
    console.log("=1=")

    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");


    for (i = 0; i < arr2.length; i++) {
        var paragraph = document.getElementById("p");
        var text = document.createTextNode(arr1.indexOf(arr2[i]));

        paragraph.appendChild(text);
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}