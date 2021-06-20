'use strict';



let imgSection =document.getElementById('imgSection');
let leftImage = document.getElementById('leftImage');
let centerImage = document.getElementById('centerImage');
let rightImage = document.getElementById('rightImage');
let list1 = document.getElementById('list1');



let productImage = ['bag.jpg', 'banana.jpg','bathroom.jpg','boots.jpg',
'breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg',
'dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg',
'shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif' , 'water-can.jpg' ,'wine-glass.jpg'];




function randomNumber( min, max ) {
    min = Math.ceil( min );
    max = Math.floor( max );
    return Math.floor( Math.random() * ( max - min + 1 ) + min ); 
    }
    

let counter = 0;

function ProdectImages(product , srcc){
    this.product = product ;
    this.srcc = `./assets/${srcc}`;
    this.views = 0;
    this.click = 0;
    ProdectImages.all.push(this);
}

ProdectImages.all =[];

for (let i = 0; i <  productImage.length; i++) {
   new ProdectImages(productImage[i].split('.')[0],productImage[i]);
}


let rightIndex;
let centerIndex;
function render(){

let leftIndex = randomNumber(0,productImage.length -1);


do {
    centerIndex = randomNumber(0,productImage.length -1);

  rightIndex = randomNumber(0, productImage.length -1);
} while( leftIndex === centerIndex || rightIndex=== leftIndex || rightIndex === centerIndex );

rightImage.src =  ProdectImages.all[rightIndex].srcc;
leftImage.src =  ProdectImages.all[leftIndex].srcc;
centerImage.src =  ProdectImages.all[centerIndex].srcc;


ProdectImages.all[leftIndex].views++;
ProdectImages.all[centerIndex].views++;
ProdectImages.all[rightIndex].views++;


ProdectImages.all[leftIndex].click++;
ProdectImages.all[centerIndex].click++;
ProdectImages.all[rightIndex].click++;



console.log(ProdectImages.all);
}

function eventHandler(e) {

if((e.target.id === 'leftImage' || e.target.id === 'centerImage' || e.target.id === 'rightImage') && counter < 25){
  render();
  console.log(counter);
  counter++;

}

}

imgSection.addEventListener('click', eventHandler);

render();


function view(){


    let cont = document.getElementById('results')

    let list = document.createElement('ul');
    cont.appendChild(list);
    for (let i = 0; i < productImage.length; i++) {
        let list1 = document.createElement('li');
        list.appendChild(list1);

    list1.textContent=(`${productImage[i].split('.')[0]} had ${ ProdectImages.all[i].click}  votes, and was seen ${ ProdectImages.all[i].views} times.`)

        
    }
}



