var app;
(function (app) {
    var ViewModel = (function () {
        function ViewModel(items) {
            this.items = ko.observableArray(items);
            this.itemToAdd = ko.observable("");
            this.addItem = function () {
                if(this.itemToAdd() != "") {
                    this.items.push(this.itemToAdd());
                    this.itemToAdd("");
                }
            }.bind(this);
        }
        return ViewModel;
    })();
    app.ViewModel = ViewModel;    
})(app || (app = {}));

$(function () {
    var view = new app.ViewModel([
        "hoge", 
        "fuga"
    ]);
    ko.applyBindings(view);
});
