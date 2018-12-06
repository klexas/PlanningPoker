define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function() {
            app.showMessage('Search not implemented... Yet');
        },
        activate: function () {
            router.map([
                { route: '', title:'Welcome', moduleId: 'viewmodels/welcome', nav: true },
                { route: 'Create', moduleId: 'viewmodels/create', nav: true },
                { route: 'Open', moduleId: 'viewmodels/open', nav: true },
                { route: 'Room/:id', moduleId: 'viewmodels/room', nav: false, hash: '#room/:id', activeItem: "Open" },
                { route: 'Account', moduleId: 'viewmodels/account', nav: true }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});