const Url = "https://tastedive.com/ask/ws";  
const accessKey = "403876-JacobBra-TTTBUVGF";

function getDataFromAPI(theQuery, callbackFunc)
{    
    $.ajax({
        url: `${Url}`,
        type: "get",
        dataType: "jsonp",        
        data: {
            q: `${theQuery}`,
            format: "json",
            type: "movies",
            info: 1,
            limit: 6,
            k: `${accessKey}`,             
        }    
    })        
        .done(callbackFunc)  
        .fail(function() {
            alert("Server error, Please try search again!.");
    }); 
}
function renderResult(result) {   
    return `      
      <div class="result">
        <p class="bold"> ${result.Name} </p>
        <iframe width=100% height=200 src="https://www.youtube.com/embed/${result.yID}?feature=oembed\" frameborder="0" allowfullscreen></iframe> 
        <p class="description"> ${result.wTeaser}</p>        
        <p>\n</p>
      </div>      
    `;    
}
function displayDataFromAPI(data)
{   
    if(data.Similar.Results.length === 0)
    {
        $('.js-search-results').html(`        
          <p class="bold"> Movies for this search not found. </p>       
        `);
    }
    else
    {
        const results = data.Similar.Results.map((item, index) => renderResult(item));
    
        $('.js-search-results').html(results); 
    } 
     
}


function GetSearchQuery(event){
    return $(event.currentTarget).find('.js-query').val();    
    
}


function handleGetMoviesButtonClick()
{
    //this function is the event handler for when the user clicks on the Get Movies button in the Search Page.
    //A list of movies similar to the inputted movie or topic is displayed.  The movie name, description, 
    //and trailer is listed for each suggested movie.    
    
    $('.js-form').on('submit', function(event) {
        event.preventDefault();
        
        let searchQuery = GetSearchQuery(event);

        //clear the search query textbox
        $(event.currentTarget).find('.js-query').val('');

        //get the data from the TasteDive API
        getDataFromAPI(searchQuery, displayDataFromAPI);        
                
    });    
}


function handleMovieApp()
{ //This function will handle the movie app events 
    handleGetMoviesButtonClick(); 
}

$(handleMovieApp);
