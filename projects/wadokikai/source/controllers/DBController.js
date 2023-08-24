const { MongoClient, ObjectID } = require('mongodb');

const debug = require('debug')('app:DBController');

class DBController {

  constructor() {
    debug('constructing DBController');
    this.dbURL = 'mongodb://wadokikaiRW:Karate$@localhost:27017/wadokikai';
    //this.dbURL = 'mongodb://wadokikai:Karate!@localhost:27017/wadokikai';
    this.dbName = 'wadokikai';
    this.dbconfig = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // collection names
    this.spamFromCol = 'spamfrom';
    this.spamBodyCol = 'spambody';
    this.navCol = 'nav';
    this.navMainCol = 'navNuMain';
    this.navHomeCol = 'navNuHome';
    this.navStudentsCol = 'navNuStudents';
    this.navInstructorsCol = 'navNuInstructors';
    this.navEventsCol = 'navNuEvents';
    this.libaryCol = 'library';
    this.zoomInfoCol = 'zoomInfo';
    this.wadokikaiDataCol = 'wadokikaidata';
    this.authCol = 'authorization';
    this.termsCol = 'wkkTerminology';
    this.studentsCol = 'students';
    this.sendmailCol = 'sendemails';
    this.elistSpecialClassesCol = 'emailListsSpecialClasses';
    this.elistPromotionsCol = 'emailListsPromotions';
    this.elistTournamentsCol = 'emailListsTournaments';
    this.elistBlackBeltClassesCol = 'emailListsBlackBeltClasses';
    this.eventRegistrationCol = 'eventregistration';
    this.eventSpecialClassesCol = 'eventSpecialClasses';
    this.eventPromotionsCol = 'eventPromotions';
    this.eventTournamentsCol = 'eventTournaments';
    this.eventBlackBeltClassesCol = 'eventBlackBeltClasses';

  }

  // this will return the nav items - Old should not be called
  async getNav() {
    debug('getNav called');
    let client;
    let results;
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getNav');
      const db = client.db(this.dbName);
      const col = await db.collection(this.navCol);
      results = await col.find().toArray();
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results;
  }

  // this will return the navMain items
  async getNavMain() {
    debug('getNavMain called');
    let client;
    let results;
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getNavMain');
      const db = client.db(this.dbName);
      const col = await db.collection(this.navMainCol);
      results = await col.find().toArray();
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results;
  }

  // this will return the navHome items
  async getNavHome() {
    debug('getNavHome called');
    let client;
    let results;
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getNav');
      const db = client.db(this.dbName);
      const col = await db.collection(this.navHomeCol);
      results = await col.find().toArray();
      // default is invalid do nothing
      debug('getNavHome called and got: ');
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results;
  }
  
  // this will return the navStudents items
  async getNavStudents() {
    debug('getNavStudents called');
    let client;
    let results;
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getNavStudents');
      const db = client.db(this.dbName);
      const col = await db.collection(this.navStudentsCol);
      results = await col.find().toArray();
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results;
  }

  // this will return the navInstructors items
  async getNavInstructors() {
    debug('getNavInstructors called');
    let client;
    let results;
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getNavInstructors');
      const db = client.db(this.dbName);
      const col = await db.collection(this.navInstructorsCol);
      results = await col.find().toArray();
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results;
  }

  // this will return the navEvents items
  async getNavEvents() {
    debug('getNavEvents called');
    let client;
    let results;
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getNavEvents');
      const db = client.db(this.dbName);
      const col = await db.collection(this.navEventsCol);
      results = await col.find().toArray();
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results;
  }

  async getZoomInfo() {
    debug('getZoomInfo called');
    let client;
    let results;
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getZoomInfo');
      const db = client.db(this.dbName);
      const col = await db.collection(this.zoomInfoCol);
      results = await col.find().toArray();
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results;
  }

  async getWadoKiKaiData() {
    debug('getWadoKiKaiData called');
    let client;
    let results;
    let dataName = { wadokikaihomepage: {$exists: true} };
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getWadoKiKaiData');
      const db = client.db(this.dbName);
      const col = await db.collection(this.wadokikaiDataCol);
      results = await col.findOne(dataName);
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results.wadokikaihomepage;
  }

