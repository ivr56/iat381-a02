

// $(function($) {
//     $(".knob").knob({
//         change : function (value) {
//             //console.log("change : " + value);
//         },
//         release : function (value) {
//             //console.log(this.$.attr('value'));
//             console.log("release : " + value);
//             globaldial.jam(value);
//             document.getElementById("userinpt").innerHTML=value;
//
//         },
//         cancel : function () {
//             console.log("cancel : ", this);
//         },
//         format : function (value) {
//
//
//
//             return '$' + value*2 ;
//         },
//         draw : function () {
//
//             // "tron" case
//             if(this.$.data('skin') == 'tron') {
//
//                 this.cursorExt = 0.3;
//
//                 var a = this.arc(this.cv)  // Arc
//                     , pa                   // Previous arc
//                     , r = 1;
//
//                 this.g.lineWidth = this.lineWidth;
//
//                 if (this.o.displayPrevious) {
//                     pa = this.arc(this.v);
//                     this.g.beginPath();
//                     this.g.strokeStyle = this.pColor;
//                     this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
//                     this.g.stroke();
//                 }
//
//                 this.g.beginPath();
//                 this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
//                 this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
//                 this.g.stroke();
//
//                 this.g.lineWidth = 2;
//                 this.g.beginPath();
//                 this.g.strokeStyle = this.o.fgColor;
//                 this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
//                 this.g.stroke();
//
//                 return false;
//             }
//         }
//     });
//
//
// });

// var America = 0;
// var Europe = 0;
// var China = 0;
// var currencyA;
// var currencyB;
// var displayCurrency;
// var amount;
//
//
// $scope.$on("messageUSDCHA", function (e, msg)
// {
//     console.log(1 + ": Currencies Active");
//     America = 1;
//     China = 1;
//     Europe = 0;
//     //Message Service to Control JQuerry + Javascript Windows
//     USDCHA();
//
// });
//
//
// function USDCHA($scope)
// {
//   If (currencyA == America  && currencyB == China){
//
//   displayCurrency == amount * 6.27;
//   displayCurrency = $scope.dispalyb;
//   }
//
//   If (currencyA == China  && currencyB == America){
//
//   displayCurrency == amount * 0.16;
//   displayCurrency = $scope.dispalya;
//   }
//
//
// }
//
// If (currencyA == America  && currencyB == Europe){
//
// displayCurrency == amount * 0.89;
//
// }
//
// If (currencyA == Europe  && currencyB == America){
//
// displayCurrency == amount * 1.12;
//
// }
//
// If (currencyA == Europe  && currencyB == China){
//
// displayCurrency == amount * 7;
//
// }
//
// If (currencyA == China  && currencyB == Europe){
//
// displayCurrency == amount * 0.14;
//
// }
//
// If (currencyA == China  && currencyB == China){
//
// displayCurrency == amount * 1;
//
// }
//
// If (currencyA == Europe  && currencyB == Europe){
//
// displayCurrency == amount * 1;
//
// }
//
// If (currencyA == America  && currencyB == America){
//
// displayCurrency == amount * 1;
//
// }
