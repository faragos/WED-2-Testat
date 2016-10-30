(function(notesApp, $) {
    'use strict';

    $(function() {


        renderNotes();


        $(".sort").on("click", "input", renderNotes);
        $(".filter").on("click", "input", renderNotes);
        $(".theme").on("change", "select", notesApp.changeTheme);
        $("header").on("click", ".addButton", addNote);

        function addNote() {
            notesApp.redirect();
        }

        function sortNotes() {
            renderNotes();
        }


        function renderNotes() {
            if ($('#filterByFinished:checked').length > 0) {
                notesApp.filterBy = "finished";
            } else {
                notesApp.filterBy = null;
            }

            if ($('#sortByFinishDate:checked').length > 0) {
                notesApp.sortBy = "finishDate";
            } else if ($('#sortByCreatedDate:checked').length > 0) {
                notesApp.sortBy = "createDate";
            } else if ($('#sortByImportance:checked').length > 0) {
                notesApp.sortBy = "importance";
            }

            $.post( "/notes",{sortBy: notesApp.sortBy, filterBy: notesApp.filterBy}).done(function( data ) {
                $("main").html(data);
            });
        }

        notesApp.redirect = function redirect() {
            window.location= '/noteForm';
        };
    });
}(window.notesApp = window.notesApp || {}, jQuery));