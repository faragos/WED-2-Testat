$(function() {
   
    function save() {
        alert("funct");
        redirect();
    }

    function redirect() {
        window.location= "../index.html";
    }


    $(".edit-note").on("click", ".save", save);
    $(".edit-note").on("click", ".cancel", redirect);
    
});