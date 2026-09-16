(function () {
    'use strict';

    // Product prototype data only. These records are deliberately read-only and
    // do not represent current fixtures, betting advice or verified outcomes.
    var SAMPLE_TIPS = [
        { id: 'sample-1', match: 'Rivers United vs Enyimba', prediction: 'Over 1.5 goals', odds: '1.65', league: 'Nigeria Professional Football League', writeup: 'Illustrative analysis showing how team form, availability and home advantage could be explained.', dateLabel: 'Sample fixture, not scheduled', isDemo: true },
        { id: 'sample-2', match: 'Arsenal vs Chelsea', prediction: 'Both teams to score', odds: '1.95', league: 'Premier League', writeup: 'Illustrative copy for testing the prediction-card layout. No underlying model has produced this selection.', dateLabel: 'Sample fixture, not scheduled', isDemo: true },
        { id: 'sample-3', match: 'Real Madrid vs Barcelona', prediction: 'Over 2.5 goals', odds: '2.40', league: 'La Liga', writeup: 'Illustrative analysis only. A production record would include source data, model version and publication time.', dateLabel: 'Sample fixture, not scheduled', isDemo: true },
        { id: 'sample-4', match: 'Tottenham vs Manchester United', prediction: 'Home win and both teams to score', odds: '4.50', league: 'Premier League', writeup: 'Sample high-variance market used to demonstrate filtering. It is not a recommendation.', dateLabel: 'Sample fixture, not scheduled', isDemo: true },
        { id: 'sample-5', match: 'AS Roma vs Lazio', prediction: 'Home win and over 1.5 goals', odds: '5.00', league: 'Serie A', writeup: 'Sample content used to test the interface and responsible-use messaging.', dateLabel: 'Sample fixture, not scheduled', isDemo: true },
        { id: 'sample-6', match: 'Benfica vs Porto', prediction: 'Home win and under 3.5 goals', odds: '5.80', league: 'Primeira Liga', writeup: 'Illustrative scenario only. Decimal odds are fictional interface values.', dateLabel: 'Sample fixture, not scheduled', isDemo: true },
        { id: 'sample-7', match: 'West Ham vs Liverpool', prediction: 'Home double chance and both teams to score', odds: '8.50', league: 'Premier League', writeup: 'Sample long-odds content. Higher displayed odds imply lower probability and greater uncertainty.', dateLabel: 'Sample fixture, not scheduled', isDemo: true },
        { id: 'sample-8', match: 'Lyon vs Paris Saint-Germain', prediction: 'Home win', odds: '10.00', league: 'Ligue 1', writeup: 'This is a design example, not a live event or model-generated forecast.', dateLabel: 'Sample fixture, not scheduled', isDemo: true },
        { id: 'sample-9', match: 'Sevilla vs Barcelona', prediction: 'Home win and under 3.5 goals', odds: '12.00', league: 'La Liga', writeup: 'Illustrative high-risk market for product testing. No outcome is guaranteed.', dateLabel: 'Sample fixture, not scheduled', isDemo: true },
        { id: 'sample-10', match: 'Kano Pillars vs Shooting Stars', prediction: 'Correct score 2-0', odds: '18.00', league: 'Nigeria Professional Football League', writeup: 'Sample extreme-odds market. This content must not be treated as a current fixture or advice.', dateLabel: 'Sample fixture, not scheduled', isDemo: true },
        { id: 'sample-11', match: 'Accra Lions vs Asante Kotoko', prediction: 'Home win 3-0', odds: '25.00', league: 'Ghana Premier League', writeup: 'Illustrative prototype record with fictional display odds.', dateLabel: 'Sample fixture, not scheduled', isDemo: true },
        { id: 'sample-12', match: 'Cork City vs Shamrock Rovers', prediction: 'Home win 2-0', odds: '50.00', league: 'League of Ireland', writeup: 'Sample extreme-odds content included solely to exercise this interface category.', dateLabel: 'Sample fixture, not scheduled', isDemo: true }
    ];

    Object.freeze(SAMPLE_TIPS);

    window.PredictionDB = Object.freeze({
        mode: 'demo-read-only',
        getTips: function () {
            return SAMPLE_TIPS.map(function (tip) {
                return Object.assign({}, tip);
            });
        }
    });
})();
