const wkksudata = {
    signUp: {
        title: "Wado Ki Kai Sign Up",
        subTitle: "Please sign up below.",
        info: "<strong>Please Note:</strong> If signing up a minor, age under 18 years old, please provide parent/guardian contact information",
        zoomInfo: "Classes over Zoom and/or outdoor location in Alameda.",
        locationTitle: "Location",
        location: "Outdoor location in Alameda is subject to change and external weather conditions. Currently Woodstock Park Center.",
        duesTitle: "Dues",
        dues: "First week is free! Class dues are $60 per month. There are three classes per week, about 12 per month.",
        scheduleTitle: "Schedule",
        schedule: "Monday and Wednesday 6:30pm to 7:30pm, Friday 4:30pm to 5:30pm",
        ageFAQ: "We request Age or Date of Birth especially for minors. It is optional and you may discuss it with the instructor",
        parentFAQ: "Please enter parent phone/email instead of minor (age < 18).",
    }

}

db = db.getSiblingDB('wadokikai');
db.wadokikaidata.deleteOne({signUp: {$exists: true}});
db.wadokikaidata.insert(wkksudata);