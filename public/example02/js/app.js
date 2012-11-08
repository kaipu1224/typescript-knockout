var app;
(function (app) {
    var ViewModel = (function () {
        function ViewModel() {
            var _this = this;
            this.numberOfClicks = ko.observable(0);
            this.registerClick = function () {
                return _this.numberOfClicks(_this.numberOfClicks() + 1);
            };
            this.resetClicks = function () {
                return _this.numberOfClicks(0);
            };
            this.hasClickedTooManyTimes = ko.computed(function () {
                return this.numberOfClicks() >= 3;
            }, this);
        }
        return ViewModel;
    })();
    app.ViewModel = ViewModel;    
})(app || (app = {}));

$(function () {
    var view = new app.ViewModel();
    ko.applyBindings(view);
});
