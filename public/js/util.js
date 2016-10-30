(function(notesApp, $) {
    'use strict';
    notesApp.changeTheme = function changeTheme() {
        var themeName = $('.theme select').val();
        var cssId = 'night-theme';
        if (themeName == 'night-theme') {
            addNightTheme();
            notesApp.LocalStorage.setData('themeName', 'night-theme');
        }
        if (themeName == 'classic-theme' && document.getElementById(cssId)) {
            document.getElementsByTagName('head')[0].removeChild(document.getElementById(cssId));
            notesApp.LocalStorage.setData('themeName', 'classic-theme');
        }
    };

    notesApp.loadTheme = function loadTheme() {
        var themeName = notesApp.LocalStorage.getData('themeName');
        if (themeName == 'night-theme') {
            $('.theme select').val(themeName);
            addNightTheme();
        }
    };


  function addNightTheme() {
        var cssId = 'night-theme';
        if (!document.getElementById(cssId)) {
            var head  = document.getElementsByTagName('head')[0];
            var link  = document.createElement('link');
            link.id   = cssId;
            link.rel  = 'stylesheet';
            link.type = 'text/css';
            link.href = '../css/night-theme.css';
            link.media = 'all';
            head.appendChild(link);
        }
    }

    $(function() {
        notesApp.loadTheme();
    });

}(window.notesApp = window.notesApp || {}, jQuery));