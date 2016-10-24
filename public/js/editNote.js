(function(notesApp) {
    $(function() {
        (function loadNote(){
            if (notesApp.LocalStorage.getData('noteId') > -1) {
                var note = notesApp.TodoService.getNote(notesApp.LocalStorage.getData('noteId'))
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

        notesApp.save = function save(event) {
            var note = {};
            if (notesApp.LocalStorage.getData('noteId') > -1) {
                note = notesApp.TodoService.getNote(notesApp.LocalStorage.getData('noteId'))
            }
            note['finished'] = false;
            $.each($('#noteForm').serializeArray(), function (i, field) {
                note[field.name] = field.value;
            });

            if (notesApp.LocalStorage.getData('noteId') > -1) {
                notesApp.TodoService.updateNote(note);
            } else {
                notesApp.TodoService.addNote(note);
            }

            notesApp.redirect();

            return false;
        };

        notesApp.redirect = function redirect() {
            window.location.replace("../index.html")
        };

        $(".cancel").on("click", notesApp.redirect);
    });
}(window.notesApp = window.notesApp || {}));


