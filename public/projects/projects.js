(async function getProjects() {
    try {
        $.ajax({
            method: "GET",
            url: '/projects/all',
            dataType: 'json'
        }).done(function(data) {

            $.each(data, function(i, projects) {

                $('<div>').appendTo("#projects")
                    .append($("<h1></h1>").text(projects.description))
                    .append($("<h3></h3>").text(projects.completed));
            });
        })

    } catch (error) {
        console.log(error);
    }

})();