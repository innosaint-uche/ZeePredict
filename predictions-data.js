// Shared Client-Side Data Helper for Zeepredict
//
// PROTOTYPE STATE (CTO containment, 2026-09-16):
// The records below are FICTIONAL SAMPLE DATA for layout demonstration only.
// They are not real predictions and must not be presented as such.
// Cloud sync (Firestore) has been REMOVED — the previous implementation had no
// authentication, would corrupt data, and has been retired pending the Phase 1
// server-side rebuild. Do not reintroduce client-side cloud writes.

// Fixed sample date. This previously generated dates relative to the visitor's
// current day, which made fictional records appear current. Do NOT reintroduce
// dynamic dating until real fixture data exists.
var SAMPLE_DATE = '2026-01-15T12:00:00.000Z';

// Migrate old localStorage data to new format (runs once)
(function migrateOldData() {
    var oldData = localStorage.getItem('zeepredict_tips');
    if (oldData) {
        try {
            var oldTips = JSON.parse(oldData);
            if (Array.isArray(oldTips) && oldTips.length > 0) {
                var userTips = JSON.parse(localStorage.getItem('zeepredict_user_tips') || '[]');
                oldTips.forEach(function(tip) {
                    if (!tip.id) tip.id = 'user-' + Date.now() + Math.random().toString(36).substr(2, 5);
                    userTips.push(tip);
                });
                localStorage.setItem('zeepredict_user_tips', JSON.stringify(userTips));
            }
            // Remove old key after migration
            localStorage.removeItem('zeepredict_tips');
        } catch(e) { /* ignore parse errors */ }
    }
})();

var SEED_TIPS = [
    {
        id: "seed-1",
        match: "Liverpool vs Aston Villa",
        prediction: "Over 2.5 Goals",
        odds: "1.65",
        league: "Premier League",
        writeup: "SAMPLE DATA - fictional write-up for layout demonstration. Both teams boast incredible attacking output while showing vulnerability in transition.",
        date: SAMPLE_DATE
    },
    {
        id: "seed-2",
        match: "AC Milan vs Inter Milan",
        prediction: "Inter Milan Win",
        odds: "1.95",
        league: "Serie A",
        writeup: "SAMPLE DATA - fictional write-up for layout demonstration. Inter has dominated the recent Derby della Madonnina matchups.",
        date: SAMPLE_DATE
    },
    {
        id: "seed-3",
        match: "Bayern Munich vs Borussia Dortmund",
        prediction: "Bayern Win & BTTS",
        odds: "2.40",
        league: "Bundesliga",
        writeup: "SAMPLE DATA - fictional write-up for layout demonstration. Der Klassiker at the Allianz Arena historically promises goals.",
        date: SAMPLE_DATE
    },
    {
        id: "seed-4",
        match: "Real Madrid vs Barcelona",
        prediction: "Real Madrid Win",
        odds: "2.10",
        league: "La Liga",
        writeup: "SAMPLE DATA - fictional write-up for layout demonstration. Real Madrid's form at the Bernabéu has been spectacular.",
        date: SAMPLE_DATE
    },
    {
        id: "seed-5",
        match: "Manchester City vs Paris Saint-Germain",
        prediction: "Man City Win",
        odds: "1.80",
        league: "Champions League",
        writeup: "SAMPLE DATA - fictional write-up for layout demonstration. City has been formidable at home in Europe.",
        date: SAMPLE_DATE
    },
    {
        id: "seed-6",
        match: "Arsenal vs Chelsea",
        prediction: "Draw",
        odds: "3.40",
        league: "Premier League",
        writeup: "SAMPLE DATA - fictional write-up for layout demonstration. London derbies are notoriously tight.",
        date: SAMPLE_DATE
    },
    {
        id: "seed-7",
        match: "Juventus vs Napoli",
        prediction: "Under 1.5 Goals",
        odds: "2.85",
        league: "Serie A",
        writeup: "SAMPLE DATA - fictional write-up for layout demonstration. Both teams have played extremely defensive football in recent matches.",
        date: SAMPLE_DATE
    },
    // ===== 5 ODDS (4.0 - 6.5) =====
    {
        id: "seed-8",
        match: "Tottenham vs Manchester United",
        prediction: "Both Teams to Score & Over 2.5",
        odds: "4.50",
        league: "Premier League",
        writeup: "SAMPLE DATA - fictional write-up for layout demonstration. Tottenham's high-press game against United's vulnerable backline.",
        date: SAMPLE_DATE
    },
    {
        id: "seed-9",
        match: "AS Roma vs Lazio",
        prediction: "Roma Win & Over 1.5 Goals",
        odds: "5.00",
        league: "Serie A",
        writeup: "SAMPLE DATA - fictional write-up for layout demonstration. The Derby della Capitale at the Stadio Olimpico is always fiercely contested.",
        date: SAMPLE_DATE
    },
    {
        id: "seed-10",
        match: "Benfica vs Porto",
        prediction: "Draw No Bet - Benfica",
        odds: "5.80",
        league: "Primeira Liga",
        writeup: "SAMPLE DATA - fictional write-up for layout demonstration. O Clássico in Portugal is often decided by fine margins.",
        date: SAMPLE_DATE
    },
    // ===== 10 ODDS (6.5 - 15.0) =====
    {
        id: "seed-11",
        match: "West Ham vs Liverpool",
        prediction: "West Ham Double Chance & BTTS",
        odds: "8.50",
        league: "Premier League",
        writeup: "SAMPLE DATA - fictional write-up for layout demonstration. West Ham at the London Stadium have proven to be giant killers.",
        date: SAMPLE_DATE
    },
    {
        id: "seed-12",
        match: "Lyon vs Paris Saint-Germain",
        prediction: "Lyon to Win",
        odds: "10.00",
        league: "Ligue 1",
        writeup: "SAMPLE DATA - fictional write-up for layout demonstration. PSG's away record against top Ligue 1 sides has been unconvincing.",
        date: SAMPLE_DATE
    },
    {
        id: "seed-13",
        match: "Sevilla vs Barcelona",
        prediction: "Sevilla Win & Under 3.5 Goals",
        odds: "12.00",
        league: "La Liga",
        writeup: "SAMPLE DATA - fictional write-up for layout demonstration. The Ramón Sánchez Pizjuán is one of the toughest grounds in Spain.",
        date: SAMPLE_DATE
    },
    {
        id: "seed-14",
        match: "Ajax vs Feyenoord",
        prediction: "Correct Score 2-1",
        odds: "14.00",
        league: "Eredivisie",
        writeup: "SAMPLE DATA - fictional write-up for layout demonstration. De Klassieker always delivers drama.",
        date: SAMPLE_DATE
    },
    // ===== 50+ ODDS (15.0+) =====
    {
        id: "seed-15",
        match: "Sheriff Tiraspol vs Real Madrid",
        prediction: "Sheriff Tiraspol to Win",
        odds: "18.00",
        league: "Champions League",
        writeup: "SAMPLE DATA - fictional write-up for layout demonstration. Champions League nights can produce miracles.",
        date: SAMPLE_DATE
    },
    {
        id: "seed-16",
        match: "Accra Lions vs Asante Kotoko",
        prediction: "Accra Lions to Win 3-0",
        odds: "25.00",
        league: "Ghana Premier League",
        writeup: "SAMPLE DATA - fictional write-up for layout demonstration. Accra Lions have been unbeaten at home for months.",
        date: SAMPLE_DATE
    },
    {
        id: "seed-17",
        match: "St. Pauli vs Bayern Munich",
        prediction: "St. Pauli Double Chance & BTTS",
        odds: "35.00",
        league: "Bundesliga",
        writeup: "SAMPLE DATA - fictional write-up for layout demonstration. The Millerntor Stadium is a fortress.",
        date: SAMPLE_DATE
    },
    {
        id: "seed-18",
        match: "Cork City vs Shamrock Rovers",
        prediction: "Cork City to Win 2-0",
        odds: "50.00",
        league: "League of Ireland",
        writeup: "SAMPLE DATA - fictional write-up for layout demonstration. Cork City's recent form at Turner's Cross has been incredible.",
        date: SAMPLE_DATE
    }
];

