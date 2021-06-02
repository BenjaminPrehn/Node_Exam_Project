(async function getProjects() {
    try {
       $.ajax({
            method: "GET",
            url: "/projects/all",
            dataType: "json"
        }).done(function(data) {

            $.each(data, function(i, projects) {

                $("#addData")
                    .append(
                        $("<tr> <td>" +
                                projects.description 
                            + "</td> <td>" + 
                                projects.status
                            + "</td> <td>" + 
                                "<a href='' onclick=\"getProjectById('"+ projects._id +"')\" data-bs-toggle='modal' data-bs-target='#updateProjectModal'><span class='fas fa-edit'></span></a>" + 
                                "<a href='' onclick=\"deleteProjectById('"+ projects._id +"')\"><span class='fas fa-trash-alt'></span></a>"
                        + "</td> </tr>"))
            });
        })

    } catch (error) {
        console.log(error);
    }

})();

// Get a project by it's id
function getProjectById(id) {
    try {
           $.ajax({
                method: "GET",
                url: "/projects/" + id,
                dataType: "json"
            }).done(
                function(project) {
                console.log(project.description);
                $("#descriptionUpdate").val(project.description);
                $("#statusUpdate").val(project.status);

                $("#updateForm").attr("action", "/projects/" + project._id);
            }
            
        );
    } catch (error) {
        alert("Error")
        console.log(error);
    }
}

function updateProjectById(id) {
    try {
        $.ajax({
            method: "POST",
            url: "/projects/" + id,
            dataType: "json"
        }).done()
            location.reload()
        } catch (error) {
            console.log(error);
    }
}

// Delete a project by its ID 
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
    
};



$(document).ready(function(){


  });