$(function() {
    $(".edit-note").on("click", ".cancel", redirect);

    (function loadNote(){
        if (LocalStorage.getData('noteId') > -1) {
            var note = TodoService.getNote(LocalStorage.getData('noteId'))
        }
        if (note) {
            $.each(note, function(name, val){
                var $el = $('[name="'+name+'"]'),
                    type = $el.attr('type');

                switch(type){
                    case 'checkbox':
                        $el.attr('checked', 'checked');
                        break;
                    case 'radio':
                        $el.filter('[value="'+val+'"]').attr('checked', 'checked');
                        break;
                    default:
                        $el.val(val);
                }
            });
        }
    }());
});

function save(event) {
    var note = {}
    if (LocalStorage.getData('noteId') > -1) {
        note = TodoService.getNote(LocalStorage.getData('noteId'))
    }
    note['finished'] = false;
    $.each($('#noteForm').serializeArray(), function (i, field) {
        note[field.name] = field.value;
    });

    if (LocalStorage.getData('noteId') > -1) {
        TodoService.updateNote(note);
    } else {
        TodoService.addNote(note);
    }

    redirect();

    return false;
}

function redirect() {
    window.location.replace("../index.html")
}