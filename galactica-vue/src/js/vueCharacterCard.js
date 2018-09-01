module.exports = (function() {
    var Vue = require("vue");
    var VueResource = require('vue-resource');
    Vue.use(VueResource);
    
    Vue.component('ability-description', {
        props: ['cssClass', 'title', 'text'],
        template: `
        <div :class="cssClass">
            <div class="ability-title">{{title}}</div>
            <div class="ability-description">{{text}}</div>
        </div>
        `
    });

    Vue.component('character-card', {
        props: ['card'],
        template: `
            <div class="card">
                <div class="row">
                    <div class="card-name col-12">
                        {{card.name}}
                    </div>
                </div>
                <div class="row data-container">
                    <div class="col-12 col-sm-6">
                        <ul class="character-draws">
                            <li v-for="draw in card.draws">{{draw.sphere}} {{draw.amount}}</li>
                        </ul>
                    </div>
                    <div class="col-12 col-sm-6">
                        <ability-description cssClass="ability-constant" v-bind:title="card.oncePerTurnTitle" v-bind:text="card.oncePerTurnText"></ability-description>
                        <ability-description cssClass="ability-miracle" v-bind:title="card.oncePerGameTitle" v-bind:text="card.oncePerGameText"></ability-description>
                        <ability-description cssClass="ability-weakness" v-bind:title="card.weaknessTitle" v-bind:text="card.weaknessText"></ability-description>
                    </div>
                </div>
                <div class="row startingLocation">
                    <div class="col-12">
                        Starting location: {{card.startLocation}}
                    </div>
                </div>
            </div>
            `
    });
})();