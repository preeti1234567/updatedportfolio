$(function () {
    $(document).ready(function(){
      loadData()
    });

    function loadData()
    {
        $.ajax("/api/projects", {
            type: "get",
          }).then(
            function () {
              location.reload();
            }
          );
    }

    function createCard()
    {
        var card = $(`<div class="card blue-grey lighten-3 onetime-card center-align" style="display: inline-block; margin-right: 2%" data-amount=${rowElement.amount}>`)
        var cardContent = $('<div class="card-content">')
        var cardTitle = $('<span class="card-title title-text">')
        cardTitle.text(rowElement.title)
        var purchaseCost = $('<p>')
        purchaseCost.text("Cost: $" + Math.ceil(rowElement.amount))
        var averageDailySavings = $('<p>')
        averageDailySavings.text("Current daily saving: $" + Math.ceil(savings))
        var suggestion = $('<p>')
        var cardButton = $(`<br><a style="margin-left:0" class="btn-flat black-text purchase-btn" data-id=${rowElement.id}>Make Purchase</a>`)
        var deleteButton = $(`<a class="btn-floating btn-small waves-effect waves-light blue-grey darken-4 onetime-delete" data-id=${rowElement.id}><i class="material-icons">clear</i></a>`)
        if (savings <= 0) {
            suggestion.text("Right now, you are not saving enough to make this purchase")
            suggestion.css("font-weight", "bold")
            cardButton.html("Make Purchase <span class='red-text' style='font-weight: bolder'>(Not Recommended)</span>")
        }
        else {
            var time = Math.ceil(rowElement.amount / savings)
            suggestion.text("You will save enough or this purchase after " + time + " day(s)")
        }
        cardContent.append(cardTitle)
        cardContent.append(purchaseCost)
        cardContent.append(averageDailySavings)
        cardContent.append(suggestion)
        cardContent.append(cardButton)
        card.append(cardContent)
        card.append(deleteButton)

        return card
    }
}); 