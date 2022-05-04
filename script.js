//----------------------------------------------// Textos e divs
var clickArea = document.getElementById("clickArea");
var cont = document.getElementById("cont");
var totalUpgrade = document.getElementById("totalUpgrade");
var addPower = document.getElementById("addPower");
var addPerSecond = document.getElementById("addPerSecond");
var multitext = document.getElementById("multiplier");
//---------------------------------------------// Valores das upgrades
var upgt = [];
var upgc = [1,1,3,4,5,6,7,8,9,10,11,12,13];
var upquant = [1,0,0,0,0,0,0,0,0,0,0,0,0];
//---------------------------------------------// Valores de quantidade
var quantidade = 0;
var quantToAdd = 1;
var quantBase = 1;
var quantPerSecond = 0;
var quantTimer = 0.10;
var multiplier = 1.0;
//---------------------------------------------// Status
let stats = {
	clickPower: 0,
	quantTotalUpgrades: 0,
	
}


//---------------------------------------------// Funções de upgrade
const upgradeFunctions = [

	function upgrade1() {
		var i;
		if (quantidade >= upgc[0]){
			upquant[0]++;
			quantToAdd+=(quantToAdd*0.5*multiplier);
			quantidade-=upgc[0];

			switch(upgc[0]){ //teste temporário
				case upgc[0] >= 10:
					i = 0.7; break;
				case upgc[0] >= 20:
					i = 0.9; break;
				default:
					i = 0.5; break;
			}
			stats.quantTotalUpgrades++;
			upgc[0] += (upgc[0] * i);
			callUpdates(0);
		}
	},
	function upgrade2() {
		var i = 1;
		if (upgc[1] == 0){
			quantTimer == 1;
		}
		if (upgc[1]%10 == 0){
			multiplier += 0.25;
		}
		if (quantidade >= upgc[1]){
			upquant[1]++;
			i += 4;
			quantPerSecond += Math.round(quantBase * i * multiplier);
			quantidade-=upgc[1];
			stats.quantTotalUpgrades++;
			upgc[1] += (upgc[1] * 0.7);
			callUpdates(1);
		}
		

		callUpdates(1);
	},
	function upgrade3() {
		upquant[2]++;
		quantToAdd += 5+(upquant[2]*2);
	},
	function upgrade4() {
		upquant[3]++;
		quantToAdd += 5+(upquant[3]*2);
	},
	function upgrade5() {
		upquant[4]++;
		quantToAdd += 5+(upquant[0]*2);
	},
	function upgrade6() {
		upquant[5]++;
		quantToAdd += 5+(upquant[0]*2);
	},
	function upgrade7() {
		upquant[6]++;
		quantToAdd += 5+(upquant[0]*2);
	},
	function upgrade8() {
		upquant[7]++;
		quantToAdd += 5+(upquant[0]*2);
	},
	function upgrade9() {
		upquant[8]++;
		quantToAdd += 5+(upquant[0]*2);
	},
	function upgrade10() {
		upquant[9]++;
		quantToAdd += 5+(upquant[0]*2);
	},
	function upgrade11() {
		upquant[10]++;
		quantToAdd += 5+(upquant[0]*2);
	},
	function upgrade12() {
		upquant[11]++;
		quantToAdd += 5+(upquant[0]*2);
	}
];

function callUpdates(i){
	updateUpgradeText(i);
	updateQuant();
	updateStatus();
}



function timedAdd(){
	quantidade+=quantPerSecond;
	console.log("adicionou" + quantPerSecond);
	updateQuant();
}
setInterval(timedAdd,quantTimer * 1000);

//document.addEventListener("load", callUpdates(i));

//Carrega as divs do upgrade
for (var i=0;i<12;i++){
	upgt[i] = document.getElementById("up"+i+"cost");
	var upgdv = document.getElementById("up"+i+"d");
	setUpgradeText();
}

function setUpgradeText(){
	upgt.forEach(() => (
		upgt[i].innerHTML = "Custo: " + upgc[i] + "<br>Quantidade: " + upquant[i]
	))
}
//Funções de atualização
function updateQuant(){
	cont.innerHTML = "Quantidade: " + Math.floor(quantidade*1).toFixed();
}	

function updateStatus(){
	addPower.innerHTML = "Poder do clique: " + quantToAdd.toFixed(1);
	addPerSecond.innerHTML = "Quantidade por segundo: " + quantPerSecond;
	totalUpgrade.innerHTML = "Quantidade total de upgrades obtida: " + stats.quantTotalUpgrades;
	multitext.innerHTML = "Multiplier: " + multiplier;
}

function updateUpgradeText(i){
	upgt[i].innerHTML = "Custo: " + Math.floor(upgc[i]*1).toFixed(1) + "<br>Quantidade: " + upquant[i].toFixed();
}

function addQuant(){
	quantidade+=quantToAdd;
	updateQuant();
}


//Adiciona event listener
function addEvent(){
	callUpdates(0);
	clickArea.addEventListener("click", addQuant);
	
	for (var i=0;i<12;i++){
		document.getElementById("up"+i+"d").addEventListener("click",upgradeFunctions[i]);
		console.log(upgt[i]);
		console.log(upgc[i]);
	}
}

