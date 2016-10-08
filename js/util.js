/**
 * Created by farag on 08.10.2016.
 */


function changeTheme() {
    var themeName = $('.theme select').val()
    var cssId = 'night-theme';
    if (themeName == 'night-theme' && !document.getElementById(cssId)) {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = cssId;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = 'css/night-theme.css';
        link.media = 'all';
        head.appendChild(link);
    }
    if (themeName == 'classic-theme' && document.getElementById(cssId)) {
        document.getElementsByTagName('head')[0].removeChild(document.getElementById(cssId));
    }
}
