requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.4.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'websocket': 'http://localhost:3000/socket.io/socket.io.js'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
       }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'websocket', 'bootstrap'],  function (system, app, viewLocator, io) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");
    app.title = 'PP';

    app.configurePlugins({
        router:true,
        dialog: true
    });

    app.start().then(function() {
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});