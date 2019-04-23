if (!firebase.apps.length) {
    firebase.initializeApp(config)
}
else
    firebase.app();

alert("test");

items = [];
var onCreate = 0;

var ref = firebase.database().ref().child("Roles");

var p1 = document.getElementById("meeting-list");

ref.on("value", function (snapshot) {

    if (onCreate == 1) {
        items.length = 0;
        alert("Next Meeting Details updated!");
        p1.innerHTML = "";
    }

    onCreate = 1;

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

    for (var x in sorted_values) {
        var role_title = sorted_values[x][0];
        var role_name = "Testing";
        var role_description = "Default description"

        if (sorted_values[x][1]["Name"] != undefined)
            role_name = sorted_values[x][1]["Name"];
        else
            role_name = sorted_values[x][1]["Speaker"] + " : " + sorted_values[x][1]["Project"] + " : " + sorted_values[x][1]["Evaluator"];

        if (sorted_values[x][1]["description"] != undefined)
            role_description = sorted_values[x][1]["description"];

        // alert(role_name + role_title + role_description);
        // items.push({
        //     title: role_title,
        //     note: role_name,
        //     description: role_description
        // });

        p1.innerHTML = p1.innerHTML + '<li class="list-group-item"><b>' + role_title + ":</b> " + role_name + "</li>";

        // alert(items);
    }
});

if (onCreate == 0) {
    //   some loading thing
}