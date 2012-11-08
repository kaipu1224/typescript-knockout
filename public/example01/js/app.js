var app;
(function (app) {
    var GreeterViewModel = (function () {
        function GreeterViewModel() {
            var _this = this;
            this.initialize();
            this.fullName = ko.computed(function () {
                return _this.firstName() + " " + _this.lastName();
            });
            this.start();
        }
        GreeterViewModel.prototype.initialize = function () {
            this.utcTime = ko.observable(new Date().toUTCString());
            this.firstName = ko.observable("first name");
            this.lastName = ko.observable("last name");
        };
        GreeterViewModel.prototype.start = function () {
            var _this = this;
            this.timerToken = setInterval(function () {
                return _this.utcTime(new Date().toUTCString());
            }, 500);
        };
        return GreeterViewModel;
    })();
    app.GreeterViewModel = GreeterViewModel;    
})(app || (app = {}));

$(function () {
    var view = new app.GreeterViewModel();
    ko.applyBindings(view);
});
