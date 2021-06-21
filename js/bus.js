'use strict';



let imgSection =document.getElementById('imgSection');
let leftImage = document.getElementById('leftImage');
let centerImage = document.getElementById('centerImage');
let rightImage = document.getElementById('rightImage');
let list1 = document.getElementById('list1');
let viewResults = document.getElementById('viewResults');

function ProdectImages(product , srcc){
    this.product = product ;
    this.srcc = `./assets/${srcc}`;
    this.views = 0;
    this.click = 0;
    ProdectImages.all.push(this);
}

ProdectImages.all = [];

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
let round =25;


ProdectImages.all =[];

for (let i = 0; i <  productImage.length; i++) {
   new ProdectImages(productImage[i].split('.')[0],productImage[i]);
}


let rightIndex;
let centerIndex;
let leftIndex ;
function render(){
    let index1,index2,index3

    index1 = randomNumber(0,productImage.length -1);
    if( index1==rightIndex){
        index1 = randomNumber(0,productImage.length -1);

    }

do {
    index2 = randomNumber(0,productImage.length -1);
    if( index2==centerIndex){
        index2 = randomNumber(0,productImage.length -1);

    }

  index3 = randomNumber(0, productImage.length -1);
  if( index3==leftIndex){
    index3 = randomNumber(0,productImage.length -1);

}

} while( index1 === index2 || index3=== index1 || index3 === index2 );

rightImage.src =  ProdectImages.all[index3].srcc;
leftImage.src =  ProdectImages.all[index1].srcc;
centerImage.src =  ProdectImages.all[index2].srcc;


ProdectImages.all[index1].views++;
ProdectImages.all[index2].views++;
ProdectImages.all[index3].views++;

leftIndex=index3;
centerIndex=index2;
rightIndex=index1;





console.log(ProdectImages.all);
}

function eventHandler(e) {

if((e.target.id === 'leftImage' || e.target.id === 'centerImage' || e.target.id === 'rightImage') && counter < round){
    
    if (e.target.id ==='leftImage' ){ 
        
ProdectImages.all[leftIndex].click++;




    }

    if (e.target.id ==='centerImage'){

        ProdectImages.all[centerIndex].click++;
    }

    if (e.target.id ==='rightImage'){

ProdectImages.all[rightIndex].click++;

    }
  render();
  counter++;


} else  if(counter==round) { 
    viewResults.disabled=false
    imgSection.removeEventListener('clcik',eventHandler);
    bottomChart();
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

function bottomChart(){
let prodect=[];
let vieww=[];
let clickss=[];

for (let i = 0; i< ProdectImages.all.length; i++) {
  prodect.push(ProdectImages.all[i].product);
  vieww.push(ProdectImages.all[i].views);
  clickss.push(ProdectImages.all[i].click);
    }

let ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: prodect,
        datasets: [{
            label: '# of Votes',
            data: vieww,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },{
            label: '# of click',
            data: clickss,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
        
},
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}