// Load overrides and user tips from localStorage (browser-local only; there is
// intentionally no cloud sync in this prototype build)
function getSeedOverrides() {
    return JSON.parse(localStorage.getItem('zeepredict_seed_overrides') || '{}');
}

function saveSeedOverrides(overrides) {
    localStorage.setItem('zeepredict_seed_overrides', JSON.stringify(overrides));
}

function getDeletedSeeds() {
    return JSON.parse(localStorage.getItem('zeepredict_deleted_seeds') || '[]');
}

function saveDeletedSeeds(deleted) {
    localStorage.setItem('zeepredict_deleted_seeds', JSON.stringify(deleted));
}

function getUserTips() {
    return JSON.parse(localStorage.getItem('zeepredict_user_tips') || '[]');
}

function saveUserTips(tips) {
    localStorage.setItem('zeepredict_user_tips', JSON.stringify(tips));
}

// Expose public API functions
window.PredictionDB = {
    // Retrieves merged list of tips, sorted by date (newest first)
    getTips: function() {
        const userTips = getUserTips();
        const seedOverrides = getSeedOverrides();
        const deletedSeeds = getDeletedSeeds();

        // Process seed tips: apply overrides, filter out deleted ones
        const processedSeeds = SEED_TIPS
            .filter(seed => !deletedSeeds.includes(seed.id))
            .map(seed => {
                const override = seedOverrides[seed.id] || {};
                return { ...seed, ...override };
            });

        // Merge and sort by date descending
        return [...userTips, ...processedSeeds].sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    // Add a new tip (browser-local only)
    addTip: function(tipData) {
        var userTips = getUserTips();
        var newTip = {
            id: 'user-' + Date.now(),
            match: tipData.match,
            prediction: tipData.prediction,
            odds: tipData.odds || '1.00',
            league: tipData.league || 'Other',
            writeup: tipData.writeup || '',
            matchDate: tipData.matchDate || null,
            date: new Date().toISOString(),
            status: tipData.status || 'Pending'
        };
        userTips.unshift(newTip);
        saveUserTips(userTips);
        return newTip;
    },

    // Delete a tip (browser-local only)
    deleteTip: function(id) {
        if (id.startsWith('seed-')) {
            // Add to deleted seeds list
            const deleted = getDeletedSeeds();
            if (!deleted.includes(id)) {
                deleted.push(id);
                saveDeletedSeeds(deleted);
            }
        } else {
            // Delete from user tips
            let userTips = getUserTips();
            userTips = userTips.filter(t => t.id !== id);
            saveUserTips(userTips);
        }
    },

    // Update status (Won, Lost, Pending) - retained for API compatibility,
    // but no public page displays statuses in this prototype build
    updateTipStatus: function(id, status) {
        if (id.startsWith('seed-')) {
            const overrides = getSeedOverrides();
            if (!overrides[id]) overrides[id] = {};
            overrides[id].status = status;
            saveSeedOverrides(overrides);
        } else {
            const userTips = getUserTips();
            const tip = userTips.find(t => t.id === id);
            if (tip) {
                tip.status = status;
                saveUserTips(userTips);
            }
        }
    }
};
