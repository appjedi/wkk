const wkksdata = {
    wadokikaiStyle: {
        main: {
            title: 'Wado Ki Kai - To learn from all things',
        },
        section1:
        {
            title: 'Wado Ki Kai Style',
            paras: [{
                para: 'Welcome to our Karate Program! This Web Site has been prepared to help with an orientation to the martial arts by anticipating and answering questions you may have. However, if after browsing, you still have not gotten all the answers you want, please contact one of the Black Belt instructors by way of email or through a school and they will be happy to answer any of your questions.',
            },
            {
                paraImg: '/images/JohnArce.jpg',              
            }]
        },
        section2: 
        {
            title: 'Passing the torch',
            paras: [{
                para: 'On June 1st, 2009 Shihan Ferol Arce, 9th Dan, officially turned the Karate program (Adult & Children) at Mariner Square Athletic Club over to Sensei Geoffrey Bradley, 6th dan.',
                },
                {
                para: 'Shihan Arce started his Karate training in the 70s under Soke John Pereira. He started teaching in the early 80s and started the program at Mariner Square in 1989. During his long journey he has promoted over 100 students to black belt, including his most senior student, Geoffrey Bradley.',
                },
                {
                para: 'We all that have trained with Shihan Arce will miss his regular guidance, but we all know we are in good hands with Sensei Bradley and Shihan Arce is only a phone call away.',
                },
                {
                para: 'Shihan Ni Rei!',
            }]
        },
        section3:
        {
            title: 'Wado Ki Kai Karate',
            paras: [{
                para: 'The Wado Ki Kai system was founded in 1976 by the late John T. Pereira, 8 th degree black-belt. The English translation means "To Learn From All Things". Practitioners of this style refer to it as "the complete karate system" due to its incorporation of techniques from other styles in the martial arts.',
            },
            {
                para: 'Sensei Pereira was strongly influenced by two of his teachers; Dr. Duke Moore, 10 th degree black-belt in karate (a man whom also holds black belt rank in judo and ju-jitsu), and Richard "Biggie" Kim, another renowned martial artist. Kata from the Naha-te, Goju, Shuri-te, and Shoto are all manifest in the Wado Ki Kai system.',
            }, 
            {
                para: 'Weapons include the Bo, Sai, Tonfa, Nunchaku , and sword. The adoption of fluid kicking techniques from Tae Kwon Do are evident when Wado Ki Kai kumite is observed. The most celebrated technique of this style, and one that it is best known for, is the front thrust kick. Sensei Pereira strongly advocated the incorporation of padded sparring equipment in kumite. This idea met with much opposition at the time, but Sensei Pereira nevertheless included it in the Wado Ki Kai system, and today it is an accepted practice in the martial arts world.', 
            },
            {
                para: 'Today, Master Pereiras unique system of karate is being taught throughout the United States and Mexico. We that knew him are greatly saddened by his untimely death in 1993, but respectfully share his legacy, and work towards its continuation and growth.',
            },
            {
                para: 'by Ferol N. Arce, Shihan',
            }]
        },
        section4:
        {
            title: 'Wado Ki Kai Lineage',
            paras: [{
                    para: 'Wado Ki Kai has lineage through several Karate masters from both the Shuri and Naha line, as well as influences from Tae Kwon Do, JuJitsu, and Judo.',
                }],
            links: [{
                    text: '1.  Shuri Lineage (Shorin-ryu, Shotokan, Wado-ryu, Doshinkan)',
                    img: '/images/shuri-lineage.jpg',
                },
                {
                    text: '2.  Naha Lineage (Gojo-ryu, Shorinji-ryu, Kyokushin-kai)',
                    img: '/images/Naha-lineage.jpg',
                }],
        },
        section5:
        {
            title: 'Wado Ki Kai Karate Registered Trademark',
            paras: [{
            para: 'The Wado Ki Kai name and symbol became a registered trademark in 1997 under the classes of Clothing and Education and Entertainment to Ferol Arce. The trademark was first filed on November 13, 1995, was officially accepted in 1996 and published in 1997. Here is the published recognition of the trademark from May 13, 1997.',
            },
            {
                paraImg: '/images/tm.jpg',
            }]
        }
    }
};

db = db.getSiblingDB('wadokikai');
db.wadokikaidata.deleteOne({wadokikaiStyle: {$exists: true}});
db.wadokikaidata.insert(wkksdata);

