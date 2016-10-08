$(function() {
    'use strict'
    Handlebars.registerHelper('times', function (n, block) {
        var accum = '';
        for (var i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    });

    Handlebars.registerHelper("formatDate", function(datetime) {
        if (moment) {
            // can use other formats like 'lll' too
            moment.locale('de');
            return moment(datetime).format('LL');
        }
        else {
            return datetime;
        }
    });

    function editNote(id) {
        console.log(id);
    }

    var currentNotes = LocalStorage.getNotes();


    var notesTemplateText = $('#notesTemplateText').html();
    var createNotesHtml = Handlebars.compile(notesTemplateText);

    renderNotes();


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


    $(".sort").on("click", "input", sortNotes);
    $(".filter").on("click", "input", filterNotes);
    $(".theme").on("change", "select", changeTheme);

    function filterNotes() {
        if ($('#filter-by-finished:checked').length > 0) {
            currentNotes = $.grep(LocalStorage.getNotes(), function (note) {
                return note.finished === true;
            });
        } else {
            currentNotes = LocalStorage.getNotes();
        }

        $(".content").html(createNotesHtml(currentNotes));
    }

    function sortNotes() {
        if ($('#sort-by-finish-date:checked').length > 0) {
            currentNotes = currentNotes.sort(compareFinishDate);
        } else if ($('#sort-by-created-date:checked').length > 0) {
            currentNotes = currentNotes.sort(compareCreateDate);
        } else if ($('#sort-by-importance:checked').length > 0) {
            currentNotes = currentNotes.sort(compareImportance);
        }
        $(".content").html(createNotesHtml(currentNotes));
    }


    function renderNotes() {
        filterNotes();
        sortNotes();
    }
});
