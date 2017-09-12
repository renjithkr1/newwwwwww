(function () {
    function chatController($scope) {
        ctrl = this;
        ctrl.data = {};
        ctrl.users = [];
        ctrl.rooms = [];
        ctrl.msgs = [];
        ctrl.currentReciever = {};
        var socket = io.connect();
        ctrl.onSend = onSend;
        ctrl.$onInit = function () {
            // ctrl.myName = ctrl.$transition$.params().username;
            ctrl.user = user;
            console.log(ctrl.user);
            // ctrl.selectedUser = {};
            getUsers();
            getRooms();
        }

        function getUsers() {
            socket.emit('get:user', ctrl.user);
        }

        function getRooms() {
            socket.emit('get:rooms');
        }

        ctrl.selectUser = function (user) {
            ctrl.selectedUser = user;
        }

        function onSend(msg) {
            if (ctrl.selectedUser && msg) {
                ctrl.data = {
                    msg: msg,
                    type: 'msg',
                    to: ctrl.selectedUser,
                    from: ctrl.user
                };
                socket.emit('send:msg', ctrl.data);
                ctrl.msgs.push(ctrl.data);
                ctrl.inputMsg = '';
            }
        }

        socket.on('get:msg', function (msg) {
            ctrl.msgs.push(msg);
            $scope.$apply();
        });
        socket.on('user:left', function (data) {
            ctrl.msgs.push(data);
            $scope.$apply();
        });

        socket.on('newUser', function (users, user) {
            if (user && user.id && ctrl.user.id == null) {
                ctrl.user = user;
            }
            ctrl.users = [];
            ctrl.users = users;
            $scope.$apply();
        });

        socket.on('newRoom', function (data) {
            ctrl.rooms = [];
            ctrl.rooms = data;
            $scope.$apply();
        });

    }
    var chatComponent = {
        templateUrl: 'app/chat/chat.component.html',
        controller: chatController,
        bindings: {
            user: '<',
            $transition$: '<'
        }
    }
    angular.module('chat').component('chatComponent', chatComponent);
})();