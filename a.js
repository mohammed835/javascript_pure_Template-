// random background option 
let backgroundOption = true ;
// variable  to control the Interval
let backgroundInterval;

// check there is --main-color in localStroge 
let mainColor = window.localStorage.getItem('color_option');
if (mainColor !== null){
    document.documentElement.style.setProperty('--main--color',mainColor);

    // remove active class from all colors list
    document.querySelectorAll('.colors-list li').forEach(function(ele){
        ele.classList.remove('active');

        // add active class to active with data color 
        if (ele.dataset.color === mainColor){
        ele.classList.add('active');
    }
    });  
}

// check is there localStroge in background 
let backgroundLocalItem = localStorage.getItem('background-option');

// check there is background-option is empty or no 
if (backgroundLocalItem !== 'null'){
    if (backgroundLocalItem === 'true'){
        backgroundOption = true;
        randomizeImg();
    }else{
        backgroundOption = false;
    }
    document.querySelectorAll('.option-box span').forEach(function(ele){
        ele.classList.remove('active');

    });
    if(backgroundLocalItem === 'true'){
        document.querySelector('.option-box .yes').classList.add('active');

    }else {
        document.querySelector('.option-box .no').classList.add('active');
    }
    console.log(backgroundLocalItem);
    console.log(typeof backgroundLocalItem);
}


// get langing page 
let mylandinPage = document.querySelector('.landin-page');
console.log(mylandinPage.parentElement);

// get array image 
let imgArray = ['pizza-4952509_1920.jpg','6.jpg','5.jpg','1.jpg','8.jpg','9.jpg'];

// function to randomize images
function randomizeImg(){
    if(backgroundOption === true){
        backgroundInterval = setInterval(function(){
            //get random number
            let randomNumber = Math.floor(Math.random() * imgArray.length);
        
            // change your background
            mylandinPage.style.backgroundImage= 'url("imags/pizza/'+imgArray[randomNumber]+'")';
        },1000)
    }
}
// settings box 
let myImg = document.getElementById('img');
let mysettingsBox = document.querySelector('.settings-box');
// switch stats which belong to settingsBox
myImg.onclick = function (){
    mysettingsBox.classList.toggle('open')
}

// switch colors 

let mylis = document.querySelectorAll('.colors-list li');

mylis.forEach(function(li){
    li.addEventListener('click',function(e){

        //set color in root 
        document.documentElement.style.setProperty('--main--color',e.target.dataset.color);

        // set color in localStroge
        window.localStorage.setItem('color_option',e.target.dataset.color);

        // remove active class in all childern 
        e.target.parentElement.querySelectorAll('.active').forEach(function(ele){
            ele.classList.remove('active');
            console.log(ele);
        });

        // add active class 
        e.target.classList.add('active');
    });

});
// switch background  

let myBackgroundEl = document.querySelectorAll('.option-box span');
myBackgroundEl.forEach(function(span){
    span.addEventListener('click',function(e){

        // remove active class in all childern 
        e.target.parentElement.querySelectorAll('.active').forEach(function(ele){

            ele.classList.remove('active');
        });

        // add active class 
        e.target.classList.add('active');

        // stop randomiz the background or No 
        if(e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImg();
            localStorage.setItem('background-option',true);

            
        }else {  
            backgroundOption = false;
            clearInterval(backgroundInterval); 
            localStorage.setItem('background-option',false);
  
        }
    });

})

// #FFDAB9 20B2AA #FFC0CB #FF1493 #2F4F4F

/* run animation  about the opinions of our customer in pizza  */

// select the skills 
let mySkills = document.querySelector('.skills');

mySkills,onscroll = function (){
    // skills off set Top
    let skillsOfset = mySkills.offsetTop;

    // outer height 
    let skillsOuterHeight = mySkills.offsetHeight;

    // select window height 
    let windoWHeight = this.innerHeight;

    // window scroll top 
    let windoScroll = this.pageYOffset;



    if (windoScroll > (skillsOfset + skillsOuterHeight - windoWHeight)){
        //select all spans 
        let myspans = this.document.querySelectorAll('.skill-progress span');
        myspans.forEach(function(span){
            span.style.width = span.dataset.progress;
        })
    }
}

