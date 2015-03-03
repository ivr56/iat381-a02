var America = 0;
var Europe = 0;
var China = 0;
var currencyA;
var currencyB;
var displayCurrency;
var amount;


$scope.$on("messageUSDCHA", function (e, msg)
{
    console.log(1 + ": Currencies Active");
    America = 1;
    China = 1;
    Europe = 0;
    //Message Service to Control JQuerry + Javascript Windows
    USDCHA();

});


function USDCHA($scope)
{
  If (currencyA == America  && currencyB == China){

  displayCurrency == amount * 6.27;
  displayCurrency = $scope.dispalyb;
  }

  If (currencyA == China  && currencyB == America){

  displayCurrency == amount * 0.16;
  displayCurrency = $scope.dispalya;
  }


}

If (currencyA == America  && currencyB == Europe){

displayCurrency == amount * 0.89;

}

If (currencyA == Europe  && currencyB == America){

displayCurrency == amount * 1.12;

}

If (currencyA == Europe  && currencyB == China){

displayCurrency == amount * 7;

}

If (currencyA == China  && currencyB == Europe){

displayCurrency == amount * 0.14;

}

If (currencyA == China  && currencyB == China){

displayCurrency == amount * 1;

}

If (currencyA == Europe  && currencyB == Europe){

displayCurrency == amount * 1;

}

If (currencyA == America  && currencyB == America){

displayCurrency == amount * 1;

}
