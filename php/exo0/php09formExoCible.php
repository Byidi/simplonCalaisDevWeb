<?php
/*
$_POST['texte'] => texte à afficher dans la div

$_POST['size'] => "400x250" utiliser explode() pour extraire deux valeurs
  qui seront appliquées à width et height de la div 'msgbox'

$_POST['colors'] =>  "darkorchid/darkorange" utiliser explode()
  puis appliquer les couleurs au background de msgbox, et au texte

$_POST['font'] => nom de la google font.
A intégrer dynamiquement dans @import pour charger la police correspondante
  @import url('https://fonts.googleapis.com/css?family=Acme');
Adapter dynamiquement le font-family dans le css :
 font-family: 'Acme';


----------------- explode() --------------
$size = "331x193";
$split = explode("x",$size) );
$split est maintenant un tableau indexé contenant deux éléments $split[0] et $split[1]
---------------------------------------------

Optionnel : Tester les variables pour éliminer les erreurs de saisie venant du formulaire

*/
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>php09FormExoCible</title>
    <style>

      @import url('https://fonts.googleapis.com/css?family=|Lemonada|Pacifico|Acme|Satisfy|Montez|Aladin');


      #msgbox{
        margin:auto;
        width: 400px;
        height: 400px;
        border:1px solid grey;
        <?php
        $content = (isset($_POST['content']))?$_POST['content']:'';
        $size = (isset($_POST['size']))?$_POST['size']:'';
        $color = (isset($_POST['color']))?$_POST['color']:'';
        $font = (isset($_POST['font']))?$_POST['font']:'';

        echo 'font-family: \''.$font.'\', cursive;';

        if($size != ''){
            echo 'width:'.explode('x', $size)[0].'px;';
            echo 'height:'.explode('x', $size)[1].'px;';
        }

        if($color != ''){
            echo 'background-color: '.explode('/', $color)[0].';';
            echo 'color: '.explode('/', $color)[1].';';
        }
        ?>
      }
    </style>
  </head>
  <body>
    <div id="msgbox">
        <?php echo $content; ?>
    </div>
  </body>
</html>
