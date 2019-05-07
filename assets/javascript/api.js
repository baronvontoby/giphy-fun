$(document).ready(function () {
    
    var topics = ["Lion King", "Beauty and the Beast", "Moana", "Sleeping Beauty", "Snow White", "Cinderella"];
    
    
    $(document).on("click", ".movie", function(){
        var title  = $(this).attr("title");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + title + "&api_key=eSl0jNIgxwpPAairAjjs9x5pCXyGulyO&limit=10"
        
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            console.log(response);
            for (let i = 0; i<response.data.length; i++){
                var imageURL = response.data[i].images.downsized_still.url;
                var imageAnimate = response.data[i].images.downsized_medium.url;
                var image = $("<img>");
                image.attr("src", imageURL);
                image.addClass("gif");
                image.attr("data-state", "still");
                image.attr("data-still", imageURL);
                image.attr("data-animate", imageAnimate);
                image.attr("alt", "title");
                $("#gifs-view").prepend(image);
            }
        });    
    });

    $(document).on("click", ".gif", function(){
            var state = $(this).attr("data-state");
                
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
    });
    
    function renderButtons () {
        $("#buttons").empty();
        for (let i = 0; i<topics.length; i++) {
            let btn = $("<button>");
            btn.addClass("movie btn-info");
            btn.attr("title", topics[i]);
            btn.text(topics[i]);
            $("#buttons").append(btn);           
        }
    }
    
    $("#submit").on("click", function(event){
        event.preventDefault();
        var topic = $("#gif-search").val().trim();
        topics.push(topic);
        renderButtons();
    });
    
    
    renderButtons();
    

    

    function alertMe() {
        console.log("hello!", $(this).attr("title"));
    }

    
});