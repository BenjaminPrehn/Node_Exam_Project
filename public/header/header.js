(async function getProfile() {
    try {
        await $.ajax({
            method: "GET",
            url: '/users/me',
            dataType: 'json'
        }).done(function(user) {
            $("#profileName").text(" " + user.firstname + " " + user.lastname);
        });

    } catch (error) {
        alert("Error occured when login out - Please try again");
        console.log(error);
    }

})();

function logout() {
    try {
        $.ajax({
            method: "POST",
            url: "/users/logout",
            dataType: "json"
        }).done(
            location.reload()
        );

    } catch (error) {
        alert("Error occured when login out - Please try again");
        console.log(error);
    }
}

