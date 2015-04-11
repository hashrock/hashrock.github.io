// Code goes here

function getCover(card) {
    if (card.attachments && card.attachments.length > 0 && card.attachments[0].previews) {
        return card.attachments[0].previews[3].url;
    }
    return "";
}


function getCard(cards, listId) {
    return cards
        .filter(function(card) {
            return card.idList === listId;
        }).map(function(card) {
            return {
                name: card.name,
                cover: getCover(card),
                desc: marked(card.desc)
            }
        });
}

new Vue({
    el: "#main",
    data: {
        products: [],
        ideas: [],
        result: ""
    },
    ready: function() {
        var self = this;
        fetch("https://jsonp.afeld.me/?url=https%3A%2F%2Ftrello.com%2Fb%2FVusqcRPc%2Fproduct.json")
            .then(function(response) {
                return response.json()
            }).then(function(json) {
                var lists = json.lists.map(function(list) {
                    return {
                        name: list.name,
                        cards: getCard(json.cards, list.id)
                    };
                })
                self.result = JSON.stringify(lists);
                self.products = lists.filter(function(item) {
                    return item.name === "作った"
                })[0].cards;

                self.ideas = lists.filter(function(item){
                    return item.name === "作りたい"
                })[0].cards;
            })
    }
});