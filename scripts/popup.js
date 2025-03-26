const $tabs = $('.tab');
const $details = $('.details');
const $show = $('#show');
const $hide = $('#hide');

// Hide the details elements on page load
$details.hide();

// Accordion
$tabs.click(function(){
    /*
    if the user is clicking the tab for 
    details that is alraedy visible, slide it up
    */
    if( $(this).next().is(':visible') ){
        $(this).next().slideUp();  
        $hide.addClass('hidden');
        $show.removeClass('hidden');
    }else{
        //otherwise, close all details
        $details.slideUp();
        //and open the chosen details
        $(this).next().slideDown();
        $show.addClass('hidden');
        $hide.removeClass('hidden');
    }                   
});

