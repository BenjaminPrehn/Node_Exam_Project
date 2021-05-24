// Getting the user data 
(async function getProfile() {
    try {
       await $.ajax({
            method: "GET",
            url: "/users/me",
            dataType: "json"
        }).done(function(user) {
            
            $("#firstname").val(user.firstname);
            $("#lastname").val(user.lastname);
            $("#email").val(user.email);
            
        });

    } catch (error) {
        console.log(error);
    }

})();

function update() {
    try{
        $.ajax({
            method: "PATCH",
            url: "/users/me",
            dataType: "json"
        }).done(function(user) {
            
            user.firstname = $("#firstname").val();
            user.lastname = $("#lastname").val();
            user.email = $("#email").val();
            
        });
    } catch (error) {
        console.log(error);
    }
};