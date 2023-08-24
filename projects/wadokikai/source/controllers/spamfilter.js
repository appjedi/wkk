const debug = require('debug')('app:spamfilter');

class spamfilter {

    constructor() {
      debug('constructing spamfilter');
     
      const DBController = require('./DBController');
      const dbctrlr = new DBController();
  
      // collection names
      this.fromDict = dbctrlr.getSPAMFrom();
      this.bodyDict = dbctrlr.getSPAMBody();
  
    }
  
    // this will return the nav items - Old should not be called
    isSPAMFrom(from) {
      debug(`isSPAMFrom called with: ${from}`);
      console.log("from is: ");
      console.log(from);
      let result = false;
      let tmp = from.toLowerCase();
      console.log("from tmp is: ");
      console.log(tmp);
      console.log("fromDict: ");
      console.log("%o", this.fromDict);
      try {
        if(this.fromDict[tmp]) {
            result = true;
            console.log('from is spam');
        }

      } catch (err) {
        debug(err.stack);
      }
      return result;
    }
  
    // this will return the navMain items
    isSPAMBody(body) {
      debug(`isSPAMBody called with: ${body}`);
      let result = false;
      let tmp = body.toLowerCase();
      console.log("tmp is: ");
      console.log(tmp);
      try {

        if(this.fromDict[tmp]) {
            result = true;
        }

        if(tmp.includes('Betterfinancialreports')) {
          result = true;
          console.log("isSPAMBody spamfilter found Betterfinancialreports");
        }

        if (tmp.includes('http')) {
            result = true;
        }

        if (tmp.includes('www.')) {
            result = true;
        }

        if (tmp.includes('.com')) {
          result = true;
        }
        if (tmp.includes('bit.ly')) {
          result = true;
        }

      } catch (err) {
        debug(err.stack);
      }
      
      debug(`isSPAMBody spamfilter found spam: ${result}`);
      return result;
    }
  
  } // class


  module.exports = spamfilter;