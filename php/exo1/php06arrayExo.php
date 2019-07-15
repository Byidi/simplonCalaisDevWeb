<?php
/*

-1- Créer un tableau indexé avec les jours de la semaine en français, et un autre avec les mois.
	Utiliser ces tableaux pour afficher la date du jour dans un paragraphe
	sous la forme : "Nous sommes le Lundi 2 Janvier 2017"

http://php.net/manual/fr/function.date.php

"Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"
"Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"


-2- Créer un tableau indexé à partir de la liste de prénoms : 'Iphigénie', 'Orphée', 'Artaban', 'Hildegarde', 'Sulliyan'
Afficher ces prénoms dans une table html sous la forme :

----------------------------
|  index   |     prénom    |
|----------|---------------|
|     0    |   Iphigénie   |
|----------|---------------|
|     1    |    Orphée     |



-3- Afficher dans une table la liste $users (ci-dessous) sous la forme :

-------------------------------------------------------
|   nom    |     prénom    |   adresse   |    ville   |
|----------|---------------|-------------|------------|
|   xxx    |   xxxxxxxxx   |  xx xxx xxx |   xxxxxx   |


*/

// /!\ il s'agit ici de tableaux associatifs (un par 'user') placés dans un tableau indexé !
$users = array(
			array( 'prenom' => 'Ahxo', 'nom' => 'Drimka', 'adresse' => '23 rue des routes', 'ville' => 'Lognebou'),
			array( 'prenom' => 'Xper', 'nom' => 'Krispj', 'adresse' => '150 avenue longue', 'ville' => 'Dryxmha'),
			array( 'prenom' => 'Dwin', 'nom' => 'Nhexit', 'adresse' => '1bis chemin des cailloux', 'ville' => 'Olinabrom')
		);

?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>php06arrayExo</title>
		<style>
			body{
				font-family:Arial;
				font-size:14px;
				text-align:center;
			}
			p{
				text-align:center;
			}

			table{
				border: 1px solid black;
				border-collapse: collapse;
				margin:auto;
			}
			td{
				border: 1px solid grey;
				padding : 3px 10px;
			}
			th{
				border: 1px solid black;
				background-color: grey;
				color:white;
			}


			pre{
				font-family:monospace;
				text-align:left;
				margin-top:50px;
				display:inline-block;
				margin:auto;
				margin-top:40px;
			}


		</style>
	</head>

	<body>

	<?php
	$jours = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
	$mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];
	echo 'Nous somme le '.$jours[date('N')].' '.date('d').' '.$mois[date('n')].' '.date('Y').'<br/>';

	$noms = ['Iphigénie', 'Orphée', 'Artaban', 'Hildegarde', 'Sulliyan'];
	foreach ($noms as $key => $value) {
		echo $key.' : '.$value.'<br/>';
	}
	for ($i=0; $i < sizeof($users)-1 ; $i++) {
		echo $i;
		foreach ($users[$i] as $key => $value) {
			echo ' '.$value;
		}
		echo '<br/>';
	}
	?>


	<pre>
.---. .-..-. .---.
: :; :: :; : : :; :
:  _.':    : :  _.'
: :   : :: : : :
:_;   :_;:_; :_; 06
	</pre>

	</body>
</html>
