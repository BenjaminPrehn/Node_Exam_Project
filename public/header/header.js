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

