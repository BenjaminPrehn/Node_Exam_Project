// Getting the user data 
(async function getProfile() {
    try {
       $.ajax({
            method: "GET",
            url: "/users/me",
            dataType: "json"
        }).done(function(user) {
            
            // Adding name to header
            $("#profileName").text(" " + user.firstname + " " + user.lastname);

            // Adding profile info for profile page
            $("#name").text(user.firstname + " " + user.lastname);
            $("#email").text(user.email);

            // Adding profile info for profile Modal
            $("#firstnameModal").val(user.firstname);
            $("#lastnameModal").val(user.lastname);

            $("#room-username").val(user.firstname + " " + user.lastname)
            
        });

    } catch (error) {
        console.log(error);
    }

})();

// Button function logout all users
function logoutAll() {
    try {
        $.ajax({
            method: "POST",
            url: "/users/logoutAllSessions",
            dataType: "json"
        }).done(
            
        );
        
    } catch (error) {
        alert("Error occured when login out - Please try again");
        console.log(error);
    }
};

// Delete the user
function deleteUser() {
    try {
        $.ajax({
            method: "DELETE",
            url: "/users/me",
            dataType: "json"
        }).done(
            
        );

    } catch (error) {
        alert("Error occured when deleting user - Please try again");
        console.log(error);
    }
};

// Check if password is the same
function checkPassword(form) {
    password1 = form.password1.value;
    password2 = form.password2.value;
          
    // If Not same return False.    
    if (password1 != password2) {
        $("#passMismatch").removeAttr("hidden");
        return false;
    } else if (password2.length < 6){
        $("#toShortPass").removeAttr("hidden");
        return false;
    } else{
        $("#changedSuccess").removeAttr("hidden");

        alert ("\nPassword was succesfully updated!")
        
        return true;

        
    }
}