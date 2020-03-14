module.exports = [
    {
        path: '/',
        component: require('./views/demo/hello').Hello,
        name: 'hello',
        dm: 'hello',
    }, {
        path: '/simpleTree',
        component: require('./views/demo/simpleTree').SimpleTreeDemo,
        name: 'simpleTree',
        dm: 'simpleTree',
    }, {
        path: '/useIconfont',
        component: require('./views/demo/useIconfont').UseIconfont,
        name: 'useIconfont',
        dm: 'useIconfont',
    }, {
        path: '/date2CN',
        component: require('./views/demo/date2CN').Date2CN,
        name: 'date2CN',
        dm: 'date2CN',
    }, {
        path: '/matterCalendar',
        component: require('./views/demo/matterCalendar').MatterCalendarDemo,
        name: 'matterCalendar',
        dm: 'matterCalendar',
    }, {
        path: '/textareaNum',
        component: require('./views/demo/textareaNum').TextareaNumDemo,
        name: 'textareaNum',
        dm: 'textareaNum',
    }, {
        path: '/calendarSelect',
        component: require('./views/demo/calendarSelect').CalendarSelectDemo,
        name: 'calendarSelect',
        dm: 'calendarSelect',
    }, {
        path: '/inputSelect',
        component: require('./views/demo/inputSelect').InputSelectDemo,
        name: 'inputSelect',
        dm: 'inputSelect'
    }, {
        path: '/printA4',
        component: require('./views/demo/printA4').PrintA4Demo,
        name: 'printA4',
        dm: 'printA4'
    }, {
        path: '/printA4Table',
        component: require('./views/demo/printA4Table').PrintA4TableDemo,
        name: 'printA4Table',
        dm: 'printA4Table'
    }, {
        path: '/browser',
        component: require('./views/demo/browser').BrowserDemo,
        name: 'browser',
        dm: 'browser'
    }, {
        path: '/exTable',
        component: require('./views/demo/exTable').ExTableDemo,
        name: 'exTable',
        dm: 'exTable'
    }
];