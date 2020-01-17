module.exports = [
    {
        path: '/',
        component: require('./views/hello').Hello,
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
    }
];