// Define a new module for our app
var app = angular.module("gSpreadsheet", []);


var googleSpreadsheetPublicKey = "1Lw_fenLHDIkkdHwUwgbs90ggz6goRtJudkrECkYrmtg";
// this your public key found in your Published Google Spreadsheet url
//
//Example:
// https://docs.google.com/spreadsheets/d/1Lw_fenLHDIkkdHwUwgbs90ggz6goRtJudkrECkYrmtg/pubhtml
//
//Public Key is:
// 1Lw_fenLHDIkkdHwUwgbs90ggz6goRtJudkrECkYrmtg

var gUrl = "https://spreadsheets.google.com/feeds/cells/" + googleSpreadsheetPublicKey + "/od6/public/basic?hl=en_US&alt=json";

app
    .config(function($httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });

app.controller('gSpreadsheet', function($scope, $http) {

    
    $http.get(gUrl).
    success(function(data, status, headers, config) {
        //var json = data.getContentText();
        //var parsedData = JSON.parse(data);
        var gObj = data.feed.entry;
        var posts = [];

        for (i = 0; i < gObj.length; i++) {
            posts[i] = data.feed.entry[i].content.$t;
        }
        //$scope.posts = data.feed.entry;

        $scope.title = data.feed.entry[0].content.$t;
        posts.shift();
		//remove title from array
        $scope.events = posts;
        //var json = JSON.parse(data);
        //$scope.posts = data;
        //console.log(headers);
        console.log(posts);



    }).
    error(function(data, status, headers, config) {
        // log error
        $scope.events = ["There was a problem loading the Events list. Please check back later."];
    });


});




