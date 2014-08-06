
window.onload = function(){
  //setting up constants
  var turn = 0,
    player1 = {
      id: 'player1',
      name: 'Naruto',
      image: "http://2.bp.blogspot.com/-9D7t5jzsaoQ/Tz_70QlaFYI/AAAAAAAACoU/Ha8gncPjGPY/s320/ChilNaruto+%25287%2529.jpg",
      sign: "X",
      actions: []
    },
    player2 = {
      id: 'player2',
      name: 'Sasuke',
      image: "http://img1.wikia.nocookie.net/__cb20110911025000/naruto/images/d/d2/Sasuke_child.png",
      sign: "O",
      actions: []
    },
    currentPlayer = player1,
    winningCombos = [
        [0,1,2], [3,4,5], [2,4,6], [6,7,8], [0,4,8], [1,4,7], [0,3,6], [2,5,8]
      ];

//======= Board Set up =========
  var gameBoard = document.getElementById('board');
  var results = document.getElementById('results')

  var numberOfTiles = 9;

  for(var i = 0; i < numberOfTiles; i++){
    var div = document.createElement('div');
    div.className = 'tile';
    div.id = i;
    div.onclick = function(){
      this.innerHTML = currentPlayer.sign;
      this.onclick = null;
      currentPlayer.actions.push(parseInt(this.id));
      turn += 1;
      checkWin(currentPlayer);

    }
    gameBoard.appendChild(div);
  }
  
  results.style.display = 'none';
  setPlayer(player1);
  setPlayer(player2);

//======= End Of Board Set Up =========

//======= Utilities Area =========
  function setPlayer(player){
    var playerDiv = document.getElementById(player.id),
    img = document.createElement('img'),
    name = document.createElement('h2');

    name.innerHTML = player.name;
    img.setAttribute("src", player.image);
    playerDiv.className = (player.id === 'player1') ? 'current' : '';

    playerDiv.appendChild(img);
    playerDiv.appendChild(name);
  }
  function togglePlayer(){
    if(currentPlayer.sign === "X"){
      currentPlayer = player2;
      toggleClass(currentPlayer, player1);
    } else {
      currentPlayer = player1;
      toggleClass(currentPlayer, player2);
    }
  }

  function toggleClass(currentPlayer, otherPlayer){
    var currentPlayerDiv = document.getElementById(currentPlayer.id),
        otherPlayerDiv = document.getElementById(otherPlayer.id);

      currentPlayerDiv.className = "current";
      otherPlayerDiv.className = "";
  }

  function checkWin(currentPlayer){
    for(var i = 0; i < winningCombos.length; i++){
      var matched = intersect(currentPlayer.actions, winningCombos[i])
      if(matched.length == 3){
        setWinner(matched, currentPlayer);
        toggleOverlay();
        preventToggle();
        return;
      }
    }
    if(turn == 9){
      setTie();
      preventToggle();
    } else {
      togglePlayer();
    }
  }

  //intersect method will an array with the matching elements
  function intersect(actions, winningCombo){
    return actions.filter(function(e){
      if(winningCombo.indexOf(e) != -1) return true;
    })
  }

  function setWinner(combo, winningPlayer){
    
    for(var i = 0; i < combo.length; i++){
      var id = combo[i].toString();
      var tile = document.getElementById(id);
      tile.className = tile.className + ' combo';
    }
    showResults(winningPlayer);
  }

  function setTie(){
    toggleOverlay();
    showResults("none");
  }

  function showResults(winner){
    var results = document.getElementById('results'),
        h1 = document.createElement('h1'),
        img = document.createElement('img'),
        button = document.createElement('button');

    if(winner === "none"){
      h1.innerHTML = "It's a tie!";
      img.setAttribute('src', "http://i.imgur.com/vI23B2j.gif");
    } else {
      h1.innerHTML = "Congratulations, " + winner.name + "-san!!";
      img.setAttribute('src', winner.image);
    }

      button.innerHTML = 'Play Again';
      button.onclick = function(){
        window.location = "/";
      };

      results.appendChild(h1);
      results.appendChild(img);
      results.appendChild(button);
      
      setTimeout(function(){
        results.style.display = 'block';
      }, 1500)
  }

  function toggleOverlay(){
    var overlay = document.getElementById('overlay');
    overlay.className = 'overlay';
  }

  function preventToggle(){
    for(var i = 0; i < numberOfTiles; i ++){
      var tile = document.getElementById(i.toString());
      tile.onclick = null;
    }
  }

//======= End Of Utilities Area =========

};