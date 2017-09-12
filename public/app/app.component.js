(function () {
    appController.Inject = ['$state'];
    function appController($state) {
        var ctrl = this;
        ctrl.addNewUser = addNewUser;
        function addNewUser(username) {
            if (username != '')
                $state.go('home', { username: username });
        }
    }
    var appComponent = {
        templateUrl: 'app/app.component.html',
        controller: appController
    }
    angular.module('app').component('appComponent', appComponent);
})();