// create popup with the image
// get img and put them in array 
let imags = Array.from(document.querySelectorAll('.slider-container img'));
// get number of images 
let slidecount = imags.length;

// set current slide 
var currentSlide = 1;

// slide number element 
let slideNumberElement = document.querySelector('.slide-number');

// get prev and next button 
let prevButton = document.getElementById('prev');
let nextButton = document.getElementById('next');

// handel click to next or prev buttons 
nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;



// create the ul element 
let paginationElement = document.createElement('ul');

// set id to paginationElement 
paginationElement.setAttribute('id','pagination-id');
// create list item based in slide 
for(let i = 1 ; i <= slidecount ; i++){
    // create li 
    let paginationItem= document.createElement('li');

    // set data currentSlide 
    paginationItem.setAttribute('data-currentSlide' , i);

    // append text node to paginationItem
    paginationItem.appendChild(document.createTextNode(i));

    // append items to the main ul 
    paginationElement.appendChild(paginationItem);
}
document.getElementById('indicators').appendChild(paginationElement);

// get created ul 
let createdUl = document.getElementById('pagination-id');

// get img and put them in array 
let paginationBulttes = Array.from(document.querySelectorAll('#pagination-id li'));

// loop throgh all bulltes
for (let i = 0 ; i <paginationBulttes.length ;i++){
    paginationBulttes[i].onclick = function (){
        currentSlide = parseInt(this.getAttribute('data-currentSlide')) ;
        theChecker();
        imags[currentSlide-1].classList.add('active');
    }

}

// trrier function
theChecker();

// function next 
function nextSlide(){

    if (nextButton.classList.contains('disabled')){
        return false ;
    }else{
        currentSlide++;
        theChecker();  
    }
}

// function prev
function prevSlide(){
    if(prevButton.classList.contains('disabled')){
        return false;
    }else{
        currentSlide--;
        theChecker();
    }
}

// create the checker function 
function theChecker(){
    // set the slide Number Element
    slideNumberElement.innerHTML = 'slide #' + currentSlide +' of ' + slidecount;

    // remove all active class 
    removeAllactive();

    // set class active on current slider 
    imags[currentSlide -1].classList.add('active');

    // set class active to pagination ul
    createdUl.children[currentSlide-1].classList.add('active');

    // check if current slide is first 
    if (currentSlide == 1){
        // add class disabled to prev button
        prevButton.classList.add('disabled');
    }else {
        // remove class disabled to prev button
        prevButton.classList.remove('disabled');
    }
    // check if current slide is last 
    if (currentSlide == slidecount){
        // add class disabled to next button
        nextButton.classList.add('disabled');
    }else {
        // remove class disabled to next button
        nextButton.classList.remove('disabled');
    }

    
}

// remove all active class from images 
function removeAllactive(){
    // remove all active class from images 
   imags.forEach(function(img){
    img.classList.remove('active');
   });
}

// remove all active class from images 
function removeAllactive(){

   //remove all active class from images 
   imags.forEach(function(img){

    img.classList.remove('active');

   });

   // remove all active class from images 
   paginationBulttes.forEach(function(bullt){
    bullt.classList.remove('active');
   });
}

// header area 
let allsection = document.querySelectorAll('.header-area li');
allsection.forEach(function(li){
    li.addEventListener('click',function(e){
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior :'smooth',
        })
    })

})

// reset-option
document.querySelector('.reset-option').onclick = function (){
    localStorage.clear();
    localStorage.removeItem('color_option');
    localStorage.removeItem('background-option');
}

// scroll to top 
document.querySelector('.up').addEventListener('click',function(e){
    document.querySelector('.'+ e.target.dataset.up).scrollIntoView({
        behavior : 'smooth'
    })
    
})