  async getInstructorsData() {
    debug('getInstructorsData called');
    let client;
    let results;
    let dataName = { instructors: {$exists: true} };
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getWadoKiKaiData  for instructors');
      const db = client.db(this.dbName);
      const col = await db.collection(this.wadokikaiDataCol);
      results = await col.findOne(dataName);
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results.instructors;
  }

  async getSchoolsData() {
    debug('getSchoolsData called');
    let client;
    let results;
    let dataName = { schools: {$exists: true} };
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getWadoKiKaiData for schools');
      const db = client.db(this.dbName);
      const col = await db.collection(this.wadokikaiDataCol);
      results = await col.findOne(dataName);
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results.schools;
  }

  async getLibraryData() {
    debug('getLibraryData called');
    let client;
    let results;
    let dataName = { library: {$exists: true} };
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getLibraryData');
      const db = client.db(this.dbName);
      const col = await db.collection(this.libaryCol);
      results = await col.findOne(dataName);
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results.library;
  }

  async getOverviewData() {
    debug('getOverviewData called');
    let client;
    let results;
    let dataName = { karateOverview: {$exists: true} };
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getOverviewData');
      const db = client.db(this.dbName);
      const col = await db.collection(this.wadokikaiDataCol);
      results = await col.findOne(dataName);
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results.karateOverview;
  }

  async getDojoProceduresData() {
    debug('getDojoProceduresData called');
    let client;
    let results;
    let dataName = { dojoProcedures: {$exists: true} };
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getDojoProceduresData');
      const db = client.db(this.dbName);
      const col = await db.collection(this.wadokikaiDataCol);
      results = await col.findOne(dataName);
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results.dojoProcedures;
  }

  async getWadoKiKaiStyleData() {
    debug('getWadoKiKaiStyleData called');
    let client;
    let results;
    let dataName = { wadokikaiStyle: {$exists: true} };
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getWadoKiKaiStyleData  for styles');
      const db = client.db(this.dbName);
      const col = await db.collection(this.wadokikaiDataCol);
      results = await col.findOne(dataName);
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results.wadokikaiStyle;
  }

  async getStudentPageData() {
    debug('getStudentPageData called');
    let client;
    let results;
    let dataName = { studentPageData: {$exists: true} };
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getStudentPageData');
      const db = client.db(this.dbName);
      const col = await db.collection(this.wadokikaiDataCol);
      results = await col.findOne(dataName);
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results.studentPageData;
  }

  async getEventPageData() {
    debug('getEventPageData called');
    let client;
    let results;
    let dataName = { events: {$exists: true} };

    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getEventPageData');
      const db = client.db(this.dbName);
      const col = await db.collection(this.wadokikaiDataCol);
      results = await col.findOne(dataName);
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results.events;
  }

  async getEventPromotions() {
    debug('getEventPromotions called');
    let client;
    let results;
    let dataName = { };
    let options = {
      sort: {date:1}
    }
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getEventPromotions');
      const db = client.db(this.dbName);
      const col = await db.collection(this.eventPromotionsCol);
      results = await col.findOne(dataName, options);
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results;
  }

  async getEventSpecialClasses() {
    debug('getEventSpecialClasses called');
    let client;
    let results;
    let dataName = { };
    let options = {
      sort: {date:1}
    }
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getEventSpecialClasses');
      const db = client.db(this.dbName);
      const col = await db.collection(this.eventSpecialClassesCol);
      results = await col.findOne(dataName, options);
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results;
  }

  async getEventTournaments() {
    debug('getEventTournaments called');
    let client;
    let results;
    let dataName = { };
    let options = {
      sort: {date:1}
    }
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getEventTournaments');
      const db = client.db(this.dbName);
      const col = await db.collection(this.eventTournamentsCol);
      results = await col.findOne(dataName, options);
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results;
  }

  async getEventBlackBeltClasses() {
    debug('getEventBlackBeltClasses called');
    let client;
    let results;
    let dataName = { };
    let options = {
      sort: {date:1}
    }
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getEventBlackBeltClasses');
      const db = client.db(this.dbName);
      const col = await db.collection(this.eventBlackBeltClassesCol);
      results = await col.findOne(dataName, options);
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results;
  }

  async getBBEventPageData() {
    debug('getBBEventPageData called');
    let client;
    let results;
    let dataName = { };
    let options = {
      sort: {eventID:1}
    }
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getBBEventPageData');
      const db = client.db(this.dbName);
      const col = await db.collection(this.eventRegistrationCol);

      results = await col.find(dataName, options).toArray();
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    debug(results);
    return results;
  }

