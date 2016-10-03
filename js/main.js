$(function() {
    Handlebars.registerHelper('times', function (n, block) {
        var accum = '';
        for (var i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    });


    var notes = [
        {
            id: '1',
            finished: true,
            title: 'Title Lorem Ipsum 1234',
            description: 'Lorem Ipsum 1234',
            createDate: '2014-01-02',
            lastName: 'Pan',
            age: 13,
            finishDate: '2014-02-02',
            importance: 2
        },
        {
            id: '2',
            finished: false,
            title: 'Title Lorem Ipsum 12345684654',
            description: 'Lorem Ipsum 12345684654',
            createDate: '2015-02-02',
            lastName: 'Hook',
            age: 17,
            importance: 1
        },
        {
            id: '3',
            finished: false,
            title: 'Title Lorem Ipsum 12345684654',
            description: 'Loremdfdsf Ipsum 12345684654',
            createDate: '2015-08-02',
            lastName: 'dfdsfdsf',
            age: 35,
            importance: 3
        }
    ];

    var savedNotes = sessionStorage.getItem("notes");
    if( !savedNotes )
    {
        sessionStorage.setItem("notes", JSON.stringify(notes));
        savedNotes = sessionStorage.getItem("notes");
    }
    savedNotes = JSON.parse(savedNotes);

    var currentNotes = savedNotes;


    var notesTemplateText = $('#notesTemplateText').html();
    var createNotesHtml = Handlebars.compile(notesTemplateText);

    renderNotes();

    /*$.each(notes, function (index, note){

     })*/


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


    $(function () {
        $(".sort").on("click", "input", sortNotes);
        $(".filter").on("click", "input", filterNotes);
    });

    function filterNotes() {
        if ($('#filter-by-finished:checked').length > 0) {
            currentNotes = $.grep(notes, function (note) {
                return note.finished === true;
            });
        } else {
            currentNotes = notes;
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