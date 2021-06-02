(async function getProfile() {
    try {
        $.ajax({
            method: "GET",
            url: '/users/me',
            dataType: 'json'
        }).done(function(user) {
            $("#profileName").text(" " + user.firstname + " " + user.lastname);
        });

    } catch (error) {
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
            
        );

    } catch (error) {
        console.log(error);
        alert(error);
        
    }
}

