class Liked{
    constructor(){
        this.poleLiked = [];
    }

    addFact(text){
        this.poleLiked.push(text);
    }

    printLiked(){
        return this.poleLiked + " ";
    }

}

class Disliked{
    constructor(){
        this.poleDisLiked = [];
    }

    addFact(text){
        this.poleDisLiked.push(text);
    }

    printDisLiked(){
        return this.poleDisLiked  + " ";
    }
}
$(document).ready(() => {

    let ids = ["bitcoin","ethereum","tether","cardano","dogecoin","solana","spacevikings","stellar","fantom"];

    function dogCard(img, name,czk,fol){
        let text = `
        <div class="cards" id="cards">
            <div class="card" style="width: 18rem;">
            <img src="${img}" class="card-img-top" alt="img">
            <div class="card-body">
            <h5 class="card-title">${name}</h5>
             <p class="card-text">CZK: ${czk} Kč</p>
             <p class="card-text">Twitter followers: ${fol}</p>
            </div>
        </div>
      </div>`;
        return text;
    }



    function getCoinID(id){
        $.ajax({
            url: `https://api.coingecko.com/api/v3/coins/${id}`,
            type: "GET",
            success: function (result) {
              console.log(result);
              $(".coinFact").append(dogCard(result.image.large, result.id, result.market_data.current_price.czk ,result.community_data.twitter_followers));
            },
            error: function (error) {
              console.log("Error");
            },
        });
    }

    let id;
    $(".newFact").click(function() {
        id = Math.floor((Math.random() * ids.length));
        console.log(ids[id]);
        getCoinID(ids[id]);
        $(".newFact").css("display","none");
        
    });

    $(".newFactCard").click(function() {
        $("#coinFact").empty();
        id = Math.floor((Math.random() * ids.length));
        console.log(ids[id]);
        getCoinID(ids[id]);
    });
    
    let a = new Liked();
    let b = new Disliked();

    $("#like").click(function() {
        a.addFact(ids[id]);
        $(".l").animate({
            opacity: .5,
            opacity: 1
        })
        console.log("liked");
    });
    $("#dislike").click(function() {
        b.addFact(ids[id]);
        $(".d").animate({
            opacity: .5,
            opacity: 1
        });
        console.log("disliked");
    });
    
    $(".likedBtn").click(function() {
        $(".liked").append(a.printLiked());
    });
    $(".dislikedBtn").click(function() {
        $(".disliked").append(b.printDisLiked());
    });
    

});