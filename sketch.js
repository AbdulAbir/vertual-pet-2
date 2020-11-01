//Create variables here
var dog;
var foodS;
var dogImg;
var dogImg1;
var foodStock;
var fedTime;
var lastFed;
var foodObj;
var feed;
var addFood;

function preload()
{
dogImg = loadImage("dogImg.png");
dogImg1 = loadImage("dogImg1.png")
}

function setup()
{
    database=firebase.database();
    createCanvas(1200,100);
    dog = createSprite(250,300,10,10);
    dog.addImage(dogImg);
    
    dog.scale = 0.15;

    // foodStock=database.ref('Food');
    // foodStock.on("value",readStock);

    fedTime=database.ref('FeedTime')  
    fedTime.on("value",function(data) {
        lastFed=data.val();
    })

    foodObj = new food();

    feed=createButton("Feed the dog");
    feed.position(700,95);
    feed.mousePressed(feedDog);
    addFood=createButton("Add Food");
    addFood.position(800,95);
    addFood.mousePressed(addFoods());

}

function draw()
{
    background(46, 139, 87);
   
    drawSprites();

    fill(255,255,254);
    textSize(15);
    if(lastFed>=12)
    {
        text("Last Feed :"+ lastFed%12 + "PM",350,30);
    }else if(lastFed==0)
    {
        text("Last Feed : 12 AM",350,30);
    }else
    {
        text("Last Feed :"+lastFed + "AM", 350, 30);
    }
   
    // text("Remaining Food :" +foodStock ,180,200)


}

function readStock(data) { 
    // foodS=data.val();
    foodStock=data.val();    
}

function writeStock(x)
{
  if (x<=0) 
  {
      x = 0;
  }else
  {
      x = x-1;
  }
  database.ref('/').update
   ({
       Food : x 
   })
}

function feedDog()
{
    dog.addImage(dogImg1);

    foodObj. updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
        Food:foodObj.getFoodStock(),
        fedTime:hour()
    })

    function addFoods()
    {
        foodS++;
        database.ref('/').update({
            Food:foodS
        })
    }
    }

