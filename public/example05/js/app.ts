/// <reference path="../../../src/jquery.d.ts" />
/// <reference path="../../../src/knockout.d.ts" />

module app {
	export class ViewModel {
	    stringValue : knockout.koObservableString;
	    passwordValue : knockout.koObservableString;
	    booleanValue : knockout.koObservableBool;
	    optionValues : string[];
	    selectedOptionValue : knockout.koObservableString;
	    multipleSelectedOptionValues : knockout.koObservableString;
	    radioSelectedOptionValue : knockout.koObservableString;

		constructor(){
		    this.stringValue = ko.observable("Hello");
		    this.passwordValue = ko.observable("mypass");
		    this.booleanValue = ko.observable(true);
		    this.optionValues = ["Alpha", "Beta", "Gamma"];
		    this.selectedOptionValue = ko.observable("Gamma");
		    this.multipleSelectedOptionValues = ko.observable(["Alpha"]);
		    this.radioSelectedOptionValue = ko.observable("Beta");
		}
	}
}

$(function(){
	var view = new app.ViewModel();
	ko.applyBindings(view);
});