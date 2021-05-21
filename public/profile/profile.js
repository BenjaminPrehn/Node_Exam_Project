(async function getProfile() {
    try {
        $.ajax({
            method: "GET",
            url: '/users/me',
            dataType: 'json'
        }).done(function(user) {
                $('<div>').appendTo("#getProfile")
                    .append($("<h1></h1>").text(user.firstname))
                    .append($("<h3></h3>").text(user.email));
        });

    } catch (error) {
        console.log(error);
    }

})();