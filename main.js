var count = -1;
var rlist = [];

// Ingredient class
class Ingredient {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}

// Function that checks if a given name is in rlist
function isInRlist(name) {
    for (i = 0; i < rlist.length; i++) {
        if (rlist[i] != null && rlist[i].name == name) {
            return 1;
        }
    }
    return 0;
}

// fucnction called at onClick event of the button "add ingredient"
function insertReceipe() {
    var rname = document.getElementById("rname");
    var rquant = document.getElementById("rquant");

    // check if the name of the ingredient is already in the recipeList, and
    // checks if the value is empty
    if (isInRlist(rname.value) || rname.value == "") {
        rname.className = "form-control border-warning";
        return;
    } else {
        rname.className = "form-control";
    }

    // checks if quantity is empty
    if (rquant.value == "") {
        rquant.className = "form-control border-warning";
        return;
    } else {
        rquant.className = "form-control";
    }

    count += 1; // is meant to be an identifier id for the inputs
    newIngredient = new Ingredient(rname.value, rquant.value);
    rlist[count] = newIngredient; // adds the ingredient at id position

    var recipelist = document.getElementById("recipeList");
    var tmp = document.createElement("div");
    tmp.className = "row";

    var row1 =
        '<div class="col-md-12"><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="';
    var row2 = '">';
    var row3 = '</span></div><input type="text" id="';
    var row4 =
        '" class="form-control" placeholder="Quantity" onInput="change(this);" onChange="saveChange();"><div class="input-group-append"><span class="input-group-text">g/ml/qnt</span><button class="btn btn-outline-secondary" type="button" onClick="deleteIngredient(this);">X</button></div></div></div>';

    var composed =
        row1 +
        "name_" +
        count +
        row2 +
        rname.value +
        row3 +
        "qnt_" +
        count +
        row4;

    tmp.innerHTML = composed;

    recipeList.appendChild(tmp);
    document.getElementById("qnt_" + count).value = rquant.value;

    rname.value = "";
    rquant.value = "";
}

// called whenever an input is set, visually change the value of all inputBoxes
// without updating the recipelist!
function change(elem) {
    var id = elem.id;
    id = id.slice(4);

    prev = rlist[id].quantity;

    // the proportion is done with the value from the rlist
    var k = elem.value / prev;

    console.log("k= " + k);

    for (i = 0; i < rlist.length; i++) {
        var act = document.getElementById("qnt_" + i);

        if (act != null && rlist[i] != null && act != elem) {
            //console.log("i=" + i + " rlist= " + rlist[i].quantity);

            act.value = rlist[i].quantity * k;
        }
    }
}

// called when a inputBox is changed, saves the changes in the rlist array
function saveChange() {
    for (i = 0; i < rlist.length; i++) {
        if (rlist[i] != null) {
            rlist[i].quantity = document.getElementById("qnt_" + i).value;
        }
    }
}

// Input check, accepting or not a keypress event, checked with regular
// expressions if the key pressed is a number or a dot
// source: stackoverflow
function validate(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === "paste") {
        key = event.clipboardData.getData("text/plain");
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

// deletes the input group from the html and from the rlist
function deleteIngredient(elem) {
    // gets the id of the element
    var id = elem.parentElement.parentElement.firstChild.firstChild.id.split(
        "name_"
    )[1];

    if (id != null && id != "") {
        delete rlist[id];
    }

    // I don't know if this is a good way to do this
    elem.parentElement.parentElement.parentElement.parentElement.remove();
}
