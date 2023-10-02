img = "";
objects = [];
modelStatus = "";


function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detectando objetos";
}

function modelLoaded(){
    console.log("Modelo Carregado");
    modelStatus = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function preload(){
    img = loadImage('gaby.jpg');
}

function draw(){
    image(img, 0, 0, 640, 420);

    if(modelStatus != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objeto Detectado";
            fill("#FF0000");
            percent = floor(objects[i].confidence *100);
            text(objects[i].label + " " + percent + "%", objects[i].x,  objects[i].y);
            noFill();
            stroke(255, 0, 0);
            rect(objects[i].x,  objects[i].y, objects[i].width, objects[i].height);
        }
    }

    // fill(255,0, 0);
    // text("Dogin", 45, 75);
    // noFill();
    // stroke(255,0,0);
    // rect(30,60,450,350);

    // fill(255,0, 0);
    // text("Gatin", 45, 75);
    // noFill();
    // stroke(255,0,0);
    // rect(300,90,270,320);
}