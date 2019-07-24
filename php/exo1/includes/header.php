<?php
session_start();
?>
<!DOCTYPE html>
<html lang="fr" dir="ltr">
    <head>
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.byidi.fr/burgerMenu/css/burger.css">
        <link rel="stylesheet" href="./css/main.css">
        <?php
        if(!empty($_SESSION['user'])){
            switch($_SESSION['user']['theme']){
                case 1:
                    echo '<link rel="stylesheet" href="./css/theme1.css">';
                break;
                case 2:
                    echo '<link rel="stylesheet" href="./css/theme2.css">';
                break;
                case 3:
                    echo '<link rel="stylesheet" href="./css/theme3.css">';
                break;
            }
        }
        ?>
        <title><?php echo $title;?></title>
    </head>
    <body>
        <header>
            <?php
            require_once('./includes/menu.php');

            $theme = (!empty($_SESSION['user']))?$_SESSION['user']['theme']:0;
            $name = (!empty($_SESSION['user']['nom']))?$_SESSION['user']['nom']:'';
            $name .= (!empty($_SESSION['user']['prenom']))?' '.$_SESSION['user']['prenom']:'';
            echo '
            <div id="couverture" rel="'.$theme.'">
                <div id="avatar"></div>
                <div id="name">'.$name.'</div>
            </div>';
            ?>
        </header>
        <div id="content">
