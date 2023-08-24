var emailListsSpecialClassesData = [{  
    name: 'Larry Wadford',
    email: 'larry_wadford@yahoo.com',
    phone: '', 
    dateJoined: new Date(),

},];

var emailListsPromotionsData = [{
    name: 'Larry Wadford',
    email: 'larry_wadford@yahoo.com',
    phone: '', 
    dateJoined: new Date(),

},];

var emailListsTournamentsData = [{
    name: 'Larry Wadford',
    email: 'larry_wadford@yahoo.com',
    phone: '', 
    dateJoined: new Date(),

},];

var emailListsBlackBeltClassesData =  [{
    name: 'Larry Wadford',
    email: 'larry_wadford@yahoo.com',
    phone: '', 
    dateJoined: new Date(),

},],

db = db.getSiblingDB('wadokikai');

// TODO - REMOVE or COMMENT OUT ---  This is for testing need to remove 
// remove the db documents  
db.emailListsSpecialClasses.remove({});
db.emailListsPromotions.remove({});
db.emailListsTournaments.remove({});
db.emailListsBlackBeltClasses.remove({});

// Insert Test documents 
db.emailListsSpecialClasses.insert(emailListsSpecialClassesData);
db.emailListsPromotions.insert(emailListsPromotionsData);
db.emailListsTournaments.insert(emailListsTournamentsData);
db.emailListsBlackBeltClasses.insert(emailListsBlackBeltClassesData);

