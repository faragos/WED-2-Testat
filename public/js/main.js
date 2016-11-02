(function (notesApp, $) {
    "use strict";

    $(function () {
        $(".sort").on("click", "input", renderNotes);
        $(".filter").on("click", "input", renderNotes);
        $(".theme").on("change", "select", notesApp.changeTheme);
        $("header").on("click", ".addButton", addNote);

        function addNote() {
            notesApp.redirect();
        }

        function renderNotes() {
            if ($('#filterByFinished:checked').length > 0) {
                notesApp.filterBy = null;
            } else {
                notesApp.filterBy = {finished: false};
            }

            if ($('#sortByFinishDate:checked').length > 0) {
                notesApp.sortBy = {finishDate: -1};
            } else if ($('#sortByCreatedDate:checked').length > 0) {
                notesApp.sortBy = {createDate: -1};
            } else if ($('#sortByImportance:checked').length > 0) {
                notesApp.sortBy = {importance: -1};
            }

            $.post( "/notes", {sortBy: JSON.stringify(notesApp.sortBy), filterBy: JSON.stringify(notesApp.filterBy)}).done(function (data) {

                $("main").html(data);
            });
        }

        renderNotes();


        notesApp.redirect = function redirect() {
            window.location = '/noteForm';
        };
    });
}(window.notesApp = window.notesApp || {}, jQuery));