<style>
    .header__centered{
        text-align: center;
        margin-top: 4rem;
    }
</style>

<template>
    <header>
        <div class="header__centered">
            <img src="https://pbs.twimg.com/profile_images/516989081239027712/PALZRFOI_400x400.png" alt="" class="header__avatar" />
        </div>
        <div class="header__centered">
            <a href="https://twitter.com/hashedrock">Twitter</a> /
            <a href="https://github.com/hashrock">Github</a> /
            <a href="http://hashrock.hatenablog.com/">Blog</a> /
            <a href="https://github.com/sushicorp">Sushicorp</a>
        </div>
    </header>
    <main>
        <h2>作ったもの</h2>
        <div class="products">
            <div class="products__item" v-for="product in products" :style="{backgroundImage: 'url(' + product.cover + ')'}">
                <div class="products__item__darken"></div>
                <div class="products__item__desc">
                    <h3>{{product.name}}</h3>
                    <p>
                        {{{product.desc}}}
                    </p>
                </div>
            </div>

        </div>

        <h2>アイデアリスト</h2>
        <div class="ideaList">
            <ul>
                <li v-for="idea in ideas">
                    {{idea.name}}
                </li>
            </ul>

        </div>

        <!-- footer -->
        <footer>
            <p>&copy 2016 hashrock</p>
        </footer>
    </main>
</template>

<script>
var marked = require("marked");
function getCover(card) {
    var attachments = card.attachments;
    if ( attachments&& attachments.length > 0 && attachments[0].previews) {
        var previews = attachments[0].previews;
        return previews[previews.length - 1].url;
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

  module.exports = {
    data: function(){
        return {
            products: [
                {
                    name: "Loading...",
                    cover:"",
                    desc:""
                }
            ],
            ideas: [{name: "loading..."}],
            result: ""
        }
    },
    ready: function() {
        var self = this;
        fetch("https://s3.amazonaws.com/resource.hashrock.github.io/product.json")
            .then(function(response) {
                return response.json()
            }).then(function(json) {
                var lists = json.lists.map(function (list) {
                    return {
                        name: list.name,
                        cards: getCard(json.cards, list.id)
                    };
                });
                self.result = JSON.stringify(lists);
                self.products = lists.filter(function(item) {
                    return item.name === "作った"
                })[0].cards;

                self.ideas = lists.filter(function(item){
                    return item.name === "作りたい"
                })[0].cards;
            })
    }
}
</script>