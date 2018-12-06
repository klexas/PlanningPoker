define(['durandal/app', 'knockout', 'websocket'], function (app, ko, io) {

    var self = this;
    self.roomId = ko.observable();
    self.displayName = ko.observable();
    self.description = ko.observable("Planning Poker Room");
    self.visitorName = ko.observable();
    self.url = ko.observable();
    self.socket = {};
    self.people = ko.observableArray([]);
    self.hasVoted = ko.observable(false);

    // Fibonacci system
    self.fibonacci = ko.observableArray([1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "?", "NA"]);
    self.voteResults = ko.observableArray([]);

    // TODO: Get these from TFS
    self.userStories = ko.observableArray([
        {
            title: "Generate and complete  8.2  Data dictionary",
            link: "https://tfsEndpoint"
        },
        {
            title: "Client-side log capture",
            link: "https://tfsEndpoint"
        }
    ]);
    self.selectedNumber = ko.observable();

    // Adding visitors name
    self.setName = function(){
        if(self.visitorName() == ""){
            app.showMessage("No name selected");
            self.visitorName("Anonymous");
            return false;
        }
        self.socket.emit('setname', {name : self.visitorName(), room: self.roomId()});
        app.showMessage("Name has been set to " + self.visitorName() + "!");
    };

    // Selection method
    self.select = function(data, element){
        var elements = document.getElementsByClassName("card");

        $.each(elements, function(el){
            $(el).removeClass("active")
        });
        // If unselecting
        if(self.selectedNumber() == data){
            self.selectedNumber("");
            return false;
        }

        self.selectedNumber(data);
        // Send this users vote
        self.socket.emit('vote', {room: self.roomId(), name : self.visitorName(), vote: self.selectedNumber()});

        // TODO: Move this to proper knockout binding
        $(element.currentTarget).toggleClass("active");

    };

    self.selectStory = function(data, element){
        self.description(data.title);
        self.url(data.link);
    };

    // Configure and set up the socket events
    // TODO: Create lib/module for this
    self.configureSocketEvents = function(){
        // Early out
        if(!self.socket){
            router.navigate("#welcome");
            return false;
        }

        // Joiner
        self.socket.on('newjoin', function(msg){
            //app.showMessage("New user joined");
        });

        // Vote Made
        self.socket.on("voteadded", function(voteDetails){
            console.log(voteDetails);
            self.voteResults.push({
                userName: voteDetails.data.name,
                result: voteDetails.data.vote
            });
            self.hasVoted(true);
        });

        // People count update
        self.socket.on("people", function(people){
            console.log(people.data);
            self.people(people.data);
        });

    };

    return{
        activate: function(id){
            // Set the room ID
            self.roomId(id);
            self.displayName("Room " + self.roomId());
            var queryString = "room="+self.roomId();
            // TODO: Connect to the websocket of the room
            // TODO : Move these to a configuration value pulled from server 
            self.socket = io("http://localhost:3001", {query: queryString});
            self.socket.emit('roomjoin', { room: self.roomId(), name: self.visitorName()});

        },
        compositionComplete: function(){
            if(!self.visitorName())
                $('#username').modal();
            self.configureSocketEvents();
        },
        canDeactivate:function(){
            // Remove the user from the room on the server.
            self.visitorName("");
            // Debug logging
            self.socket.emit("leaveRoom", {room: self.roomId(), name: self.visitorName()});
            console.log("Leaving room");
            return true;
        },
        select: self.select,
        selectStory: self.selectStory
    };
});