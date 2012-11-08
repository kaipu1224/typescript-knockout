/// <reference path="../../../src/jquery.d.ts" />
/// <reference path="../../../src/knockout.d.ts" />

module app {
	export class ViewModel {
		allItems : any;
		selectedItems : any;
		itemToAdd : any;
		addItem : any;
		removeSelected : any;
		sortItems : any;

		constructor(){
		    this.itemToAdd = ko.observable("");
		    // Initial items
		    this.allItems = ko.observableArray(["Fries", "Eggs Benedict", "Ham", "Cheese"]);
		    // Initial selection
		    this.selectedItems = ko.observableArray(["Ham"]);
		 
		    this.addItem = function () {
		    	// Prevent blanks and duplicates
		        if ((this.itemToAdd() != "") && (this.allItems.indexOf(this.itemToAdd()) < 0)){
			        this.allItems.push(this.itemToAdd());
		        }
		        // Clear the text box
		        this.itemToAdd("");
		    };
		 
		    this.removeSelected = function () {
		    	if(confirm("remove ok?")){
			        this.allItems.removeAll(this.selectedItems());
			        // Clear selection
			        this.selectedItems([]);
		    	}
		    };
		 
		    this.sortItems = function() {
		        this.allItems.sort();
		    };
		}
	}
}

$(function(){
	var view = new app.ViewModel();
	ko.applyBindings(view);
});