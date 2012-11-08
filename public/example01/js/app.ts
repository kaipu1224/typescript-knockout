/// <reference path="../../../src/jquery.d.ts" />
/// <reference path="../../../src/knockout.d.ts" />

module app {
    export class GreeterViewModel {
        timerToken: number;
        utcTime: any;
        firstName:any;
        lastName:any;
        fullName:any;

        constructor () { 
            this.initialize();

            this.fullName = ko.computed(()=> {
                return this.firstName() + " " + this.lastName();
            });

            this.start();
        }

        initialize(){
            this.utcTime = ko.observable(new Date().toUTCString());
            this.firstName = ko.observable("first name");
            this.lastName = ko.observable("last name");
        }

        start() {
            this.timerToken = setInterval(() => this.utcTime(new Date().toUTCString()), 500);
        }
    }
}

$(function(){
    var view = new app.GreeterViewModel();
    ko.applyBindings(view);
});

