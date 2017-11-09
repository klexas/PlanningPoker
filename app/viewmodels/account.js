define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {

    return {
        displayName: 'Account',
        descriptions: "For maintaining sessions and teams",
        images: ko.observableArray([]),
        activate: function () {
            //the router's activator calls this function and waits for it to complete before proceeding
            console.log("create loaded");
        },
        select: function(item) {
            //the app model allows easy display of modal dialogs by passing a view model
            //views are usually located by convention, but you an specify it as well with viewUrl
            item.viewUrl = 'views/partials/detail';
            app.showDialog(item);
        },
        canDeactivate: function () {
            //the router's activator calls this function to see if it can leave the screen
            return true;
        }
    };
});