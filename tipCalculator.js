(function() {
  'use strict';

  angular.module('ezTip')
    .controller('TipCalculatorCtrl', TipCalculatorCtrl);

  TipCalculatorCtrl.$inject = ['$scope', '$rootScope', '$timeout'];

  function TipCalculatorCtrl($scope, $rootScope, $timeout) {

    $scope.appDetails = {
      title: 'ezTip',
      caption: '~~ Tip with ease ~~'
    };

    $scope.data = {
      total: 0.00,
      splitNum: 1
    };
    
    $scope.paymentDetails = {
      totalBillWithoutTip: 0,
      totalTip: 0,
      totalTipPerPerson: 0,
      totalBillWithTip: 0,
      totalBillPerPerson: 0
    };

    $scope.submitted = false;
    $scope.initialFormView = true;

    // In your controller
    $scope.slider = {
      value: 15,
      max: 100,
      options: {
        id:1,
        floor: 0,
        ceil:100,
        translate: function(value) {
          return value + '%';
        },
        onEnd: function(id, value, high){
          $scope.slider.value = value;
          $scope.calculate();
        }
      }
    };


    $scope.submit = function(isValid) {
      if (isValid) {
        $scope.submitted = true;
        $scope.refreshSlider();
        $scope.calculate();
      }
    };

    $scope.refreshSlider = function () {
    $timeout(function () {
      $scope.$broadcast('rzSliderForceRender');
    });
  };

    $scope.calculate = function() {
       if ($scope.data.splitNum <= 0) {
        $scope.data.splitNum = 1
      }
      
      if($scope.data.total < 0){
        $scope.data.total = 0;
      }
      
      $scope.paymentDetails.totalTip = calculateTip($scope.data.total, $scope.slider.value);
      $scope.paymentDetails.totalTipPerPerson = calculateTipPerPerson($scope.paymentDetails.totalTip, $scope.data.splitNum);
     
      $scope.paymentDetails.totalBillWithTip = calculateTotalBillWithTip($scope.data.total, $scope.paymentDetails.totalTip);
      $scope.paymentDetails.totalBillPerPerson = calculateTotalBillPerPerson($scope.paymentDetails.totalBillWithTip, $scope.data.splitNum);
    };
    
    function calculateTip(totalBill, tipPercent){
      var total = tipPercent/100 * totalBill;
      return Math.round(total * 100) / 100;
    }
    
    function calculateTipPerPerson(totalTip, numPeople){
      var total = totalTip/numPeople;
      return total;
    }
    
    function calculateTotalBillWithTip(totalBillWithoutTip, totalTip){
      var total = totalBillWithoutTip + totalTip;
      return total.toFixed(2);
    }
    
    function calculateTotalBillPerPerson(totalBillWithTip, numPeople){
      var total = totalBillWithTip/numPeople;
      return total.toFixed(2);
    }

    $scope.reset = function() {
      $scope.initialFormView = false;
      $scope.submitted = false;
      $scope.data.total = 0.00;
      $scope.data.splitNum = 1;
      $scope.slider.value = 15;
      $scope.calculate();
    }
  }
})();