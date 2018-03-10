var favMovies = new Firebase('https://perumagalur-3fab9.firebaseio.com/');
 
function saveToList(event) {
    if (event.which == 13 || event.keyCode == 13) { // as the user presses the enter key, we will attempt to save the data
        var movieName = document.getElementById('movieName').value.trim();
        var amt = document.getElementById('amt').value.trim();
        if (movieName.length > 0) {
            saveToFB(movieName,amt);
        }
        document.getElementById('movieName').value = '';
        document.getElementById('amt').value = '';
        return false;
    }
};
 
function saveToFB(movieName,amt) {
    // this will save data to Firebase
    favMovies.push({
        name: movieName,
        amt:amt
    });
};
 



function refreshUI(list) {
    var lis = '';
    for (var i = 0; i < list.length; i++) {
        lis += '<tr><td data-key="' + list[i].key + '">' + list[i].name + '</td><td>'+ list[i].amt + '</td><tr>';
    };
    document.getElementById('tab').innerHTML = lis;
};
 
// this will get fired on inital load as well as when ever there is a change in the data
favMovies.on("value", function(snapshot) {
    var data = snapshot.val();
    var list = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            name = data[key].name ? data[key].name : '';
amt = data[key].amt ;
            if (name.trim().length > 0) {
                list.push({
                    name: name,
                    key: key,
                    amt:amt
                })
            }
        }
    }
    // refresh the UI
    refreshUI(list);

});