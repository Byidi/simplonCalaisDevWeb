<?php
/*
-1- (Facile)
Dans la balise php du paragraphe <p>, créez une boucle 'for' pour afficher la table des carrés de 0 à 10 (inclus),
sous la forme :
0x0 = 0
1x1 = 1
2x2 = 4
3x3 = 9
4x4 = 16
5x5 = 25
6x6 = 36
7x7 = 49
8x8 = 64
9x9 = 81
10x10 = 100

Note1 : la multiplication en php se fait comme en javascript : $i*$i
Note2 : lorsqu'une opération est concaténée avec une chaine de caractères,
		il faut l'isoler entre deux parenthèses "res=".($i*$i)

Technique de codage : pour ne pas vous tromper dans la syntaxe, vous pouvez commencer sans les variables :
	echo "2x2 = 4";
puis remplacez '2' par la variable $i en faisant attention à la concaténation avec le point et aux guillemets :
	echo $i."x2 = 4";
=> testez ! Puis remplacez l'autre '2' (testez), remplacez '4' par une multiplication, ajoutez un <br> et c'est déjà fini :)

Pensez à tester après chaque modification ! S'il y a une erreur vous saurez exactement de où elle vient ;)


-2- (Moins facile)
Modifiez votre code pour afficher 0x0=0 avec un font-size:10px, 1x1=1 avec un font-size:11px, 2x2=2 avec un font-size:12px, etc...

Tip : <span>
Tip2 : utilisez la technique de codage de la question 1

/!\ il faudra peut-être utiliser le caractère d'échappement backslash (\)


-3- (Beaucoup trop facile)
Modifiez la boucle pour afficher la table des carrés de 0 à 100


-4- (?)
Vérifiez avec une calculatrice, ou à la main, que php ne s'est pas trompé dans les calculs


*/
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>php04for&whileExo</title>
		<style>
			body{
				font-family:Arial;
				text-align:center;
			}
			p{
				/*width:500px;*/
				margin:40px auto;
			}
			pre{
				font-family:monospace;
				text-align:left;
				margin-top:20px;
				display:inline-block;
				margin: 30px auto;
			}
		</style>
	</head>

	<body>

	<p>
		<?php
		for ($i=0; $i <= 100; $i++) {
			echo '<span style="font-size:'.($i+10).'px;">'.$i.' x '.$i.' = '.$i*$i.'</span><br/>';
		}
		?>
	</p>

	<pre>
.---. .-..-. .---.
: :; :: :; : : :; :
:  _.':    : :  _.'
: :   : :: : : :
:_;   :_;:_; :_; 04
	</pre>
	</body>
</html>
