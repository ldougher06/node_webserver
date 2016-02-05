console.log("im in main.js *********");

$( "#mouse" ).mouseover(function() {
  $( "#log" ).append( "<div>Handler for .mouseover() called.</div>" );
});
