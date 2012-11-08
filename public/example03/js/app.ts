/// <reference path="../../../src/jquery.d.ts" />
/// <reference path="../../../src/knockout.d.ts" />

module app {
	export class ViewModel {
		items : any;
		itemToAdd : any;
		addItem : any;

		constructor(items:string[]){
		    this.items = ko.observableArray(items);
		    this.itemToAdd = ko.observable("");

		    this.addItem = function() {
		        if (this.itemToAdd() != "") {
		            this.items.push(this.itemToAdd());
		            this.itemToAdd("");
		        }
		    }.bind(this);
		}
	}
}

$(function(){
	var view = new app.ViewModel(["hoge","fuga"]);
	ko.applyBindings(view);
});