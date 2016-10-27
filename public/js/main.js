(function(notesApp) {
    'use strict';

    $(function() {


        renderNotes();

/*
        function getNotes() {
            $.get("/notes", function (notes) {
                renderNotes(notes);
            });
        }
*/


        $(".sort").on("click", "input", renderNotes);
        $(".filter").on("click", "input", renderNotes);
        $(".theme").on("change", "select", notesApp.changeTheme);
        $("header").on("click", ".add-button", addNote);

        function addNote() {
            notesApp.LocalStorage.setData("noteId", -1);
            notesApp.redirect();
        }

        function compareFinishDate(d1, d2) {
            if (!Date.parse(d1.finishDate)) {
                return true;
            }
            if (!Date.parse(d2.finishDate)) {
                return false;
            }
            return new Date(d1.finishDate) < new Date(d2.finishDate);
        }

        function compareCreateDate(d1, d2) {
            return new Date(d1.createDate) < new Date(d2.createDate);
        }

        function compareImportance(i1, i2) {
            return i1.importance < i2.importance;
        }

        function sortNotes() {
            renderNotes();
        }

        function filterNotes() {
            if ($('#sort-by-finish-date:checked').length > 0) {
                notesApp.filterBy = "finished";
            }
            renderNotes();
        }

        function renderNotes() {
            if ($('#sort-by-finish-date:checked').length > 0) {
                notesApp.filterBy = "finished";
            }

            if ($('#sort-by-finish-date:checked').length > 0) {
                notesApp.sortBy = "finishDate";
            } else if ($('#sort-by-created-date:checked').length > 0) {
                notesApp.sortBy = "createDate";
            } else if ($('#sort-by-importance:checked').length > 0) {
                notesApp.sortBy = "importance";
            }

            $.post( "/notes",{sortBy: notesApp.sortBy, filterBy: notesApp.filterBy}).done(function( data ) {
                $(".content").html(data);
            });
        }

        notesApp.redirect = function redirect() {
            window.location= '/noteForm';
        };
    });
}(window.notesApp = window.notesApp || {}));