define(['plugins/http', 'durandal/app', 'knockout', 'plugins/router'], function (http, app, ko, router) {

    var self = this;
    self.roomNumber = ko.observable();
    this.openRoom = function(){
        if(!self.roomNumber()){
            app.showMessage("Please enter a room number to open.. ")
            return false;
        }

        // Open the room which is already available.
        router.navigate("#room/"+self.roomNumber());
    };

    return {
        displayName: 'Open',
        descriptions: "magic magic",
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
        },
        openRoom: openRoom
    };
});