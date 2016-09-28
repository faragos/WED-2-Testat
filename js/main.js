
Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});


var notes = [
    {id:'1', finished:true, title:'Title Lorem Ipsum 1234', description:'Lorem Ipsum 1234', createDate:'2014-01-02', lastName: 'Pan', age:13, finishDate:'2014-02-02', importance:2},
    {id:'2', finished:false, title:'Title Lorem Ipsum 12345684654', description:'Lorem Ipsum 12345684654', createDate:'2015-02-02', lastName:'Hook', age:35, importance:1}
];


var notesTemplateText = $('#notesTemplateText').html();
var createNotesHtml = Handlebars.compile(notesTemplateText);

/*$.each(notes, function (index, note){

})*/
var createNotesHtml = Handlebars.compile(notesTemplateText);


function compareFinishDate(d1, d2) {
    if(!Date.parse(d1.finishDate)){
        return true;
    }
    if(!Date.parse(d2.finishDate)){
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

renderNotes();

$(function() {
    $(".sort").on("click", "input", renderNotes);
    $(".filter").on("click", "input", renderNotes);
});

function renderNotes () {
    var filtered_notes = notes;
    if ($('#filter-by-finished:checked').length > 0) {
        filtered_notes = $.grep(notes, function (note) {
            return note.finished === true;
        });
    }

    var filtered_sorted_notes;

    if($('#sort-by-finish-date:checked').length > 0) {
        filtered_sorted_notes = filtered_notes.sort(compareFinishDate);
    } else if ($('#sort-by-created-date:checked').length > 0) {
        filtered_sorted_notes = filtered_notes.sort(compareCreateDate);
    } else if ($('#sort-by-importance:checked').length > 0) {
        filtered_sorted_notes = filtered_notes.sort(compareImportance);
    }
    $(".content").html(createNotesHtml(filtered_sorted_notes));
}