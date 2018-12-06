define(['plugins/http', 'durandal/app', 'knockout', 'plugins/router'], function (http, app, ko, router) {

    var self = this;
    self.tfsLink = ko.observable();
    self.tfsLinks = ko.observableArray([]);
    self.roomName = ko.observable();


    self.createRoom = function(){
        console.log("Creating room.. ");
        // TODO: Implement backend.. important.
        app.showDialog("Room created! Kinda! ");
        router.navigate("#room/" + self.roomName());
    };

    self.addTFSLink = function(){
        //TODO: Get Title automatically.
        if(!self.tfsLink()){
            return false;
        }
        // Add
        self.tfsLinks.push({
            link: self.tfsLink()
        });
        // clear input
        self.tfsLink(null);
    };

    return {
        displayName: 'Create',
        descriptions: "Magic Magic",
        images: ko.observableArray([]),
        activate: function () {
            // The router's activator calls this function and waits for it to complete before proceeding
            console.log("create loaded");
            // Clear out model
            self.tfsLink = ko.observable();
            self.tfsLinks = ko.observableArray([]);
            self.roomName = ko.observable();
        },
        select: function(item) {
            // The app model allows easy display of modal dialogs by passing a view model
            // Views are usually located by convention, but you an specify it as well with viewUrl
            item.viewUrl = 'views/partials/detail';
            app.showDialog(item);
        },
        canDeactivate: function () {
            //the router's activator calls this function to see if it can leave the screen
            return app.showMessage('Are all the details correct ?', 'Navigate', ['Yes', 'No']);
        }
    };
});