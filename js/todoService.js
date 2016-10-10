var TodoService = (function () {
    var dummyNotes = [
        {
            id: '1',
            finished: true,
            title: 'Title Lorem Ipsum 1234',
            description: 'Lorem Ipsum 1234',
            createDate: '2014-01-02',
            finishDate: '2014-02-02',
            importance: 2
        },
        {
            id: '2',
            finished: true,
            title: 'Title Lorem Ipsum 12345684654',
            description: 'Lorem Ipsum 12345684654',
            createDate: '2015-02-02',
            finishDate: '2014-04-02',
            importance: 1
        },
        {
            id: '3',
            finished: true,
            title: 'Title Lorem Ipsum 12345684654',
            description: 'Loremdfdsf Ipsum 12345684654',
            createDate: '2015-08-02',
            finishDate: '2016-02-02',
            importance: 3
        }
    ];

    function getHighestNotesId() {
        var notes = TodoService.getNotes();
        var highestId = 0;
        $.each(notes, function (index, note){
            if(note.id > highestId) {
                highestId = note.id;
            }
        });
        return highestId;
    }


    return {
        getNotes: function() {
            var notes = LocalStorage.getData("notes");
            if( !notes )
            {
                LocalStorage.setData("notes", JSON.stringify(dummyNotes));
                notes = LocalStorage.getData("notes");
            }
            console.log(JSON.parse(notes));
            return JSON.parse(notes);
        },
        setNotes: function(notes) {
            LocalStorage.setData("notes", JSON.stringify(notes));
        },
        addNote: function(note) {
            note["id"] = Number(getHighestNotesId()) + 1;
            note["createDate"] = new Date();
            var notes = TodoService.getNotes();
            notes.push(note);
            TodoService.setNotes(notes);
        },
        updateNote: function(note) {
            var notes = TodoService.getNotes();
            for (var i = 0; i < notes.length; i++) {
                if(LocalStorage.getData('noteId') === Number(notes[i].id)){
                    notes[i] = note;
                    break;
                }
            }
            TodoService.setNotes(notes);
        },
        getNote: function(id) {
            var notes = TodoService.getNotes();
            for (var i = 0; i < notes.length; i++) {
                if(LocalStorage.getData('noteId') === Number(notes[i].id)){
                    return notes[i];
                }
            }
            return {};
        }
    }
})();