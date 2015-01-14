var app = angular.module('twitterApp', [
	'ngRoute', 
	'ngAnimate',
	'appRoutes', 
	'MainCtrl', 
	'TwitterCtrl', 
	'ProfileCtrl',
	'AuthCtrl',
	'AuthService',
	'AppService',	
	'MapService',
	function(){

	}
]);

app.run(['$location', '$rootScope', '$log', 'AuthService', '$route', '$http', 
    function ($location, $rootScope, $log, AuthService, $route, $http) {
		
		$rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
	    	if (rejection && rejection.needsAuthentication === true) {
	        	var returnUrl = $location.url();
	            $log.log('returnUrl=' + returnUrl);
	            $location.path('/login').search({ returnUrl: returnUrl });
	        }
	    });

	    //För att kontrollera om användaren har internet access
		var ping = function(){
			$http.get('/api'); 
		}
	    setInterval(ping, 15000);
}]); 

app.factory('errorInterceptor', ['$q', '$rootScope', 
    function ($q, $rootScope) {
       return {
		    'response': function(response) {
		      // do something on success
		      return response;
		    },
		   'responseError': function(rejection) {
		   		console.log(rejection.status); 
		   		if(rejection.status === 0){
					//OMG, offline
		   		} 
		      return $q.reject(rejection);
		    }
		  };
}]);

app.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('errorInterceptor');

    /*//Calling order 
	*	app.config()
	*	app.run()
	*	directive's compile functions (if they are found in the dom)
	*	app.controller()
	*	directive's link functions (again if found)
	*/
}]); 