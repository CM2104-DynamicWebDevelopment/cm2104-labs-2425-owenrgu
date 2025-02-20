$(document).ready(function() {
    $("#myTable tbody tr:even").addClass("table-dark");
    $("#myTable tbody tr:odd").addClass("table-light");

    // highlight hovered rows
    $("#myTable tbody tr").mouseenter(function () { 
        $(this).addClass("row-hover");
    });
    $("#myTable tbody tr").mouseleave(function () { 
        $(this).removeClass("row-hover");
    });

    $("#myTable").tablesorter();
});
