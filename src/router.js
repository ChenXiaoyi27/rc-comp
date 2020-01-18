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
    }
];