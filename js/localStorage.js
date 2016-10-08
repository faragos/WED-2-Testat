var LocalStorage = (function () {

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

    function getHighestId() {
        var notes = LocalStorage.getNotes();
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
            var notes = sessionStorage.getItem("notes");
            if( !notes )
            {
                sessionStorage.setItem("notes", JSON.stringify(dummyNotes));
                notes = sessionStorage.getItem("notes");
            }
            return JSON.parse(notes);
        },
        getData: function(key) {
            var item = sessionStorage.getItem(key);
            if( !item )
            {
                sessionStorage.setItem(key, JSON.stringify([]));
            }
            return JSON.parse(item);
        },
        setNotes: function(notes) {
            sessionStorage.setItem("notes", JSON.stringify(notes));
        },
        addNote: function(note) {
            note["id"] = Number(getHighestId()) + 1;
            note["createDate"] = new Date();
            var notes = LocalStorage.getNotes();
            notes.push(note);
            LocalStorage.setNotes(notes);
        }
    }
})();