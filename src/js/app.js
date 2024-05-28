


//selecting the elements from the dom
const selectElement = document.querySelector('.format');
const isbn = document.querySelector('.isbn');
const narrator = document.querySelector('.narrator');





// Adding all the event listeners
selectElement.addEventListener('change', ()=>{
    if(selectElement.value === 'physical'){
        narrator.setAttribute('disabled', '');
        isbn.removeAttribute('disabled');
    } else{
        isbn.setAttribute('disabled', '');
        narrator.removeAttribute('disabled'); 
    }
})