<?php
/*
Dans le formulaire ci-dessous vous ajouterez les champs input suivants :

- texte (texearea) : texte du message

- size (champ texte) : l'utilisateur entrera par ex : 300x180
	(qui sera utilisé ensuite en tant que widthxheight)

- colors (select) : couleur background/texte
	=> "darkorchid/darkorange", "deepskyblue/darkstateblue", "forestgreen/greenyellow" (par exemple)

- font (select) => 'Lemonada', 'Pacifico', 'Acme', 'Satisfy', 'Montez', 'Aladin' => des fonts google
	(vous pouvez choisir d'autres fonts si vous le souhaitez)
	A partir de cette liste, créer un tableau indexé
	puis créer dynamiquement (en php donc) les <option> du <select> dans le formulaire


Le formulaire est envoyé vers une page cible : php09formExoCible.php

*/
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>php09formExo</title>

		<style>
			body{
				font-family:Arial;
				font-size:14px;
			}
			form{
				font-family:Arial;
				font-size:14px;
				text-align:center;
				border : 1px solid lightgrey;
				border-radius:5px;
				width:400px;
				margin: 20px auto;
				padding:10px;
			}
			input, textarea, select, select *{
				font-family:Arial;
				font-size:14px;
				border : 1px solid black;
				background-color: grey;
				color:white;
				margin:3px auto 10px;
			}

			input[type="submit"]{
				margin-top:8px;
				padding: 3px 12px;
			}

			pre{
				font-family:monospace;
				text-align:left;
				margin-left:50%;
				position:relative;
				left:-75px;
				color:#666666;
			}

		</style>

	</head>

	<body>
		<form action="php09formExoCible.php" method="POST">
                <?php
                echo '
                <textarea row="10" col="30" name="content"></textarea><br/>
                <input type="text" name="size" placeholder="000x000" /><br/>
                <select name="color">
                    <option value="">--- bgcolor / txtcolor ---</option>
                    <option value="darkorchid/darkorange">darkorchid/darkorange</option>
                    <option value="deepskyblue/darkstateblue">deepskyblue/darkstateblue</option>
                    <option value="forestgreen/greenyellow">forestgreen/greenyellow</option>
                </select>
                <select name="font">
                    <option value="">--- Font ---</option>option';
                    $fonts = ['Lemonada', 'Pacifico', 'Acme', 'Satisfy', 'Montez', 'Aladin'];
                    foreach ($fonts as $f) {
                        echo '<option value="'.$f.'">'.$f.'</option>\n\t';
                    }
                echo'</select>';
                ?>
				<input type="submit" id="submit" name="submit" value="Envoyer loin"/>
		</form>



	<br><br>
	<pre>
.---. .-..-. .---.
: :; :: :; : : :; :
:  _.':    : :  _.'
: :   : :: : : :
:_;   :_;:_; :_; 09
	</pre>
	</body>
</html>
