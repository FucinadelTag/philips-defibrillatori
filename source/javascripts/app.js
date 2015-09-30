// $(document).ready(function() {
// var theFrame = $("#wufooIframe", parent.document.body);
// alert (theFrame.height());
// var newHeight = theFrame.height()+0;
// theFrame.height(newHeight);
// alert (theFrame.height());
// });

$(document).foundation();

moment.locale('it');
var lastDayOfMonth = moment().endOf('month').format("D\ MMMM");

$("span.dataPromo").html(lastDayOfMonth);

