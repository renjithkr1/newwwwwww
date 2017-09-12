(function () {
    angular.module('app').directive("randomColor", function () {
        return {
            restrict: 'EA',
            replace: false,
            link: function (scope, element, attr) {

                //generate random color
                var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
                var style = attr.randomColor;
                //Add random background class to selected element
                element.css(style, color);

            }
        }
    })
})();