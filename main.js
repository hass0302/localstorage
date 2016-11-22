var contactList = [];
document.addEventListener("DOMContentLoaded", init);
document.querySelector(".buttonCancel").addEventListener("click", cancelEdit);
document.querySelector(".fab").addEventListener("click", addContact);
document.querySelector(".buttonAdd").addEventListener("click", function () {
    let addThis = {
        fullname: document.getElementById("name").value
        , email: document.getElementById("email").value
        , phone: document.getElementById("phone").value
    };
    contactList.push(addThis);
    localStorage.setItem("hass0302", JSON.stringify(contactList));
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".modal").style.display = "none";
    displayContacts();
});

function init() {
    //    localStorage.clear();
    //    localStorage.removeItem("hass0302");
    cancelEdit;
    if (!localStorage.getItem("hass0302") || JSON.parse(localStorage.getItem("hass0302")).length == 0) {
        console.log("No contact data: creating content");
        let contact1 = {
            fullname: "Tony the Tiger"
            , email: "davidst@algonquincollege.com"
            , phone: "613-727-4723"
        };
        contactList.push(contact1);
        localStorage.setItem("hass0302", JSON.stringify(contactList));
    }
    displayContacts();
}

function displayContacts() {
    contactList = JSON.parse(localStorage.getItem("hass0302"));
    let ul = document.querySelector(".contacts");
    ul.innerHTML = "";
    // I opted for regular for loop instead of for each because if there are different entries with the same value then It will mess up
    for (i = 0; i < contactList.length; i++) {
        let li = document.createElement("li");
        li.className = "contact";
        li.id = i;
        let span = document.createElement("span");
        span.className = "delete";
        let h3 = document.createElement("h3");
        h3.textContent = contactList[i].fullname;
        let pe = document.createElement("p");
        pe.className = "email";
        pe.textContent = contactList[i].email;
        let pp = document.createElement("p");
        pp.className = "phone";
        pp.textContent = contactList[i].phone;
        ul.appendChild(li);
        li.appendChild(span);
        li.appendChild(h3);
        li.appendChild(pe);
        li.appendChild(pp);
    }
    let deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(function (value) {
        value.addEventListener("click", deleteContact);
    });
    let editButtons = document.querySelectorAll(".contact h3, .contact p");
    editButtons.forEach(function (value) {
        value.addEventListener("click", editContact);
    });
}

function addContact(ev) {
    // getting the Index
    let li = ev.currentTarget.parentElement;
    let index = li.id;
    // resetting text fields, since its shared with Edit modal.
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    // Add/Save button toggle
    document.querySelector(".buttonSave").style.display = "none";
    document.querySelector(".buttonAdd").style.display = "block";
    // Modal Overlay
    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".modal").style.display = "block";
}

function cancelEdit() {
    // Cosmetic
    // these are not the droids you are looking for move along
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".modal").style.display = "none";
}

function deleteContact(ev) {
    // Not sure to pop a popup yet.
    let li = ev.currentTarget.parentElement;
    let index = li.id;
    // Deleting it from array
    contactList.splice(index, 1);
    // Saving it
    localStorage.setItem("hass0302", JSON.stringify(contactList));
    // Display the list again.
    displayContacts();
}

function editContact(ev) {
    // getting index value
    let li = ev.currentTarget.parentElement;
    let index = li.id;
    // just toggling the Add / Save button. 
    document.querySelector(".buttonAdd").style.display = "none";
    document.querySelector(".buttonSave").style.display = "block";
    // Showing modal
    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".modal").style.display = "block";
    // Displaying the values
    document.getElementById("name").value = contactList[index].fullname;
    document.getElementById("email").value = contactList[index].email;
    document.getElementById("phone").value = contactList[index].phone;
    // Showing modal
    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".modal").style.display = "block";
    // Save button
    document.querySelector(".buttonSave").addEventListener("click", function () {
        contactList[index].fullname = document.getElementById("name").value;
        contactList[index].email = document.getElementById("email").value;
        contactList[index].phone = document.getElementById("phone").value;
        localStorage.setItem("hass0302", JSON.stringify(contactList));
        // Hide Modal
        document.querySelector(".overlay").style.display = "none";
        document.querySelector(".modal").style.display = "none";
        displayContacts();
    });
}