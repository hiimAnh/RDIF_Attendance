$(function() {
  var oTable = $('#datatable').DataTable({
    "oDisplayLength": -1,
    "oPaginationType": "full_numbers"
  }
  );
  
  $("button").click(function(){
    $("#datatable").table2excel({
      // exclude CSS class
      name: "Worksheet Name",
      filename: "SomeFile", //do not include extension
      fileext: ".xls" // file extension
    }); 
  });

  $("#datepicker_from").datepicker({
    showOn: "button",
    buttonImage: "image/from.png",
    buttonImageOnly: false,
    "onSelect": function(date) {
      minDateFilter = new Date(date).getTime();
      oTable.fnDraw();
    }
  }).keyup(function() {
    minDateFilter = new Date(this.value).getTime();
    oTable.fnDraw();
  });

  $("#datepicker_to").datepicker({
    showOn: "button",
    buttonImage: "image/to.png",
    buttonImageOnly: false,
    "onSelect": function(date) {
      maxDateFilter = new Date(date).getTime();
      oTable.fnDraw();
    }
  }).keyup(function() {
    maxDateFilter = new Date(this.value).getTime();
    oTable.fnDraw();
  });

});

// Date range filter
minDateFilter = "";
maxDateFilter = "";

$.fn.dataTableExt.afnFiltering.push(
  function(oSettings, aData, iDataIndex) {
    if (typeof aData._date == 'undefined') {
      aData._date = new Date(aData[1]).getTime();
    }

    if (minDateFilter && !isNaN(minDateFilter)) {
      if (aData._date < minDateFilter) {
        return false;
      }
    }

    if (maxDateFilter && !isNaN(maxDateFilter)) {
      if (aData._date > maxDateFilter) {
        return false;
      }
    }

    return true;
  }
);