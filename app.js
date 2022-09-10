var players = [];
var playerfieldids = [];
var sectionids = [];
var angles = [];
var playerbtn = document.querySelector("#nplayer_button");
var resetbtn = document.getElementById("reset_button");
var arrow = document.getElementById("arrow_png")
var savebtn = document.createElement('button');
var startbtn = document.createElement('button');
var spinbtn = document.createElement('button');
var spinner = document.createElement('img');


// Reload page and reset game

resetbtn.addEventListener("click", function(){
    window.location.reload();
});

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

//Get Number of Players and create NameInputFields

playerbtn.addEventListener("click", function(){
    nplayers = document.getElementById("nplayers").value;
    startsection = document.getElementById("start_section");
    startsection.innerHTML = '';
    for (let i = 0; i < nplayers; i++) {
        let inputfield = document.createElement("input");
        let section = document.createElement("div");
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
    savebtn.className = "inputfield";
    document.body.appendChild(savebtn);
});

//Get player names and save them in an array

savebtn.addEventListener("click", function(){
    for (let i = 0, max = playerfieldids.length; i < max; i++) {
        playername = document.getElementById(playerfieldids[i]).value;
        playerfieldelement = document.getElementById(playerfieldids[i]);
        sectionparent = document.getElementById(sectionids[i]);
        players.push(playername);
        let newItem = document.createElement('h');
        newItem.innerHTML = playername;
        newItem.className = 'playername'
        sectionparent.replaceChild(newItem, playerfieldelement);
    }
console.log(players);
startbtn.id = "start_button";
startbtn.textContent = "Start Game";
startbtn.className = "button";
oldbtn = document.getElementById("saveplayer_button");
document.body.replaceChild(startbtn, oldbtn);
});

//Create circle and place names around circle

/*
Usage: Position.ellipse(n, rx, ry, so, wh, idd, cls, cw);

where n = number of divs,
      rx = radius along X-axis,
      ry = radius along Y-axis,
      so = startOffset,
      wh = width/height of divs,
      idd = id of main div(ellipse),
      cls = className of divs;
      cw = clockwise(true/false)
*/

var Position = {
    ellipse : function(n, rx, ry, so, wh, idd, cls, cw) {
      var m = document.createElement('div'), ss = document.styleSheets;
      ss[0].insertRule('#' + idd + ' { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: 50%; width: ' + String((rx * 2) + wh) + 'px; height: ' + String((ry * 2) + wh) + 'px; }', 1);
      ss[0].insertRule('.' + cls + '{ position: absolute; background: rgba(0, 0, 0, 0.2); color: papayawhip; text-align: center; transition: transform 0.2s ease; width: fit-content; height: fit-content; border: 3px solid #282828; border-radius: 5px; box-shadow: -2px -2px 5px rgba(67,67,67,0.5), inset 2px 2px 5px rgba(0,0,0,0.5), inset -2px -2px 5px rgba(67,67,67,0.5), 2px 2px 5px rgba(0,0,0,0.3);  padding: 1% 2% 1% 2%; display: inline-block}', 1);
      m.id = idd;
      for (var i = 0, max = players.length; i < max; i++) {
        var c = document.createElement('div');
        var x = String(rx + rx * (cw ? Math.sin((360 / n / 180 - 50) * (i + so) * Math.PI) : -Math.sin((360 / n / 180) * (i + so) * Math.PI)));
        var y = String(ry + -ry * Math.cos((360 / n / 180 - 50) * (i + so) * Math.PI));
        var angle = ((360 / n / 180) * (i + so) * Math.PI) * (180/Math.PI);
        angles.push(angle);
        c.className = cls;
        c.innerHTML = players[i];
        c.style.top = y + 'px';
        c.style.left = x + 'px';
        m.appendChild(c);
      };
      document.body.appendChild(m);
      console.log(angles);
    }
  };

var spinfield = [];

startbtn.addEventListener("click", function(){
    document.body.innerHTML = '';
    let circle = document.createElement('div');
    circle.className = "circle";
    document.body.appendChild(circle);
    Position.ellipse(players.length, 200, 200, 0, 35, 'main', 'node', true);
    spinbtn.id = "spin_button";
    spinbtn.textContent = "Spin";
    document.body.appendChild(spinbtn);
    spinner.src = "arrow.png";
    spinner.className = "spinner";
    spinner.id = "arrow_png";
    spinner.alt = "";
    circle.appendChild(spinner);
    console.log(spinfield);

});

$(document).on('keypress', function(e){
    if(e.which == 13) {
        console.log(angles.length);
        var finalrandomdeg = Math.floor(Math.random() * angles.length);
        var ranresult = 720 * Math.floor(Math.random() * 20);
        var target = angles[finalrandomdeg] - 90 + ranresult;
        document.getElementById("arrow_png").style.transform = "rotate(" + target + "deg)";
    }
});