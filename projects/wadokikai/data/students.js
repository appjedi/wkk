const students = {
    studentInfo: [
        {   
            name: "", 
            rank: "", 
            profilePage: "", 
            image: "/images/students/generic.jpg", 
            note: "",
            order: 1,
            locationName: "", 
            city: "", 
            zipCode: "", 
            headSensei: "", 
            dojo: "", 
            locationImage: "",
            teacher: '',
            active: false,
            yob: '',
            instructor: false,
            startDate: '',
            rokyuDate: '',
            rokyuDate: '',
            gokyuDate: '',
            yokyuDate: '',
            sankyuDate: '',
            nikyuDate: '',
            ikyuDate: '',
            shodanDate: '',
            nidanDate: '',
            sandanDate: '',
            yodanDate: '',
            godanDate: '',
            rukudanDate: '',
            shichidanDate: '',
            hachidanDate: '',
            kudanDate: '',
            judanDate: '',
        },
        { 
            name: "", 
            rank: "", 
            profilePage: "", 
            image: "/images/students/generic.jpg", 
            note: "",
            order: 1,
            locationName: "", 
            city: "", 
            zipCode: "", 
            headSensei: "", 
            dojo: "", 
            locationImage: "",
            teacher: '',
            active: false,
            yob: '',
            instructor: false,
            startDate: '',
            rokyuDate: '',
            rokyuDate: '',
            gokyuDate: '',
            yokyuDate: '',
            sankyuDate: '',
            nikyuDate: '',
            ikyuDate: '',
            shodanDate: '',
            nidanDate: '',
            sandanDate: '',
            yodanDate: '',
            godanDate: '',
            rukudanDate: '',
            shichidanDate: '',
            hachidanDate: '',
            kudanDate: '',
            judanDate: '',
        }
    ]
};

const studentPageInfo = {
    studentPageData:  {
        intro: "This is a resource page for current and former students."
    }
};


db = db.getSiblingDB('wadokikai');
db.wadokikaidata.deleteOne({students: {$exists: true}});
db.wadokikaidata.insert(students); 
db.wadokikaidata.insert(studentPageInfo);