const $tabs = $('.tab');
const $details = $('.details');
const $show = $('#show');
const $hide = $('#hide');


let isOpen = localStorage.getItem('accordionOpen');

if (isOpen === null) {
    console.log('nothing in local storage, setting to true')
    isOpen = 'true';
    localStorage.setItem('accordionOpen', isOpen);
}
if (isOpen === 'true') {
$details.show();
  $show.addClass('hidden');
  $hide.removeClass('hidden');
} else {
  $details.hide();
  $hide.addClass('hidden');
  $show.removeClass('hidden');

}


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
        localStorage.setItem('accordionOpen', 'false');
    }else{
        //otherwise, close all details
        $details.slideUp();
        //and open the chosen details
        $(this).next().slideDown();
        $show.addClass('hidden');
        $hide.removeClass('hidden');
        localStorage.setItem('accordionOpen', 'true');
    }                   
});



