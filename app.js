var players = [];
var playerfieldids = [];
var sectionids = [];
var playerbtn = document.querySelector("#nplayer_button");
var resetbtn = document.getElementById("reset_button");
var savebtn = document.createElement('button');
var startbtn = document.createElement('button');
var spinbtn = document.createElement('button');

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
    for (let i = 0, max = playerfieldids.length; i < max; i++) {
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

var Position = {
    ellipse : function(n, rx, ry, so, wh, idd, cls, cw) {
      var m = document.createElement('div'), ss = document.styleSheets;
      ss[0].insertRule('#' + idd + ' { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: 50%; width: ' + String((rx * 2) + wh) + 'px; height: ' + String((ry * 2) + wh) + 'px; }', 1);
      ss[0].insertRule('.' + cls + '{ position: absolute; background: black; color: papayawhip; text-align: center; transition: transform 0.2s ease; width: ' + wh + 'px; height: ' + wh + 'px; line-height: ' + wh + 'px;}', 1);
      ss[0].insertRule('.' + cls + ':hover { transform: scale(1.2); cursor: pointer; background: rgba(0, 0, 0, 0.8); }', 1);
      m.id = idd;
      for (var i = 0, max = players.length; i < max; i++) {
        var c = document.createElement('div');
        c.className = cls;
        c.innerHTML = players[i];
        c.style.top = String(ry + -ry * Math.cos((360 / n / 180) * (i + so) * Math.PI)) + 'px';
        c.style.left = String(rx + rx * (cw ? Math.sin((360 / n / 180) * (i + so) * Math.PI) : -Math.sin((360 / n / 180) * (i + so) * Math.PI))) + 'px';
        m.appendChild(c);
      }
      document.body.appendChild(m);
    }
  }

startbtn.addEventListener("click", function(){
    document.body.innerHTML = '';
    let circle = document.createElement('div');
    circle.className = "Test";
    document.body.appendChild(circle);
    Position.ellipse(players.length, 150, 150, 0, 35, 'main', 'node', true);
    savebtn.id = "spin_button";
    savebtn.textContent = "Spin";
    document.body.appendChild(savebtn);
});