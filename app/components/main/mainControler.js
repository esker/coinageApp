var coinageApp = angular.module('coinageApp', ['ngMaterial']);

coinageApp.controller('coinageController', ['$scope', function($scope) {
    $scope.money;
    $scope.errorMessage = "";
    $scope.currency = [
      { name: "2£", value: ''},
      { name: "1£", value: ''},
      { name: "50p", value: ''},
      { name: "20p", value: ''},
      { name: "2p", value: ''},
      { name: "1p", value: ''}
    ];

    $scope.coinCounter = function() {
      var coinArray = [200, 100, 50, 20, 2, 1];
      var idx = 0;
      var coins = $scope.money
      errorHandler(coins);
      coinArray.forEach(function(coin) {
        coins = parseMoney(coins.toString());
        var amount = Math.floor(coins / coin);
        if (amount >= 1) {
          $scope.currency[idx].value = amount.toString();
          coins = coins - (amount*coin);
        } else {
          $scope.currency[idx].value = "0";
        }
        idx++;
      });
    }

    // takes in amounts with decimals and leading zeros and returns proper input
    function parseMoney(value) {
      // get everything that's not a number and replace it with ''
      // var moneyRegex = new RegExp("[^0-9]", ["g"]);
      var coins = value.replace(/[^0-9]+/g, "");

      // replase leading zeros
      coins.toString().replace(/\b0+/g, '');

      return parseInt(coins);
    }

    function errorHandler(value) {
      var errorArray = value.match(/(£?\d+\.?\d\d?p?)/);
      if (!errorArray) {
          $scope.errorMessage = "Invaild input, only GBP accepted (92p, £2.12)";
          $scope.money = 0;
      } else {
        $scope.money = errorArray[0];
        $scope.errorMessage = "";
      }
    }
}]);
