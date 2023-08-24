
const navNuMain = [
  {
    URL: '/',
    Text: 'Home'
  },
  {
    URL: '/events',
    Text: 'Events',
  },
  {
    URL: '/resources',
    Text: 'Resources',
    submenu: [{
      URL: '/karate',
      Text: 'Karate',
      },
      {
      URL: '/videos',
      Text: 'Videos',
      },
      {
        URL: '/miscresources',
        Text: 'misc',
      },
      {
        URL: '/resources',
        Text: 'Resources',
      },
    ],
  },
  {
    URL: '/schools',
    Text: 'Schools',
  },

  {
    URL: '/contact',
    Text: 'Contact',
  },
  {
    URL: 'https://www.facebook.com/WadokikaiKaratedo',
    Text: 'Facebook Page',
  },
];


const navNuHome = [
  {
    URL: '/',
    Text: 'Top'
  }, 
  {
    URL: '#news',
    Text: 'News'
  }, 
  {
    URL: '#schedules',
    Text: 'Schedules'
  },  
  {
    URL: '#signup',
    Text: 'Sign Up'
  }, 

];

const navNuStudents = [
  {
    URL: '/resources',
    Text: 'Top'
  },
  {
    URL: '/karate',
    Text: 'Karate',
    submenu: [
      {
        URL: '#overview',
        Text: 'Karate Overview',
      },
      {
        URL: '#wkkstyle',
        Text: 'Wado Ki Kai Style',
      },
      {
        URL: '#dojoprocedures',
        Text: 'Dojo Procedures',
      },
      {
        URL: '/docs/Twenty guiding principles of Karate.pdf',
        Text: 'Twenty guiding principles of Modern Karate',
      },
    ],
  },
  {
    URL: '/videos',
    Text: 'Videos',
    submenu: [{
      URL: '#shinkokata',
      Text: 'Shinko Kata',
    },
    {
      URL: '#kata',
      Text: 'Kata',
    },
    {
      URL: '#videos',
      Text: 'Videos',
    },
    ],
  },
  {
    URL: '/miscresources',
    Text: 'Miscellaneous',
    submenu: [ 
    {
      URL: '#library',
      Text: 'Library',
    },
    {
      URL: '#terminology',
      Text: 'Terminology',
    },
    {
      URL: '#photos',
      Text: 'Photo Gallery',
    },
    {
      URL: '/docs/Bushido-code.pdf',
      Text: 'Bushido Code',
    },
    ],
  },
];

const navNuInstructors = [
  {
    URL: '/schools',
    Text: 'Top'
  },
  {
    URL: '#instructors',
    Text: 'Instructors',
  },
  {
    URL: '#schools',
    Text: 'Schools',
  },
];

const navNuEvents = [
  {
    URL: '/events',
    Text: 'Top'
  },
  {
    URL: '#events',
    Text: 'Events',
  },
];


db = db.getSiblingDB('wadokikai');
db.nav.remove({});
db.navNuMain.remove({});
db.navNuHome.remove({});
db.navNuStudents.remove({});
db.navNuInstructors.remove({});
db.navNuEvents.remove({});
db.navNuMain.insert(navNuMain);
db.navNuHome.insert(navNuHome);
db.navNuStudents.insert(navNuStudents);
db.navNuInstructors.insert(navNuInstructors);
db.navNuEvents.insert(navNuEvents);



// Old original NAV from wadokikai.com page
// const nav = [
//   {
//     URL: 'http://www.wadokikai.org',
//     Text: 'Home'
//   },
//   {
//     URL: '/overview',
//     Text: 'Karate Overview',
//   },
//   {
//     URL: '/dojoprocedures',
//     Text: 'Dojo Procedures',
//   },
//   {
//     URL: '/style',
//     Text: 'Wado Ki Kai Style',
//   },
//   {
//     URL: '/kata',
//     Text: 'Kata',
//   },
//   {
//     URL: '/shinkokata',
//     Text: 'Shinko Kata',
//   },
//   {
//     URL: '/events',
//     Text: 'Events',
//   },
//   {
//     URL: '/terminology',
//     Text: 'Terminology',
//   },
//   {
//     URL: '/instructors',
//     Text: 'Instructors',
//   },
//   {
//     URL: '/schoolsandschedules',
//     Text: 'Schools & Schedules',
//   },
//   {
//     URL: '/contact',
//     Text: 'Contact',
//   },
//   {
//     URL: '/library',
//     Text: 'Library',
//   },
//   {
//     URL: '/photos',
//     Text: 'Photo Gallery',
//   },
//   {
//     URL: '/videos',
//     Text: 'Videos',
//   },
//   {
//     URL: '/https://www.facebook.com/BradleyKaratedo/?eid=ARCIuvWko1Nk7mNtwgul284onM5WJUcv3Gkxct0CLE8Alxf0FQYWp40u75hDyO7q6wIyCbDXzCeNOv91',
//     Text: 'Facebook',
//   },
//   {
//     URL: '/signup',
//     Text: 'Sign Up',
//   },
//   {
//     URL: '/docs/Bushido-code.pdf',
//     Text: 'Bushido Code',
//   },
// ];
