define(['durandal/app'], function (app) {

    var self = this;

    var ctor = function () {
        this.displayName = 'Welcome to PP!';
        this.description = 'PP.. And all that planning poker can offer';
        this.features = [
            'Planning',
            'Poker',
            'Fibonacci numbers',
            'More to come'
        ];
    };

    return ctor;
});