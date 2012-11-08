var app;
(function (app) {
    var ViewModel = (function () {
        function ViewModel() {
            this.itemToAdd = ko.observable("");
            this.allItems = ko.observableArray([
                "Fries", 
                "Eggs Benedict", 
                "Ham", 
                "Cheese"
            ]);
            this.selectedItems = ko.observableArray([
                "Ham"
            ]);
            this.addItem = function () {
                if((this.itemToAdd() != "") && (this.allItems.indexOf(this.itemToAdd()) < 0)) {
                    this.allItems.push(this.itemToAdd());
                }
                this.itemToAdd("");
            };
            this.removeSelected = function () {
                if(confirm("remove ok?")) {
                    this.allItems.removeAll(this.selectedItems());
                    this.selectedItems([]);
                }
            };
            this.sortItems = function () {
                this.allItems.sort();
            };
        }
        return ViewModel;
    })();
    app.ViewModel = ViewModel;    
})(app || (app = {}));

$(function () {
    var view = new app.ViewModel();
    ko.applyBindings(view);
});
