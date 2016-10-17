(function(notesApp) {
    'use strict'

    $(function() {
        Handlebars.registerHelper('times', function (n, block) {
            var accum = '';
            for (var i = 0; i < n; ++i)
                accum += block.fn(i);
            return accum;
        });

        Handlebars.registerHelper("formatDate", function (datetime) {
            if (moment) {
                // can use other formats like 'lll' too
                moment.locale('de');
                return moment(datetime).format('LL');
            }
            else {
                return datetime;
            }
        });

        notesApp.currentNotes = notesApp.TodoService.getNotes();


        var notesTemplateText = $('#notesTemplateText').html();
        var createNotesHtml = Handlebars.compile(notesTemplateText);

        renderNotes();

        $(".sort").on("click", "input", sortNotes);
        $(".filter").on("click", "input", filterNotes);
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

        function filterNotes() {
            if ($('#filter-by-finished:checked').length > 0) {
                notesApp.currentNotes = $.grep(notesApp.TodoService.getNotes(), function (note) {
                    return note.finished === true;
                });
            } else {
                notesApp.currentNotes = notesApp.TodoService.getNotes();
            }

            $(".content").html(createNotesHtml(notesApp.currentNotes));
        }

        function sortNotes() {
            if ($('#sort-by-finish-date:checked').length > 0) {
                notesApp.currentNotes = notesApp.currentNotes.sort(compareFinishDate);
            } else if ($('#sort-by-created-date:checked').length > 0) {
                notesApp.currentNotes = notesApp.currentNotes.sort(compareCreateDate);
            } else if ($('#sort-by-importance:checked').length > 0) {
                notesApp.currentNotes = notesApp.currentNotes.sort(compareImportance);
            }
            $(".content").html(createNotesHtml(notesApp.currentNotes));
        }

        function renderNotes() {
            filterNotes();
            sortNotes();
        }

        notesApp.redirect = function redirect() {
            window.location= '../html/noteForm.html';
        };

        notesApp.editNote = function editNote(id) {
            notesApp.LocalStorage.setData("noteId", id);
            notesApp.redirect();
        };
    });
}(window.notesApp = window.notesApp || {}));