  async getEventSpecialClassDetails(eventID) {
    debug('getEventSpecialClassDetails called');
    let client;
    let results;
    let specailclass = {};
    let dataName = { };
    let options = {
      sort: {date:1}
    }
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getEventSpecialClassDetails');
      const db = client.db(this.dbName);
      const col = await db.collection(this.eventSpecialClassesCol);
      results = await col.findOne(dataName, options);
      // default is invalid do nothing
      // get the one we are after
      for (let i = 0; i < results.specialclasses.length; i++) {
        if (results.specialclasses[i].eventId == eventID) {
          specailclass = results.specialclasses[i];
        }
      }

      client.close();
    } catch (err) {
      debug(err.stack);
    }

    return specailclass;
  }

  async getWadoKiKaiData() {
    debug('getWadoKiKaiData called');
    let client;
    let results;
    let dataName = { wadokikaihomepage: {$exists: true} };
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getWadoKiKaiData for home page data');
      const db = client.db(this.dbName);
      const col = await db.collection(this.wadokikaiDataCol);
      results = await col.findOne(dataName);
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    // debug(results.wadokikaihomepage);
    return results.wadokikaihomepage;
  }

  async getVideosData() {
    debug('getVideosData called');
    let client;
    let results;
    let dataName = { videos: {$exists: true} };
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getVideosData');
      const db = client.db(this.dbName);
      const col = await db.collection(this.wadokikaiDataCol);
      results = await col.findOne(dataName);
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results.videos;
  }
  
  async getKatasData() {
    debug('getKatasData called');
    let client;
    let results;
    let dataName = { katas: {$exists: true} };
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getKatasData');
      const db = client.db(this.dbName);
      const col = await db.collection(this.wadokikaiDataCol);
      results = await col.findOne(dataName);
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results.katas;
  }
  
  async getShinkoKatasData() {
    debug('getKatasData called');
    let client;
    let results;
    let dataName = { shinkoKatas: {$exists: true} };
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getKatasData');
      const db = client.db(this.dbName);
      const col = await db.collection(this.wadokikaiDataCol);
      results = await col.findOne(dataName);
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results.shinkoKatas;
  }

  async getSignUpData() {
    debug('getSignUpData called');
    let client;
    let results;
    let dataName = { signUp: {$exists: true} };
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getKatasData');
      const db = client.db(this.dbName);
      const col = await db.collection(this.wadokikaiDataCol);
      results = await col.findOne(dataName);
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results.signUp;
  }

  async getTermsData(typeToFind) {
    debug('getTermsData called now');
    let client;
    let results;
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb');
      const db = client.db(this.dbName);

      const col = await db.collection(this.termsCol);
      const findObject = { type: { $eq: typeToFind}};
      results = await col.find(findObject).toArray();
      //debug(`terms List from db: ${JSON.stringify(results)}`);
      if (!results) {
        debug('No list of terms returned by DB setting to empty array.');
        results = {};
      }
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results;
  }


  async setSendEmail(data) {
    debug(`setSendEmail called with data: ${JSON.stringify(data)}`);
    let client;
    let newInfo = new Object();
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for setSendEmail');
      const db = client.db(this.dbName); // set the working db in mongo
      const col = await db.collection(this.sendmailCol); // set the collection in mongo
      // eslint-disable-next-line no-underscore-dangle
      const results = await col.insertOne(data);
      // eslint-disable-next-line no-underscore-dangle
      if (results) {
        debug(`new list entry created, results: ${results}`);
        // eslint-disable-next-line prefer-destructuring
        newInfo = results.ops[0];
      } else {
        debug(`results: ${results}`);
        newInfo = {};
      }

      client.close();
    } catch (err) {
      debug(err.stack);
    }
    debug(`sending back newInfo: ${JSON.stringify(newInfo)}`);
    return newInfo;
  }

  async getSpecialClasses() {
    let client;
    let results;
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getSpecialClasses');
      const db = client.db(this.dbName); // set the working db in mongo
      const col = await db.collection(this.elistSpecialClassesCol); // set the collection in mongo

      // Check to see if this email is already in the db for this list.
      results = await col.find().toArray();
      debug(`find info data: ${JSON.stringify(results)}`);
    
      client.close();
    } catch (err) {
      debug(err.stack);
    }

    return results;
  }

  async setSpecialClasses(data) {
    debug(`setSpecialClasses called with data: ${JSON.stringify(data)}`);
    let client;
    let newInfo = new Object();
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for setSpecialClasses');
      const db = client.db(this.dbName); // set the working db in mongo
      const col = await db.collection(this.elistSpecialClassesCol); // set the collection in mongo


      // Check to see if this email is already in the db for this list.
      const query = { email: data.email };
      const dbnameInfo = await col.find(query).toArray();
      debug(`find info data: ${JSON.stringify(dbnameInfo)}`);
          // eslint-disable-next-line no-underscore-dangle
      if (dbnameInfo && dbnameInfo.length > 0 ) {
        // name found cant be saved
        debug('found email error case');
        newInfo.error = 'e-mail address already in Special Classes e-mail list.';
      } else {
        debug('did not find email in list adding ');
     
        const results = await col.insertOne(data);
        // eslint-disable-next-line no-underscore-dangle
        if (results) {
          debug(`new list entry created, results: ${results}`);
          // eslint-disable-next-line prefer-destructuring
          newInfo = results.ops[0];
        } else {
          debug(`results: ${results}`);
          newInfo = {};
        }
      }
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    debug(`sending back newInfo: ${JSON.stringify(newInfo)}`);
    return newInfo;
  }

  async getPromotions() {
    let client;
    let results;
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getPromotions');
      const db = client.db(this.dbName); // set the working db in mongo
      const col = await db.collection(this.elistPromotionsCol); // set the collection in mongo

      // Check to see if this email is already in the db for this list.
      results = await col.find().toArray();
      debug(`find info data: ${JSON.stringify(results)}`);
    
      client.close();
    } catch (err) {
      debug(err.stack);
    }

    return results;
  }

  async setPromotions(data) {
    debug(`setPromotions called with data: ${JSON.stringify(data)}`);
    let client;
    let newInfo = new Object();
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for setPromotions');
      const db = client.db(this.dbName); // set the working db in mongo
      const col = await db.collection(this.elistPromotionsCol); // set the collection in mongo


      // Check to see if this email is already in the db for this list.
      const query = { email: data.email };
      const dbnameInfo = await col.find(query).toArray();
      debug(`find info data: ${JSON.stringify(dbnameInfo)}`);
          // eslint-disable-next-line no-underscore-dangle
      if (dbnameInfo && dbnameInfo.length > 0 ) {
        // name found cant be saved
        debug('found email error case');
        newInfo.error = 'e-mail address already in Promotions e-mail list.';
      } else {
        debug('did not find email in list adding ');
     
        const results = await col.insertOne(data);
        // eslint-disable-next-line no-underscore-dangle
        if (results) {
          debug(`new list entry created, results: ${results}`);
          // eslint-disable-next-line prefer-destructuring
          newInfo = results.ops[0];
        } else {
          debug(`results: ${results}`);
          newInfo = {};
        }
      }
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    debug(`sending back newInfo: ${JSON.stringify(newInfo)}`);
    return newInfo;
  }

  async getTournaments() {
    let client;
    let results;
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getTournaments');
      const db = client.db(this.dbName); // set the working db in mongo
      const col = await db.collection(this.elistTournamentsCol); // set the collection in mongo

      // Check to see if this email is already in the db for this list.
      results = await col.find().toArray();
      debug(`find info data: ${JSON.stringify(results)}`);
    
      client.close();
    } catch (err) {
      debug(err.stack);
    }

    return results;
  }

  async setTournaments(data) {
    debug(`setTournaments called with data: ${JSON.stringify(data)}`);
    let client;
    let newInfo = new Object();
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for setTournaments');
      const db = client.db(this.dbName); // set the working db in mongo
      const col = await db.collection(this.elistTournamentsCol); // set the collection in mongo


      // Check to see if this email is already in the db for this list.
      const query = { email: data.email };
      const dbnameInfo = await col.find(query).toArray();
      debug(`find info data: ${JSON.stringify(dbnameInfo)}`);
          // eslint-disable-next-line no-underscore-dangle
      if (dbnameInfo && dbnameInfo.length > 0 ) {
        // name found cant be saved
        debug('found email error case');
        newInfo.error = 'e-mail address already in Tournaments e-mail list.';
      } else {
        debug('did not find email in list adding ');
     
        const results = await col.insertOne(data);
        // eslint-disable-next-line no-underscore-dangle
        if (results) {
          debug(`new list entry created, results: ${results}`);
          // eslint-disable-next-line prefer-destructuring
          newInfo = results.ops[0];
        } else {
          debug(`results: ${results}`);
          newInfo = {};
        }
      }
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    debug(`sending back newInfo: ${JSON.stringify(newInfo)}`);
    return newInfo;
  }

  async getBlackBeltClasses() {
    let client;
    let results;
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getBlackBeltClasses');
      const db = client.db(this.dbName); // set the working db in mongo
      const col = await db.collection(this.elistBlackBeltClassesCol); // set the collection in mongo

      // Check to see if this email is already in the db for this list.
      results = await col.find().toArray();
      debug(`find info data: ${JSON.stringify(results)}`);
    
      client.close();
    } catch (err) {
      debug(err.stack);
    }

    return results;
  }

  async setBlackBeltClasses(data) {
    debug(`setBlackBeltClasses called with data: ${JSON.stringify(data)}`);
    let client;
    let newInfo = new Object();
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for setBlackBeltClasses');
      const db = client.db(this.dbName); // set the working db in mongo
      const col = await db.collection(this.elistBlackBeltClassesCol); // set the collection in mongo


      // Check to see if this email is already in the db for this list.
      const query = { email: data.email };
      const dbnameInfo = await col.find(query).toArray();
      debug(`find info data: ${JSON.stringify(dbnameInfo)}`);
          // eslint-disable-next-line no-underscore-dangle
      if (dbnameInfo && dbnameInfo.length > 0 ) {
        // name found cant be saved
        debug('found email error case');
        newInfo.error = 'e-mail address already in Black Belt Classes e-mail list.';
      } else {
        debug('did not find email in list adding ');
     
        const results = await col.insertOne(data);
        // eslint-disable-next-line no-underscore-dangle
        if (results) {
          debug(`new list entry created, results: ${results}`);
          // eslint-disable-next-line prefer-destructuring
          newInfo = results.ops[0];
        } else {
          debug(`results: ${results}`);
          newInfo = {};
        }
      }
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    debug(`sending back newInfo: ${JSON.stringify(newInfo)}`);
    return newInfo;
  }

  async setEventRegistration(data) {
    debug(`setEventRegistration called with data: ${JSON.stringify(data)}`);
    let client;
    let newInfo = new Object();
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for setEventRegistration');
      const db = client.db(this.dbName); // set the working db in mongo
      const col = await db.collection(this.eventRegistrationCol); // set the collection in mongo


      // Check to see if this email is already in the db for this list.
      const query = { email: data.email };
      const dbnameInfo = await col.find(query).toArray();
      debug(`find info data: ${JSON.stringify(dbnameInfo)}`);
          // eslint-disable-next-line no-underscore-dangle
      if (dbnameInfo && dbnameInfo.length > 0 ) {
        // name found cant be saved
        debug('found email error case');
        newInfo.error = 'e-mail address already signed up for class.';
      } else {
        debug('did not find email in list adding ');
     
        const results = await col.insertOne(data);
        // eslint-disable-next-line no-underscore-dangle
        if (results) {
          debug(`new list entry created, results: ${results}`);
          // eslint-disable-next-line prefer-destructuring
          newInfo = results.ops[0];
        } else {
          debug(`results: ${results}`);
          newInfo = {};
        }
      }
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    debug(`sending back newInfo: ${JSON.stringify(newInfo)}`);
    return newInfo;
  }


  // *******************************   SPAM FILTER  **********************************************

  // this will return the SPAM FROM list
  async getSPAMFrom() {
    debug('getNav called');
    let client;
    let results;
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getNav');
      const db = client.db(this.dbName);
      const col = await db.collection(this.spamFromCol);
      results = await col.find().toArray();
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results;
  }

  // this will return the SPAM FROM list
  async getSPAMBody() {
    debug('getNav called');
    let client;
    let results;
    try {
      client = await MongoClient.connect(this.dbURL, this.dbconfig);
      debug('connected to mongodb for getNav');
      const db = client.db(this.dbName);
      const col = await db.collection(this.spamBodyCol);
      results = await col.find().toArray();
      // default is invalid do nothing
      client.close();
    } catch (err) {
      debug(err.stack);
    }
    return results;
  }
  

} // class

module.exports = DBController;
