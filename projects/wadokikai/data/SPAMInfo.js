spamfrom = {
    CrytoDralf: 1,
    Crytovog: 1, 
    Okeygorandom: 1, 
    Catherinader: 1, 
    ericjonesmyemail: 1,
    highpeakcannabisco: 1, 
    Arthurmon: 1, 
    gurneyheights: 1, 
    stremmel: 1, 
    'jessica@businesscoachvas.com': 1,
    'angelaballj774@yahoo.com': 1,
    'janitorialservices661@gmail.com': 1,

};

spambody = {
    boostleadgeneration: 1, 
    Okeygorandom: 1, 
    Ovafe: 1,
    rbertilsson: 1,
    veill: 1, 
    medicopostura: 1, 
    dogcare: 1, 
    myshorts: 1,
    kingrevesdidua: 1,
    bangeonline: 1,
    http: 1, 
    https: 1, 

};


db = db.getSiblingDB('wadokikai');

db.spamfrom.remove({});
db.spamfrom.insert(spamfrom);

db.spambody.remove({});
db.spambody.insert(spambody);