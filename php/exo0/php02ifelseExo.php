<?php
/*
-------------------------------------------------------------------
Dans cet exercice vous devez utiliser les conditionnelles ternaire :
             ($isMember)? doThisIfTrue : doThatIfFalse
-------------------------------------------------------------------

-1- Dans le paragraphe :
	Si la personne est membre de l'asso ($isMember=true), afficher : Salut $nom ! Ça va ?
	Sinon afficher : Ah c'est $nom... tu veux quoi ?

-2- Après le <br> dans le même paragraphe :
	Si membre, afficher : LAN Samedi 20h, pizza & boissons : $frais € !
	Sinon, afficher : Non ya rien en ce moment...

-3- Si membre, appliquer la classe CSS "member" au paragraphe

-4- Si membre, faire un echo de :
	@import url('https://fonts.googleapis.com/css?family=Indie+Flower');
sinon echo ""
=> De cette façon, on ne charge la police que si c'est nécessaire !

-5- Dans le css, si membre remplacer "black" par "DodgerBlue"
=> Et là vous commencez à faire du css dynamique ;)

*/


$nom = "Appolonie";

//*  <= 1 ou 2 slash pour basculer les commentaires
$isMember = true;
/*/
$isMember = false;
//*/

$frais = 5;

?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>php02ifelseExo</title>
		<style>
			<?php
			if($isMember){
				echo "@import url('https://fonts.googleapis.com/css?family=Indie+Flower');";
			}
			?>
			p{
				text-align:center;
				<?php
				if ($isMember){
					echo 'color:DodgerBlue;';
				}else{
					echo 'color:black;';
				}
				?>
			}

			.member{
				font-family:"Indie Flower";
				font-size : 1.5em;
			}

			pre{
				font-family:monospace;
				text-align:left;
				margin-left:50%;
				position : relative;
				left:-80px;
				margin-top:50px;
			}
		</style>
	</head>

	<body>
		<div>

		<p class="<?php if($isMember){echo 'member'; }?>">
			<?php
			if($isMember){
				echo 'Salut, ça va '.$nom;
			}else{
				echo 'Ah c\'est '.$nom.'... tu veux quoi ?';
			}
			?>
		<br>

			<?php
			if($isMember){
				echo 'LAN Samedi 20h, pizza & boissons : '.$frais.' € !';
			}else{
				echo 'Non ya rien en ce moment...';
			}
			?>
		</p>



	<pre>
.---. .-..-. .---.
: :; :: :; : : :; :
:  _.':    : :  _.'
: :   : :: : : :
:_;   :_;:_; :_; 02
	</pre>
	</body>
</html>
