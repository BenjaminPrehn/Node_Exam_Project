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
                                projects.title
                            + "</td> <td>" + 
                                projects.status
                            + "</td> <td>" + 
                                moment(projects.createdAt).format("YYYY-MM-DD")
                            + "</td> <td>" + 
                                moment(projects.updatedAt).format("YYYY-MM-DD")
                            + "</td> <td>" + 
                            "<a href='' onclick=\"viewProjectById('"+ projects._id +"')\" data-bs-toggle='modal' data-bs-target='#viewProjectModal'><span class='fas fa-eye'></span></a>" + 
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

                $("#title").text(project.title);

                $("#titleUpdate").val(project.title);
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

// View a project by it's id
function viewProjectById(id) {
    try {
           $.ajax({
                method: "GET",
                url: "/projects/" + id,
                dataType: "json"
            }).done(
                function(project) {

                $("#title").text(project.title);
                $("#description").text(project.description);
                $("#status").text(project.status);

            }
            
        );
    } catch (error) {
        alert("Error")
        console.log(error);
    }
}

// Update a project by it's id
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