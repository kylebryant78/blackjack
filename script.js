//------------ LOGIC CODE BELOW -----------------
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var suits = ["Diamonds", "Hearts", "Spades", "Clubs"];
var deck = new Array();

function createDeck()
{
	deck = new Array();
	for(let i=0; i<values.length; i++)
	{
		for(let x=0; x<suits.length; x++)
		{
			//parseInt changes a string into a integer
			let weight = parseInt(values[i]);
			//As J, Q and K can't be integers this if statements sets them to 10
			if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
			weight = 10;
			//Sets A to 11 as A can't be an integer
			if (values[i] == "A")
			weight = 11;

			let card = { Value: values[i], Suit: suits[x], Weight: weight};
			deck.push(card);
		}
	}
}

function shuffle()
    {
        // for 1000 turns
        // switch the values of two random cards
        for (var i = 0; i < 1000; i++)
        {
            var location1 = Math.floor((Math.random() * deck.length));
            var location2 = Math.floor((Math.random() * deck.length));
            var tmp = deck[location1];

            deck[location1] = deck[location2];
            deck[location2] = tmp;
        }
	}

let players = new Array();
function createPlayers(num)
{
	players = new Array();
	for(let i = 1; i <=num; i++)
	{
		let hand = new Array();
		//creates a player object that has the name, id, points and current hand of the player
		//then adds this player object to the players object
		let player = { Name: 'Player' + i, ID: i, Points: 0, Hand: hand};
		players.push(player);
	}
}

function createPlayersUI()
{
	document.getElementById('players').innerHTML = '';
	//for the number of players in the players object run the code below
	//we only have 1 currently
	for(let i=0; i < players.length; i++)
	{
		var div_player = document.createElement('div');
		var div_playerid = document.createElement('div');
		var div_hand = document.createElement('div');
		var div_points = document.createElement('div');

		div_points.className = 'points';
		div_points.id = 'points_' + i;
		div_player.id = 'player_' + i;
		div_player.className = 'player';
		div_hand.id = 'hand_' + i;

		div_playerid.innerHTML = players[i].ID;
		div_player.appendChild(div_playerid);
		div_player.appendChild(div_hand);
		div_player.appendChild(div_points);
		document.getElementById('players').appendChild(div_player);
	}
}

//----------------- UI CODE BELOW -------------------

function startBlackjack()
{
	document.getElementById('btnStart').value = 'Restart';
	document.getElementById("status").style.display="none";
	// deal 2 cards to every player(object)
	currentPlayer = 0;
	createDeck();
	shuffle();
	createPlayers(2);
	createPlayersUI();
	dealHands();
	document.getElementById('player_' + currentPlayer).classList.add('active');
}

function dealHands()
{
	//alternate handing cards to each player
	//2 cards
	for(let i=0; i<2; i++)
	{
		for(let x=0; x < players.length; x++)
		{
			//takes the card off the top of the deck and push(hands it) to each player
			let card = deck.pop();
			players[x].Hand.push(card);
			//then renders the card
			renderCard(card, x);
			updatePoints();
		}
	}
	updateDeck();
}

function renderCard(card, player)
{
	let hand = document.getElementById('hand_' + player);
	hand.appendChild(getCardUI(card));
}

function getCardUI(card)
{
	let el = document.createElement('div');
	let icon = '';
	if (card.Suit == 'Hearts')
	icon='&hearts;';
	else if (card.Suit == 'Spades')
	icon = '&spades;';
	else if (card.Suit == 'Diamonds')
	icon='&diams;';
	else
	icon = '&clubs;';

	el.className = 'card';
	el.innerHTML = card.Value + '<br/>' + icon;
	return el;	
}

//returns the number of points that a player has in hand
function getPoints(player)
{
	let points= 0;
	for(let i=0; i <players[player].Hand.length; i++)
	{
		points += players[player].Hand[i].Weight;
	}
	players[player].Points = points;
	return points;
}

function updatePoints()
{
	for (let i=0; i <players.length; i++)
	{
		getPoints(i);
		document.getElementById('points_' + i).innerHTML = players[i].Points;
	}
}

function hitMe()
{
	//pop a card from the deck to the current player
	//check if current player new points are over 21
	var card = deck.pop();
	players[currentPlayer].Hand.push(card);
	renderCard(card, currentPlayer);
	updatePoints();
	updateDeck();
	check();
}
//check function will run after each card has been dealt to determine if the player has lost the game
function check()
{
	if (players[currentPlayer].Points > 21)
	{
		document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].ID + ' LOST';
		document.getElementById('status').style.display = "inline-block";
		end();
	}
}

function updateDeck()
{
	document.getElementById('deckcount').innerHTML = deck.length;
}

function stay()
{
	//move on to the next player, if any
	if (currentPlayer != players.length-1) {
		document.getElementById('player_' + currentPlayer).classList.remove('active');
        currentPlayer += 1;
        document.getElementById('player_' + currentPlayer).classList.add('active');el.className = 'card';
		el.innerHTML = card.Suit + '' + card.Value;
		return el;
	}

	else {
		end();
	}
}

function end()
{
	let winner = -1;
	let score = 0;el.className = 'card';
	
	for(let i=0; i < players.length; i++)
	{
		if (players[i].Points > score && players[i].Points < 22)
		{
			winner = i;
		}
		score = players[i].Points;
	}
	document.getElementById('status').innerHTML = 'Winner: Player ' + players[winner].ID;
	document.getElementById('status').style.display = "inline-block";
}

window.addEventListener('load', function() {
	createDeck();
	shuffle();
	createPlayers(1);
})