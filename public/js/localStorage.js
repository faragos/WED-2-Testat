(function(notesApp, $) {
    'use strict';
    notesApp.LocalStorage = (function () {

        return {
            getData: function (key) {
                var item = sessionStorage.getItem(key);
                if (!item) {
                    sessionStorage.setItem(key, JSON.stringify([]));
                }
                return JSON.parse(item);
            },
            setData: function (key, value) {
                sessionStorage.setItem(key, JSON.stringify(value));
            }
        }
    })();
}(window.notesApp = window.notesApp || {}, jQuery));