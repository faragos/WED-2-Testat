(function(notesApp) {
    $(function() {

        notesApp.redirect = function redirect() {
            window.location= '/';
        };

        $(".cancel").on("click", notesApp.redirect);
    });
}(window.notesApp = window.notesApp || {}));


