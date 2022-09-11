var players = [];
var playerfieldids = [];
var sectionids = [];
var angles = [];
var selectedplayer = ""
var playerbtn = document.querySelector("#nplayer_button");
var savebtn = document.createElement('button');
var startbtn = document.createElement('button');
var spinner = document.createElement('img');
var challengewindow = document.createElement('div')
var closechallengewindow = document.createElement('button');
var noclick = document.createElement("div")


//Get Data from JSON file and make it digestible

var challenges = [];

async function getDatafromJSON() {
    const response = await fetch('./challenges.json');
    var data = await response.json();
    challenges.push.apply(challenges, data);
};
getDatafromJSON()
console.log(challenges)

//Get Number of Players and create NameInputFields

playerbtn.addEventListener("click", function(){
    var nplayers = document.getElementById("nplayers").value;
    if (nplayers > 2 && nplayers < 8) {
    section = document.getElementById("start_section");
    section.innerHTML = '';
    for (let i = 0; i < nplayers; i++) {
        let inputfield = document.createElement("input");
        inputfield.id = `inp_player_${i+1}`;
        inputfield.type = 'text';
        inputfield.className = "inputfield";
        inputfield.placeholder = `Player ${i+1} name`;
        inputfield.maxLength = 21
        playerfieldids.push(inputfield.id);
        //sectionids.push(playersection.id);
        section.appendChild(inputfield);
    };
    savebtn.id = "saveplayer_button";
    savebtn.textContent = "Save Players";
    savebtn.className = "button";
    section.appendChild(savebtn);
    }
    else {
        alert("Choose a Number between 2 and 8 players.")
    }
});

//Get player names and save them in an array

savebtn.addEventListener("click", function(){
    for (let i = 0, max = playerfieldids.length; i < max; i++) {
        playername = document.getElementById(playerfieldids[i]).value;
        playerfieldelement = document.getElementById(playerfieldids[i]);
        //sectionparent = document.getElementById(playerfieldids[i]);
        players.push(playername);
        let newItem = document.createElement('div');
        newItem.innerHTML = playername;
        newItem.className = 'playername'
        section.replaceChild(newItem, playerfieldelement);
    }
startbtn.id = "start_button";
startbtn.textContent = "Start Game";
startbtn.className = "button";
oldbtn = document.getElementById("saveplayer_button");
section.replaceChild(startbtn, oldbtn);
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
      ss[0].insertRule('#' + idd + ' { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: 50%; width: ' + String((rx * 2) + wh) + 'px; height: ' + String((ry * 2) + wh) + 'px; display: none}', 1);
      ss[0].insertRule('.' + cls + '{ position: absolute; color: #ffffff; text-align: center; transition: transform 0.2s ease; width: fit-content; height: fit-content; background: #1E1E1E; border: 2px solid #282828; box-shadow: 0px 0px 8px 1px #3E3E3E, inset 0px 0px 7px 8px rgba(0, 0, 0, 0.25); border-radius: 10%;  padding: 1% 2% 1% 2%; display: none}', 1);
      m.id = idd;
      for (var i = 0, max = players.length; i < max; i++) {
        var c = document.createElement('div');
        var x = String(rx + rx * (cw ? Math.sin((360 / n / 180 - 50) * (i + so) * Math.PI) : -Math.sin((360 / n / 180) * (i + so) * Math.PI)));
        var y = String(ry + -ry * Math.cos((360 / n / 180 - 50) * (i + so) * Math.PI));
        var angle = ((360 / n / 180) * (i + so) * Math.PI) * (180/Math.PI);
        angles.push(angle);
        c.className = cls;
        c.innerHTML = players[i];
        console.log(players[i].length)
        c.id = "player_" + i
        c.style.top = y  + 'px';
        c.style.left = x  + 'px';
        m.appendChild(c);
        
      };
      circle.appendChild(m);
      
    }
  };

//Load Main Game

startbtn.addEventListener("click", function(){
    document.body.innerHTML = '';
    var circle = document.createElement('div');
    circle.className = "circle";
    circle.id = "circle"
    circle.setAttribute("onclick", 'spin("Spinning...")');
    document.body.appendChild(circle);
    Position.ellipse(players.length, 250, 250, 0, 50, 'playercircle', 'player', true);
    spinner.src = "arrow.png";
    spinner.className = "spinner";
    spinner.id = "arrow_png";
    spinner.alt = "";
    circle.appendChild(spinner);
});

//Spin on enter


function spin(s){
    console.clear()
    console.log(s)
    var finalrandomdeg = Math.floor(Math.random() * angles.length);
    var ranresult = 720 * Math.floor(Math.random() * 20);
    var target = angles[finalrandomdeg] - 90 + ranresult;
    selectedplayer = players[finalrandomdeg]
    document.getElementById("arrow_png").style.transform = "rotate(" + target + "deg)";
    setTimeout(displayChallange, 6000);
};



function displayChallange()
{   let task = challenges[Math.floor(Math.random()*challenges.length)];
    challengewindow.id = 'challenge_' + task.id;
    challengewindow.className = "challenge";
    challengewindow.innerHTML = '<div id="challengepar" class="challengepar">' + selectedplayer + '<br>' + '<br>' + task.challenge + '</div>';
    document.body.appendChild(challengewindow);
    closechallengewindow.id = "close_challenge";
    closechallengewindow.textContent = "Close";
    closechallengewindow.className = "button";
    closechallengewindow.type = "button";
    challengewindow.appendChild(closechallengewindow);
    noclick.className = "noclick";
    noclick.id = "noclick";
    document.body.appendChild(noclick);
    closechallengewindow.addEventListener("click", function(){
        document.body.removeChild(challengewindow);
        document.body.removeChild(noclick)
    });
}