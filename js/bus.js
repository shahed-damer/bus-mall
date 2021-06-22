'use strict';



let imgSection =document.getElementById('imgSection');
let leftImage = document.getElementById('leftImage');
let centerImage = document.getElementById('centerImage');
let rightImage = document.getElementById('rightImage');
let results = document.getElementById('results');
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
let round =0;


ProdectImages.all =[];

for (let i = 0; i <  productImage.length; i++) {
   new ProdectImages(productImage[i].split('.')[0],productImage[i]);
}

let arry = [];

let rightIndex;
let centerIndex;
let leftIndex ;
function render(){


 
    leftIndex = randomNumber(0,productImage.length -1);

    centerIndex = randomNumber(0,productImage.length -1);

  rightIndex = randomNumber(0, productImage.length -1);
 while( leftIndex === centerIndex || rightIndex=== leftIndex || rightIndex === centerIndex || arry.includes(leftIndex ) || arry.includes(centerIndex) || arry.includes(rightIndex) ){
    leftIndex = randomNumber(0,productImage.length -1);

    centerIndex = randomNumber(0,productImage.length -1);

  rightIndex = randomNumber(0, productImage.length -1);
 }

rightImage.src =  ProdectImages.all[rightIndex].srcc;
leftImage.src =  ProdectImages.all[leftIndex].srcc;
centerImage.src =  ProdectImages.all[centerIndex].srcc;
arry=[];
arry.push(leftIndex);
arry.push(centerIndex);
arry.push(rightIndex);

console.log(arry)

ProdectImages.all[leftIndex].views++;
ProdectImages.all[centerIndex].views++;
ProdectImages.all[rightIndex].views++;





// console.log(ProdectImages.all);
}

function eventHandler(e) {

if((e.target.id === 'leftImage' || e.target.id === 'centerImage' || e.target.id === 'rightImage') && counter < 25){
    
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
//   storage();

} else  if(counter==25) { 
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





      function storage(){
          let datm = JSON.stringify( ProdectImages.all);
          localStorage.setItem('imgeestorage', datm)

      }

      function store(){
        ProdectImages.all= JSON.parse(localStorage.getItem('imgeestorage'))
        
        
      }
      store();