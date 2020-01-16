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
    }
];