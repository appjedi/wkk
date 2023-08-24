const zoomInfo = [
    {
        dayofweek: '0',
        link: 'https://us02web.zoom.us/j/88695908432',
        text: 'Black Belts Only, <DT> 10:00 AM',
    }, 
    {
        dayofweek: '1',
        link: 'https://us02web.zoom.us/j/89897271933',
        text: '<DT> 6:30 PM',

    }, 
    {
        dayofweek: '2',
        link: '',
        text: '<DT>',

    }, 
    {
        dayofweek: '3',
        link: 'https://us02web.zoom.us/j/89324951315',
        text: '<DT> 6:30 PM',
    }, 
    {
        dayofweek: '4',
        link: '',
        text: '<DT>',

    }, 
    {
        dayofweek: '5',
        link: 'https://us02web.zoom.us/j/83295850255',
        text: '<DT> 4:30 PM',
    }, 
    {
        dayofweek: '6',
        link: '',
        text: '<DT>',

    }, 
];

db = db.getSiblingDB('wadokikai');
db.zoomInfo.remove({});
db.zoomInfo.insert(zoomInfo);