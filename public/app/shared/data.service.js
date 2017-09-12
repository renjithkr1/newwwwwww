(function(){
    angular.module('app').factory('dataService',dataService);
    dataService.$inject = ['$http'];
    function dataService($http){
        var service = {
            get : get
        }
        return get;

        function get(request){
            url = 'http://localhost:3000/addNewUser'
            var request = {
                method: 'GET',
                url: url
            };
            return $http(request).then(successCallback)
        }
    }
})();