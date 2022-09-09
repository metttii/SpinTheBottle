var players = [];
var playerfieldids = [];
var sectionids = [];
var playerbtn = document.querySelector("#nplayer_button");
var resetbtn = document.getElementById("reset_button");
var savebtn = document.createElement('button');
var startbtn = document.createElement('button');

// Reload page and reset game

resetbtn.addEventListener("click", function(){
    window.location.reload();
});

//Get Number of Players and create NameInputFields

playerbtn.addEventListener("click", function(){
    nplayers = document.getElementById("nplayers").value;
    startsection = document.getElementById("start_section");
    startsection.innerHTML = '';
    for (let i = 0; i < nplayers; i++) {
        let inputfield = document.createElement("input");
        let section = document.createElement("section");
        section.id = `sec_player_${i+1}`;
        inputfield.id = `inp_player_${i+1}`;
        inputfield.type = 'text';
        inputfield.className = "inputfield";
        inputfield.placeholder = `Player ${i+1} name`;
        playerfieldids.push(inputfield.id);
        sectionids.push(section.id);
        document.body.appendChild(section);
        section.appendChild(inputfield);
    };
    savebtn.id = "saveplayer_button";
    savebtn.textContent = "Save Players";
    document.body.appendChild(savebtn);
});

//Get player names and save them in an array

savebtn.addEventListener("click", function(){
    for (let i=0, max=playerfieldids.length; i < max; i++) {
        playername = document.getElementById(playerfieldids[i]).value;
        playerfieldelement = document.getElementById(playerfieldids[i]);
        sectionparent = document.getElementById(sectionids[i]);
        players.push(playername);
        let newItem = document.createElement('h');
        newItem.innerHTML = playername;
        sectionparent.replaceChild(newItem, playerfieldelement);
    }
console.log(players)
startbtn.id = "start_button";
startbtn.textContent = "Start Game";
oldbtn = document.getElementById("saveplayer_button");
document.body.replaceChild(startbtn, oldbtn);
});

//Create circle and place names around circle


//function setup(w, h){
//    createCanvas(w, h);
//    background("#efefef");
//};

//function draw(width, height){
//    stroke('black');
//    strokeWeight(15);
//    noFill();
//    circle(width / 2, height / 2, 512);
//};




startbtn.addEventListener("click", function(){
    document.body.innerHTML = '';
    var cw = window.innerWidth;
    var ch = window.innerHeight;
    var color = "#efefef"
    var canvas = function(sketch) {
        sketch.setup = function() {
          sketch.createCanvas(cw, ch);
          sketch.background(color);
        };
        sketch.draw = function() {
            sketch.ellipseMode(sketch.CENTER);
            sketch.ellipse(cw / 2, ch / 2, 400, 400);
            sketch.fill('green');

        };
      };    
    var myp5 = new p5(canvas);
    //function setup(w, h){
    //    createCanvas(w, h);
    //};
    
    //function draw(w, h){
    //        stroke('black');
    //        strokeWeight(15);
    //        noFill();
    //        circle(w / 2, h / 2, 216);
    //};
    //setup();
    //draw();
});




//btn.addEventListener("click", function(){
//  var player1 = document.getElementById("firsttext");
//  var player2 = document.getElementById("secondtext");
//  
//  if (player1.value != "" && player2.value != "") {
//    firsttext.push(player1.value);
//    firsttext.push(player2.value);
//    alert(firsttext);
//    return firsttext;
//  } else {
//  	alert("Enter players' names");
//  }
//	
//});