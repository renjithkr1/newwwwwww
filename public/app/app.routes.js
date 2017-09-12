(function () {
    angular.module('app').config(appRun);
    appRun.$inject = ['$stateProvider'];

    function appRun($stateProvider) {
        var socket = io.connect();

        $stateProvider.state('index', {
            url: '',
            component: 'appComponent',

        })
        $stateProvider.state('home', {
            url: '/home',
            component: 'chatComponent',
            params: {
                username: null
            },
            resolve: {
                user: addNewUser
            }

        })

        function addNewUser($transition$, $http, $state, $q) {
            // socket.emit('add user', $transition$.params().username);
            var deferred = $q.defer();
            username = $transition$.params().username;
            if (!(username == '' || username == null)) {
                $http.post('http://localhost:3001/login', { username: username })
                    .then(function (data) {
                        if (data.status && data.status == 200 && data.data.auth) {
                            user = data.data
                            return user;
                        }
                        else {
                            $state.go('index');
                        //    return deferred.promise;
                        }
                    })
            } else {
                $state.go('index');
                // return deferred.promise;
            }
            
        }
    }
})();