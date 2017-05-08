angular.module('your_app_name.auth.controllers', [])

.controller('AuthCtrl', function($scope){

})

.controller('WelcomeCtrl', function($scope, $ionicModal, show_hidden_actions, $state,AuthService,$rootScope){

	$scope.show_hidden_actions = show_hidden_actions;

	$scope.toggleHiddenActions = function(){
		$scope.show_hidden_actions = !$scope.show_hidden_actions;
	};

	$scope.facebookSignIn = function(){
		// เพิ่ม
	AuthService.clickfacebook();
		// console.log("doing facebbok sign in");
		// $state.go('app.feed');
	};
// เพิ่ม
	$rootScope.$on('userLoggedIn', function (data) {
      $scope.user = AuthService.getUser();
      if ($scope.user) {
    $state.go('app.feed');
        // $scope.modalCtrl.hide();
      } else {
        alert('Can not get user');
      }
    });

    // will fire in case authentication failed
    $rootScope.$on('userFailedLogin', function (err) {
      console.log('err : ' + err);
    });

	$scope.googleSignIn = function(){
		console.log("doing google sign in");
		$state.go('app.feed');
	};

	$scope.twitterSignIn = function(){
		console.log("doing twitter sign in");
		$state.go('app.feed');
	};

	$ionicModal.fromTemplateUrl('views/app/legal/privacy-policy.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.privacy_policy_modal = modal;
  });

	$ionicModal.fromTemplateUrl('views/app/legal/terms-of-service.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.terms_of_service_modal = modal;
  });

  $scope.showPrivacyPolicy = function() {
    $scope.privacy_policy_modal.show();
  };

	$scope.showTerms = function() {
    $scope.terms_of_service_modal.show();
  };
})

.controller('LogInCtrl', function($scope, $state,AuthService){
	$scope.user = {};
		$scope.doLogIn = function () {
			console.log("doing log in");
			AuthService.login($scope.user).then(function (success) {
				$state.go('app.shop.home');
			}, function (error) {
				alert(JSON.stringify(error));
			});
		};
})

.controller('SignUpCtrl', function($scope, $state,AuthService){
	$scope.user = {};
		$scope.doSignUp = function () {
			console.log("doing sign up");
			AuthService.signUp($scope.user).then(function (success) {
				$state.go('app.shop.home');
			}, function (error) {
				alert(JSON.stringify(error));
			});
		};
})

.controller('ForgotPasswordCtrl', function($scope, $state){
	$scope.requestNewPassword = function() {
    console.log("requesting new password");
		$state.go('app.feed');
  };
})

;
