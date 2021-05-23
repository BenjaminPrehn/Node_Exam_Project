(async function getProfile() {
    try {
       await $.ajax({
            method: "GET",
            url: "/users/me",
            dataType: "json"
        }).done(function(user) {
            
            $("#name").text(user.firstname + " " + user.lastname);
            $("#email").text(user.email);
                
        });

    } catch (error) {
        console.log(error);
    }

})();

function logoutAll() {
    try {
        $.ajax({
            method: "POST",
            url: "/users/logoutAllSessions",
            dataType: "json"
        }).done(
            location.reload()
        );

        
    } catch (error) {
        alert("Error occured when login out - Please try again");
        console.log(error);
    }
};

function deleteUser() {
    try {
        $.ajax({
            method: "DELETE",
            url: "/users/me",
            dataType: "json"
        }).done(
            location.reload()
        );

    } catch (error) {
        alert("Error occured when deleting user - Please try again");
        console.log(error);
    }
};