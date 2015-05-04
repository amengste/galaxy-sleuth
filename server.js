var express = require('express');
var app = express();
// GalaxySleuth Class
var GalaxySleuth = function (gname){
	this.gname = gname;
	console.log("Game is instatiated");
};
// Player Class
var Player = function (name, token){
	this.token = token;
	this.name = name;
	console.log(this.name+" has joined with token "+ this.token);
};
var numPlayers = 0; // will be used to count number of players
var Game1; // Object name for game GalaxySleuth
var Player1; // Object name for Player class
var Player2; // Object name for Player class
var Player3; // Object name for Player class
var allPlayersInfo = [];

app.use(express.static('public'));
// Show instance web page (index.html)
app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});
// Show start new game page
app.get('/newgame', function (req, res){
	res.sendFile(__dirname + '/public/startNewGame.html');
});
// Show Join Game page
app.get('/joingame', function (req, res){
	res.sendFile(__dirname + '/public/JoinGame.html');
});
// Show help page
app.get('/help', function (req, res){
	res.sendFile(__dirname + '/public/help.html');
});
// Show Lobby area when user joins or creates a game
app.get('/new_game_created', function (req, res){
	res.sendFile(__dirname + '/public/lobby.html');
});
// Create game when clicked by user
// Event will be called from lobby client script
app.get('/waiting_lobby', function (req, res){
	var initial_info =[];
	if(numPlayers===0){
		// Game constructor the game object will only be created once
		Game1 = new GalaxySleuth("FirstGameEver");
		console.log("Game initiated");
		// Player constructor the first player will be created
		Player1 = new Player("Alex","red");
		console.log("Host player is "+ Player1.name);
		numPlayers +=1;
		console.log("Number of players " + numPlayers);

		// Game initiation info array to sent to client will be used in lobby or other purposes
		// [0]-game name [1]-host player name [2]-host player token [3]-number of players (1)
		initial_info =[Game1.gname,Player1.name,Player1.token,numPlayers];
		allPlayersInfo.push(initial_info);
		console.log(allPlayersInfo);

	}else if (numPlayers===1) {
		Player2 = new Player("Ben", "Blue");
		numPlayers +=1;
		console.log("Number of players " + numPlayers);
		
		initial_info =[Game1.gname,Player2.name,Player2.token,numPlayers];		
		allPlayersInfo.push(initial_info);
		console.log(allPlayersInfo);
	}
	
	res.send(allPlayersInfo);
});


app.listen(3000, function (){
	console.log("Server running (port 3000) ....");
});