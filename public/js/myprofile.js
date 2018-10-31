$(document).ready(function () {

  $(".get-destinations-all").on("click", function () {
    var x = $(this).parent().parent();
    console.log(x);

    if (x) {
      if (x.attr("style") === "none") {
        x.attr("style", "block");
      } else {
        x.attr("style","none");
      }

    }
   
    {
      const tripID = $(this).val();
      console.log(tripID);
      const url = "/getdestinations/" + tripID;
      var htmlTable = $(this).parent().closest('tr');
      console.log(htmlTable);

      $.ajax(url, {
        type: "GET"
      }).then(function (data) {
        console.log(data);
        var destinationsTable = createDestTable(data);
        $("#destinations-table").html(destinationsTable);

        //htmlTable.append(destinationsTable);
      });
    }
  });

  $(document).on('click', ".dropdown-menu li a", function () {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
  });

  $(document).on('click', '.btn-add-review', function () {
    // alert("This id" + $(this).val());
    const destinationID = $(this).val();
    const category = $(this).parent().parent().find(".review-category").text();
    const rating = $(this).parent().parent().find(".review-rating").attr("value");
    const review_text = $(this).parent().parent().find(".review-text").val();
    $(this).parent().parent().find(".review-category").text("Review Category");
    $(this).parent().parent().find(".review-rating").text("Rating");
    $(this).parent().parent().find(".review-text").val("");
    const spantag = $(this).parent().parent().find(".message");
    var newReview = {
      titleCategory: category,
      review: review_text,
      rating: rating,
      DestinationId: destinationID
    };
    //console.log(newDestination);
    $.ajax("/reviews", {
      type: "POST",
      data: newReview
    }).then(
      function (response) {
        spantag.text("Review added succesfully. Add another if you want to ");
        console.log("created new review");
      });
  });


});


function createDestTable(data) {
  var tableforDestinations = `<tr><td colspan="3">
<table class="table table-bordered" value="table-destination" id="destinations-table"><thead><tr><th scope="col">Country/State/City</th>      
      <th scope="col">Review Category</th>
      <th scope="col">Rating</th>
      <th scope="col">Review Text</th>
      <th scope="col">Add Review</th>
      </tr></thead>`;
  data.forEach(destination => {
    tableforDestinations += `<tr>
      <td>${destination.destinationCountry}/${destination.destinationState}/${destination.destinationCity}</td>      
      <td><div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle review-category" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Review Category
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li><a class="dropdown-item" href="#">Food</a></li>
        <li><a class="dropdown-item" href="#">Hotels</a></li>
        <li><a class="dropdown-item" href="#">Attractions</a></li>
      </ul>
    </div></td>
      <td><div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle review-rating" type="button" data-toggle="dropdown" aria-haspopup="true"
        aria-expanded="false" >
        Rating
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li><a class="dropdown-item" data-value="1">1(Strongly Disagree)</a></li>
        <li><a class="dropdown-item" data-value="2">2</a></li>
        <li><a class="dropdown-item" data-value="3">3</a></li>
        <li><a class="dropdown-item" data-value="4">4</a></li>
        <li><a class="dropdown-item" data-value="5">5(Strongly Agree)</a></li>

      </ul>
    </div></td>
      <td><textarea class="form-control review-text" aria-label="With textarea"></textarea></td>
      <td><button type="button" value="${destination.id}" class="btn btn-outline-success btn-add-review">Add a Review</button><div><span class="message"></span></div></td>     
      </tr>`;
  });
  tableforDestinations += '</table></td></tr>';
  return tableforDestinations;
}