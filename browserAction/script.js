
// Initialize Firebase app object
if (!firebase.apps.length)
    firebase.initializeApp(config);
else
    firebase.app();

// To check for Database updates
var onUpdate = 0;

// DOM object to access <ol> element
var meeting_list = document.getElementById("meeting-list");

// Firebase database connection object
var ref = firebase.database().ref().child("Roles");

// Listening for changes to database
ref.on("value", function (snapshot) {

    // If the meeting detail is updated
    if (onUpdate == 1) {
        alert("Next Meeting Details updated!");
        meeting_list.innerHTML = "";
    }

    // For checking updates
    onUpdate = 1;

    // Parse JSON values
    var values = snapshot.val();
    var sorted_values = [];
    for (var key in values) {
        if (values.hasOwnProperty(key)) {
            sorted_values.push([key, values[key]]);
        }
    }
    sorted_values.sort(function (a, b) {
        return parseFloat(a[1].order) - parseFloat(b[1].order);
    });

    // Insert values into meeting_list
    for (var x in sorted_values) {
        var role_title = sorted_values[x][0];
        var role_name = "Default";

        if (sorted_values[x][1]["Name"] != undefined)
            role_name = sorted_values[x][1]["Name"];
        else
            role_name = sorted_values[x][1]["Speaker"] + " : " + sorted_values[x][1]["Project"] + " : " + sorted_values[x][1]["Evaluator"];

        // Create a DOM object of type <li>
        var li = document.createElement("li");
        li.className = "list-group-item";

        // IMPORTANT: sanitize incoming text
        var role_text = document.createTextNode(role_title + ": " + role_name);
        li.appendChild(role_text);

        // Add <li> to meeting_list
        meeting_list.appendChild(li);

    }
});