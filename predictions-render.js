(function () {
    'use strict';

    function buildCard(tip) {
        var card = document.createElement('article');
        card.className = 'prediction-card';

        var league = document.createElement('div');
        league.className = 'league';
        league.textContent = tip.league || 'Sample league';

        var match = document.createElement('div');
        match.className = 'match';
        match.textContent = tip.match || 'Sample fixture';
        var badge = document.createElement('span');
        badge.className = 'sample-badge';
        badge.textContent = 'DEMO';
        match.appendChild(badge);

        var date = document.createElement('div');
        date.className = 'match-time';
        date.textContent = tip.dateLabel || 'Sample fixture, not scheduled';

        var prediction = document.createElement('div');
        prediction.className = 'prediction';
        prediction.textContent = 'Sample selection: ' + (tip.prediction || 'Not set');

        var odds = document.createElement('div');
        odds.className = 'odds';
        odds.textContent = 'Illustrative decimal odds: ' + (tip.odds || 'N/A');

        var writeup = document.createElement('div');
        writeup.className = 'writeup';
        writeup.textContent = tip.writeup || '';

        card.append(league, match, date, prediction, odds, writeup);
        return card;
    }

    function render() {
        var container = document.getElementById('predictions-list');
        if (!container || !window.PredictionDB) return;

        var min = Number(document.body.dataset.minOdds || 0);
        var max = Number(document.body.dataset.maxOdds || Infinity);
        var limit = Number(document.body.dataset.limit || Infinity);
        var tips = window.PredictionDB.getTips().filter(function (tip) {
            var odds = Number(tip.odds);
            return tip.isDemo === true && odds >= min && odds < max;
        }).slice(0, limit);

        if (!tips.length) {
            var empty = document.createElement('p');
            empty.className = 'empty-state';
            empty.textContent = 'No sample records in this category.';
            container.appendChild(empty);
            return;
        }

        tips.forEach(function (tip) { container.appendChild(buildCard(tip)); });
    }

    document.addEventListener('DOMContentLoaded', render);
})();
