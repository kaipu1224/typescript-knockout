/// <reference path="../../../src/jquery.d.ts" />
/// <reference path="../../../src/knockout.d.ts" />

module app {
	export class ViewModel {
		savedLists:any;
		editingList:any;
		userNameToAdd:any;
		currentTweets:any;
		findSavedList:any;
		addUser:any;
		removeUser:any;
		saveChanges:any;
		deleteList:any;
		hasUnsavedChanges:any;
		userNameToAddIsValid:any;
		canAddUserName:any;
		twitterApi:TwitterApi;

		constructor(lists, selectedList){
			this.twitterApi = new TwitterApi();

		    this.savedLists = ko.observableArray(lists);
		    this.editingList = {
		        name: ko.observable(selectedList),
		        userNames: ko.observableArray()
		    };
		    this.userNameToAdd = ko.observable("");
		    this.currentTweets = ko.observableArray([])
		 
		    this.findSavedList = function(name) {
		        var lists = this.savedLists();
		        return ko.utils.arrayFirst(lists, function(list) {
		            return list.name === name;
		        });
		    };
		 
		    this.addUser = function() {
		        if (this.userNameToAdd() && this.userNameToAddIsValid()) {
		            this.editingList.userNames.push(this.userNameToAdd());
		            this.userNameToAdd("");
		        }
		    };
		 
		    this.removeUser = function(userName) { 
		        this.editingList.userNames.remove(userName) 
		    }.bind(this);
		 
		    this.saveChanges = function() {
		        var saveAs = prompt("Save as", this.editingList.name());
		        if (saveAs) {
		            var dataToSave = this.editingList.userNames().slice(0);
		            var existingSavedList = this.findSavedList(saveAs);
		            if (existingSavedList) existingSavedList.userNames = dataToSave; // Overwrite existing list
		            else this.savedLists.push({
		                name: saveAs,
		                userNames: dataToSave
		            }); // Add new list
		            this.editingList.name(saveAs);
		        }
		    };
		 
		    this.deleteList = function() {
		        var nameToDelete = this.editingList.name();
		        var savedListsExceptOneToDelete = $.grep(this.savedLists(), function(list) {
		            return list.name != nameToDelete;
		        }, false);
		        this.editingList.name(savedListsExceptOneToDelete.length == 0 ? null : savedListsExceptOneToDelete[0].name);
		        this.savedLists(savedListsExceptOneToDelete);
		    };
		 
		    ko.computed(function() {
		        // Observe viewModel.editingList.name(), so when it changes (i.e., user selects a different list) we know to copy the saved list into the editing list
		        var savedList = this.findSavedList(this.editingList.name());
		        if (savedList) {
		            var userNamesCopy = savedList.userNames.slice(0);
		            this.editingList.userNames(userNamesCopy);
		        } else {
		            this.editingList.userNames([]);
		        }
		    }, this);
		 
		    this.hasUnsavedChanges = ko.computed(function() {
		        if (!this.editingList.name()) {
		            return this.editingList.userNames().length > 0;
		        }
		        var savedData = this.findSavedList(this.editingList.name()).userNames;
		        var editingData = this.editingList.userNames();
		        return savedData.join("|") != editingData.join("|");
		    }, this);
		 
		    this.userNameToAddIsValid = ko.computed(function() {
		        return (this.userNameToAdd() == "") || (this.userNameToAdd().match(/^\s*[a-zA-Z0-9_]{1,15}\s*$/) != null);
		    }, this);
		 
		    this.canAddUserName = ko.computed(function() {
		        return this.userNameToAddIsValid() && this.userNameToAdd() != "";
		    }, this);
		 
		    // The active user tweets are (asynchronously) computed from editingList.userNames
		    ko.computed(function() {
		        this.twitterApi.getTweetsForUsers(this.editingList.userNames(), this.currentTweets);
		    }, this);
		}
	}

	class TwitterApi {
		getTweetsForUsersThrottled:any;

		constructor(){
		    var throttleFunction = function (fn, throttleMilliseconds) {
		        var invocationTimeout;

		        return function () {
		            var args = arguments;
		            if (invocationTimeout)
		                clearTimeout(invocationTimeout);

		            invocationTimeout = setTimeout(function () {
		                invocationTimeout = null;
		                fn.apply(window, args);
		            }, throttleMilliseconds);
		        };
		    };

		    this.getTweetsForUsersThrottled = throttleFunction(function (userNames, callback) {
		        if (userNames.length == 0)
		            callback([]);
		        else {
		            var url = "http://search.twitter.com/search.json?callback=?&rpp=100&q=";
		            for (var i = 0; i < userNames.length; i++){
		                url += "from:" + userNames[i] + (i < userNames.length - 1 ? " OR " : "");
		            }
		            $.ajax(
		            	url,
		            	{
		                	dataType: "jsonp",
		                	success: function (data)
		                	{
		                		callback($.grep(data.results || [], function (tweet) {
		                			return !tweet.to_user_id;
		                		}, false));
		                	}
		            	}
		            );
		        }
		    }, 50);
		}

		getTweetsForUser(userName, callback) {
			return this.getTweetsForUsers([userName], callback);
		}

		getTweetsForUsers(userNames, callback) {
    		return this.getTweetsForUsersThrottled(userNames, callback);
		}
	}
}
var savedLists : any = [
    { name: "Celebrities", userNames: ['JohnCleese', 'MCHammer', 'StephenFry', 'algore', 'StevenSanderson']},
    { name: "Microsoft people", userNames: ['BillGates', 'shanselman', 'ScottGu']},
    { name: "Tech pundits", userNames: ['Scobleizer', 'LeoLaporte', 'techcrunch', 'BoingBoing', 'timoreilly', 'codinghorror']}
];
$(function(){

	var view = new app.ViewModel(savedLists, "Tech pundits");
	ko.applyBindings(view);

	$(".loadingIndicator").ajaxStart(function() {
	    $(this).fadeIn();
	}).ajaxComplete(function() {
	    $(this).fadeOut();
	});
});