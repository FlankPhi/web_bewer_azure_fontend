var showing = false;
function myFunction(x) {
    x.classList.toggle("change");
    document.getElementById("hambuger_cont").classList.toggle("show");
}
function el_sel(go_to, rs) {
    switch (go_to){
        case 0:
            window.location='/';
            break;
        case 1:
            window.location =  '/Robot_configuration?rs=' + rs;
            break;
        case 2:
            window.location =  '/testOrderGUI?ID=' + rs;
            break;
        case 3:
            window.location =  '/diag_conole?ID=' + rs + '&task=Observing';
            break;

    }

}