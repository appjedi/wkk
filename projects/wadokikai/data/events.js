const pagedata = {
    events: {
        main: {
            title: 'Current Events',
            para: 'This page provides a current list of events that members of Wado Ki Kai are currently involved with, attending, and/or participating.',
        },
    } // events
};

const specialclasses = {

    specialclasseslistlink: '/joinemail?type=specialclasses',
    specialclasseslisttext: 'Join Special Classes email list',
    specialclasses: [
        {
            title: 'Self-defense seminar - Hayes Valley',
            eventId: 'sdsf1',
            type: '',
            location: '432 Octavia Street, San Francisco, CA 94102',
            time: '10:00am to 12:00pm',
            date: new Date('July 17, 2022'),
            note: 'Cost? Free -- Donations welcome.<br/>Wado Ki Kai is a 501(c)3 non-profit.<br/>Founded 1976 - San Francisco.<br/>Your gift is tax-deductible',
            registerLink: '/registration?id=sdsf1',
            registerText: 'Register Here', 
            owner: 'sensei.bob@wadokikai.org',
        },
        {
            title: 'Self-defense seminar - Woodstock Park - Alameda, CA',
            eventId: 'sda1',
            type: '',
            location: 'Alameda, CA 94501',
            time: '10:00am to 12:00pm',
            date: new Date('July 17, 2021'),
            note: 'Cost? Free - Donations welcome.<br/>Donation will be made to a gofundme for MSAC.',
            registerLink: '/registration?id=sda1',
            registerText: 'Register Here', 
            owner: 'sensei.larry@wadokikai.org',
        },
        
    ], // specialclasses

}


const promotions = {
    promotionemaillistlink: '/joinemail?type=promotions',
    promotionemaillisttext: 'Join Promotions email list',
    promotions: [
        {
            title: 'Wado Ki Kai Promotional - Alameda/Orinda Karate-do',
            type: 'Fall 2022',
            location: 'Alameda, CA 94501',
            time: '12:00pm to 2:00pm',
            note: 'Weather permitting, we will have a small celebration at the Almanac Beer Co. at 3:00pm',
            dt: new Date('November 19, 2022'),
        },
        {
            title: 'Corpuz Karate Do',
            type: 'Summer',
            location: 'Alameda, CA 94502',
            time: '4:00pm to 4:45pm',
            note: '',
            dt: new Date('July 28, 2022'),
        
        },
        {
            title: 'Wado Ki Kai Promotional - Alameda/Orinda Karate-do',
            type: 'Sprint 2022',
            location: 'Alameda, CA 94501',
            dt: new Date('May 21, 2022'),
        },
        {
            title: 'Wado Ki Kai Promotional - Earhart Karate-do',
            type: 'Summer 2022',
            location: 'Alameda, CA 94501',
            dt: new Date('July 9, 2022'),
        },
        {
            title: 'Corpuz Karate Do',
            type: 'Summer',
            location: 'Alameda, CA 94502',
            dt: new Date('July 7, 2022'),
        
        },
        {
            title: 'Wado Ki Kai Promotional',
            type: 'Fall 2022',
            location: 'Alameda, CA 94501',
            dt: new Date('November 19, 2021'),
        },
    ], // promotions
}

const tournaments = {

    tournamentsemaillistlink: '/joinemail?type=tournaments',
    tournamentsemaillisttext: 'Join Tournaments email list',
    tournaments: [
    {
        title: 'NKD Summer Fling',
        type: 'All',
        location: 'Antiock, CA',
        flyer: '/images/tournaments/NKDTournament.pdf',
        note: 'Division Listings',
        notelink: '/images/tournaments/2022LEAGUEDivisions.pdf',
        dt: new Date('August 20, 2022'),
        
    },
    ], // tournaments
}

const blackbeltclasses = {
    blackbeltclassesemaillistlink: '/joinemail?type=blackbeltclasses',
    blackbeltclassesemaillisttext: 'Join Black Belt email list',
    blackbeltclasses: [
        {
            title: 'Black Belt Class',
            type: 'all',
            location: 'Alameda, CA 94501',
            dt: new Date('August 6, 2022'),
            
        },
        {
            title: 'Black Belt Class',
            type: 'all',
            location: 'Alameda, CA 94501',
            dt: new Date('July 9, 2022'),
            
        },
        {
            title: 'Black Belt Class',
            type: 'all',
            location: 'Alameda, CA 94501',
            dt: new Date('September 10, 2022'),
            
        },
        {
            title: 'Black Belt Class',
            type: 'all',
            location: 'Alameda, CA 94501',
            dt: new Date('October 1, 2022'),
            
        },
        {
            title: 'Black Belt Class',
            type: 'all',
            location: 'Alameda, CA 94501',
            dt: new Date('November 5, 2022'),
            
        },
        {
            title: 'Black Belt Class',
            type: 'all',
            location: 'Alameda, CA 94501',
            dt: new Date('December 3, 2022'),
            
        },
    ], // tournaments
}
db = db.getSiblingDB('wadokikai');
db.wadokikaidata.remove({events: {$exists: true}});
db.wadokikaidata.insert(pagedata);

db.eventSpecialClasses.remove({});
db.eventPromotions.remove({});
db.eventTournaments.remove({});
db.eventBlackBeltClasses.remove({});

db.eventSpecialClasses.insert(specialclasses);
db.eventPromotions.insert(promotions);
db.eventTournaments.insert(tournaments);
db.eventBlackBeltClasses.insert(blackbeltclasses);
