var selfdefenseEvent = [{
    eventID: 'sdsf1',
    eventOwner: 'sensie.bob@wadokikai.org',
    eventName: 'Self-defense seminar - Hayes Valley',
    eventlocation: 'San Francisco',
    name: 'Larry Wadford',
    email: 'sensei.larry@wadokikai.org',
    phone: '510 289 5454', 
    registrationmsg: 'I will be there to help teach', 
    date: new Date('July 17, 2022'), 
    time: '10:00 - 12:00',
    registrationDT: new Date(),
}];



db = db.getSiblingDB('wadokikai');
// db.eventregistration.remove({});
db.eventregistration.insert(selfdefenseEvent);
