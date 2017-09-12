(function () {
    angular.module('app').directive("msgCount", function () {
        return {
            scope: {
                msgCount: "=",
                us: "="
            },
            restrict: 'EA',
            replace: false,
            link: function (scope, element, attr) {
                scope.$watchCollection('msgCount', function (msgs) {
                    if (msgs) {
                        scope.us.count = 0;
                        msgs.forEach(function (msg) {
                            if ((msg.type=='msg') && (scope.us.id == msg.from.id)) {
                                scope.us.count += 1;
                            }
                        }, this);
                    }
                });

            }
        }
    })
})();