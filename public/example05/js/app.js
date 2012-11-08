var app;
(function (app) {
    var ViewModel = (function () {
        function ViewModel() {
            this.stringValue = ko.observable("Hello");
            this.passwordValue = ko.observable("mypass");
            this.booleanValue = ko.observable(true);
            this.optionValues = [
                "Alpha", 
                "Beta", 
                "Gamma"
            ];
            this.selectedOptionValue = ko.observable("Gamma");
            this.multipleSelectedOptionValues = ko.observable([
                "Alpha"
            ]);
            this.radioSelectedOptionValue = ko.observable("Beta");
        }
        return ViewModel;
    })();
    app.ViewModel = ViewModel;    
})(app || (app = {}));

$(function () {
    var view = new app.ViewModel();
    ko.applyBindings(view);
});
