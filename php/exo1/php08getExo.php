<?php
$num = (!empty($_GET['num']))?$_GET['num']:0;
$color = (!empty($_GET['col']))?$_GET['col']:'white';
$round = (!empty($_GET['round']) && $_GET['round']=='yes')?true:false;
$valign = (!empty($_GET['valign']))?$_GET['valign']:'bottom';

/*
-1- Utiliser un paramètre GET dans l'url : php08getExo.php?num=20
Récupérer ce paramètre 'num' avec la variable globale $_GET
Tester si la variable est définie, sinon donner la valeur 0.
Dans le body, créer $num balises div avec une boucle.
=> en changeant la valeur de 'num' dans l'url vous devriez voir changer le nombre de divs dans la page.

-2- Ajouter un second paramètre GET : php08getExo.php?num=20&col=dodgerblue
Récupérer ce paramètre avec $_GET, donner la valeur 'white' si pas défini.
Appliquer cette couleur à la classe div du css  : background-color: <?php ... ?>;
=> essayer plusieurs couleurs dans l'url : &col=indianred, &col=white, &col=limegreen
Plus de couleurs ici :
//http://www.w3schools.com/colors/colors_names.asp

-3- Ajouter un paramètre GET : &round=yes
Si round=yes, modifier la classe div du css (avec du php) pour avoir un border-radius à 50%
Sinon, rien n'est changé dans le css.

-4- Modifier le code dans votre boucle 'for' pour que les divs aient une taille $size (width et height),
telle que : $size = 20 + 2*$i

Pour éviter les erreurs : tapez d'abord le css : echo '... style="width:20px;height:20px" ...';
Puis remplacez les 20 par '..' (guillemet-point-point-guillemet) pour couper la chaine de caractère
et placer les points de concaténation. Puis ajouter la variable : '.$size.'

-5- Essayer maintenant avec : $size = 30 + 20*sin($i/5);

-6- Ajouter un paramètre GET : &valign=top (&valign=bottom) qui modifiera la classe div du css pour régler le vertival-align
Donner la valeur "bottom" si valign pas défini

-7- Créer quelques liens <a> en haut de page avec des paramètres GET différents (num,col,round,valign).
Là c'est juste du html tout simple!
Par exemple :
href="./php08getExo.php?num=329&col=firebrick&round=no&valign=top"
href="./php08getExo.php?num=244&col=dodgerblue&round=yes&valign=bottom"
href="./php08getExo.php?num=401&col=&round=&valign=bottom"

Vous remarquerez que le navigateur se rappelle des différentes combinaisons des paramètres GET
puisqu'ils sont dans l'url. Essayer de naviguer en avant/arrière dans l'historique.

-8- Optionnel, si vous êtes en avance, vous pouvez essayer :
transform:rotate($i deg)
ou encore :
filter:hue-rotate($i/5 deg)
(cette syntaxe doit être modifiée pour être valide)

ou essayer d'autres formes comme des demi-cercles avec option dans l'url, etc.....
*/


?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>php08getExo</title>
		<style>

			body {
				font-family: Arial;
				font-size:10px;
				color:grey;
			}

			div{
				width:73px;
				height:73px;
				text-align:center;
				border: 1px solid grey;
 				border-top-left-radius: 90% 20%;
 				border-bottom-right-radius: 90% 20%;
				display:inline-block;
				margin:2px;
				<?php
					echo 'background-color:'.$color.';';
					if($round){
						echo 'border-radius:50%;';
					}
					echo 'vertical-align:'.$valign.';';
				?>
			}

			a, a:active, a:visited{
				color:grey;
			}

			pre{
				clear:both;
				font-family:monospace;
				text-align:left;
				margin-top:50px;
				margin-left:50%;
				position:relative;
				left:-75px;
				color:grey;
			}
		</style>
	</head>

	<body>
		<?php
		echo '
		<a href="./php08getExo.php?num=329&col=firebrick&round=no&valign=top">lien 1</a>
		<a href="./php08getExo.php?num=244&col=dodgerblue&round=yes&valign=bottom">lien 2</a>
		<a href="./php08getExo.php?num=401&col=&round=&valign=bottom">lien 3</a><br/>
		';

		for ($i=0; $i < $num; $i++) {
			// $size = 20 + 2*$i;
			$size = 30 + 20*sin($i/5);
			echo '<div style="width:'.$size.'px;height:'.$size.'px"></div>';
		}
		?>
	<pre>
.---. .-..-. .---.
: :; :: :; : : :; :
:  _.':    : :  _.'
: :   : :: : : :
:_;   :_;:_; :_; 08
	</pre>
	</body>
</html>
