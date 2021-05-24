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
                                projects.completed 
                            + "</td> <td>" + 
                                "<a href=''><span class='fas fa-edit'></span></a>" + 
                                "<a onclick=\"deleteProjectById('"+ projects._id +"')\"><span class='fas fa-trash-alt'></span></a>"
                        + "</td> </tr>"))
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

$(document).ready(function(){

    $(".create-project-form").hide();
    
    $("#toggle-form").click(function(){
      $(".create-project-form").toggle();
    });

  });