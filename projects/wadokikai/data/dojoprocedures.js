const dpdata = {
    dojoProcedures: {
        main: {
            title: 'Dojo Procedures',
        },
        section1:
        {
            title: 'Dojo',
            paras: [{
                para: 'Always bow respectfully as you enter and leave the dojo. You show respect for the dojo, the art, your fellow students, and the instructors, by doing so. If a class has already begun, quietly bow in at the door, enter the room, and step to the side, be seated and perform the opening ceremony silently to yourself. You may join the class at this point, as long as they too have finished the formal class bow in.',
            }]
        },
        section2: 
        {
            title: 'Karate Uniform and Belt',
            paras: [{
                para: 'You are required to wear a karate uniform. It is called a "gi". The only additional feature allowed on our gi is the Wado Ki Kai emblem. Gi color other than white may be worn ONLY by visitors from another dojo. Never wear a belt color other than the one associated with your rank. Always place the left side of your gi over the right side. Tie the belt so that you have the appropriate square knot with the ends of the belt even and resting in the center of your body (not at the side or back). Again, visitors from other dojos are exempt from this rule. Make sure your gi is always clean and ironed (if possible). Cutting off the sleeves or pant legs is not permitted. If your gi begins to look tattered, buy a new one. It is a reflection of you and your school.',
                },
                {
                paraImg: '',
            }]
        },
    }
};

db = db.getSiblingDB('wadokikai');
db.wadokikaidata.deleteOne({dojoProcedures: {$exists: true}});
db.wadokikaidata.insert(dpdata);

