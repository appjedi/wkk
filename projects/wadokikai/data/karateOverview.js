const kodata = {
    karateOverview: {
        main: {
            title: 'General Information On Karate',
        },
        section1:
        {
            title: 'Karate Overview',
            paras: [{
                para: 'Although the exact beginnings of karate are somewhat uncertain, a combination of archeological evidence, written documentation, and oral history shows us that what we today call "Karate" is Okinawan. In fact, it was not introduced to the rest of the world until the great Okinawan karate master, Gichin Funakoshi, first introduced it in Japan in the 1920s. Records indicate that the Okinawans combined several Chinese boxing styles with their own indigenous systems in order to fight armed occupation troops throughout several periods of their history dating back to the 1500s (i.e. rein of Sho Hashi and later, the nearly 250 year rule by the Japanese).',
            }]
        },
        section2: 
        {
            title: 'What is Karate?',
            paras: [{
                para: 'Karate is a martial art which is founded on the effective use of every part of the body for the purpose of self defense. It is a weaponless art which employs various techniques of punching, striking, kicking, etc.',
                },
                {
                para: 'The prototype of Karate techniques is found in Chinese Kempo, which was introduced into Japan via Okinawa by Mr. Gichin Funakoshi, who is called the "Father of Karate". Karate has undergone a scientific revolution in Japan. All available knowledge in the study of anatomy, the laws of physics and human psychology were applied for its further research and development in Japan. And, finally today, what is called modern Karate is the result of this study. Without saying, Karate throughout its history has provided an excellent means of self defense. It is possible for one to develop a power equivalent to some weapons with systematic training of its techniques.',
                },
                {
                para: 'Because the art of Karate makes balanced use of the whole body, its values as an ideal physical art has been recognized and has been evaluated. It is becoming more popular each year.',
                },
                {
                para: 'One reason for the sudden international attraction and interest, and its rapid acceptance, can be attributed to the foregoing factors. However, the purpose of learning Karate is to hold as an ideal the perfection of human character through its training.',
                },
                {
                para: 'by Gichin Funakoshi',
            }]
        },
        section3:
        {
            title: 'Who Can Do Karate?',
            paras: [{
            para: 'Karate is designed for everyone, old or young, tall or short, or anyone in between. Rank requirements are the same for everyone, regardless of size and/or gender. Traditional karate training focuses on technique rather than on strength or size. The reason being, is that the key to force and power in a technique is rooted in how it is executed. Although rather easy to imitate these movements, you will find that they require a considerable amount of practice and discipline to become adept at them.',
            }]
        },
        section4:
        {
            title: 'The Ultimate Aim of Karate-do',
            paras: [{
            para: 'The word Karate comes from the teaching of Zen, which could be considered to be the backbone of oriental philosophy since ancient times. The Japanese character (kara) means Heaven or Universe, which in addition to containing the heavenly bodies consists of a great expanse of empty space. The word (kara) when translated to Zen terms relates to human existence as the state of selflessness or nothingness (the state where the self does not exist and all selfishness and selfish thoughts are gone). In other words, man should not be overcome by trifling selfishness, but should seek instead the perfection of his moral character.',
            },
            {
            para: 'This state of selflessness necessitates the desire for man to become a just and moral being. For example, man should not be motivated by the quest for material wealth and power, should not be envious of others, nor become a burden to society; but live a clean, wholesome, and moral life, with pride and honor no matter what other people say. To be able to attain this state of moral perfection is the ultimate goal of Karate-do.',
            }]
        },
        section5:
        {
            title: 'Karate and Wado Ki Kai',
            paras: [{
            para: 'Karate allows us many personal benefits. It is challenging - both mentally and physically, offers us a great way to stay in shape, relieves stress, gives us the opportunity to meet new people, and its a way for us to enjoy ourselves and have fun. At this dojo (school, studio, or center) we practice a style of karate called Wado Ki Kai. The English translation means "to learn from all things." This system of karate is a combination of our late teachers (Master John Pereira, 8th Dan ) traditional and contemporary styles of training. Wado Ki Kai is primarily an Okinawan-Japanese system, but it incorporates other aspects of different styles of martial arts. Traditional kata from Shorinji-Ryu, Shotokan, Gojukai, and Wado-Ryu are included. In addition, Okinawan weaponry, Chinese Kung-Fu weapons, and Korean kicking techniques from Tae Kwon Do are included. Sensei Pereira passed away in 1993. It is our hope to carry on the legacy he left us, and share it with others.',
            }]
        }
    }
};

db = db.getSiblingDB('wadokikai');
db.wadokikaidata.deleteOne({karateOverview: {$exists: true}});
db.wadokikaidata.insert(kodata);

