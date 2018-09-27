// create functions to make the buttons in index.handlebars work
$(function() {
    $(".change-devour").on("click", function(event) {
        var id = $(this).data("id");
        var devour = $(this).data("devour");

        var eatStatus = {
            devoured: devour
        }

        $.ajax("/api/burgers/" + id, {
            type: "PUT", 
            data: eatStatus
        }).then(
            function() {
                console.log("Eat Status: " + devour);
                location.reload();
            }
        );
    });

    $(".burgerForm").on("submit", function(event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#message").val().trim(),
            devoured: false
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("New burger logged");
                location.reload();
            }
        );
    });
});