/// <reference path="../../../src/jquery.d.ts" />
/// <reference path="../../../src/knockout.d.ts" />

module app {
	export class ViewModel {
		numberOfClicks:any;
		registerClick:any;
		resetClicks:any;
		hasClickedTooManyTimes:any;

		constructor(){
			this.numberOfClicks = ko.observable(0);
			this.registerClick = () => this.numberOfClicks(this.numberOfClicks() + 1);
    		this.resetClicks = () => this.numberOfClicks(0);
    		
     		this.hasClickedTooManyTimes = ko.computed(function() {
        		return this.numberOfClicks() >= 3;
    		}, this);
		}
	}
}

$(function(){
	var view = new app.ViewModel();
	ko.applyBindings(view);
});