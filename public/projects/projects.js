(async function getProjects() {
    try {
        $.ajax({
            method: "GET",
            url: "/projects/all",
            dataType: "json"
        }).done(function(data) {

            $.each(data, function(i, projects) {

                $("<div>").appendTo("#projects")
                    .append($("<h1></h1>").text(projects.description))
                    .append($("<h3></h3>").text(projects.completed))
                    .append($("<button type='button' class='btn btn-danger' onclick=\"deleteProjectById('"+ projects._id +"')\"> Delete </button>"))
            });
        })

    } catch (error) {
        console.log(error);
    }

})();

function deleteProjectById(id) {
    try {
        $.ajax({
            method: "DELETE",
            url: "/projects/" + id,
            dataType: "json"
        }).done(
            location.reload()
        );

    } catch (error) {
        alert("Error")
        console.log(error);
    }
    

}