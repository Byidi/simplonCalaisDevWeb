<?php
if(!empty($_SESSION['user'])){
    switch($_SESSION['user']['theme']){
        case 1:
            $menuOptions = "noTitle iconRight iconFade";
        break;
        case 2:
            $menuOptions = "left";
        break;
        case 3:
            $menuOptions = "iconLeft noTitle";
        break;
    }
}else{
    $menuOptions = "iconLeft";
}
echo '<nav id="menu" class="'.$menuOptions.'">';
?>
    <div class="title">
        <i id="burgerButton" class="material-icons">menu</i>
        <div class="txt"></div>
    </div>
    <div class="link">
        <?php
        require_once('./includes/config.php');
        foreach ($config['links'] as $link) {
            $logged = (!empty($_SESSION['user'])) ? true : false;
            switch($link['logged']){
                case 1:
                    $show = ($logged)?true:false;
                break;
                case 0:
                    $show = (!$logged)?true:false;
                break;
                default:
                    $show = true;
            }
            if($show){
                echo '<a href="'.$link['url'].'" rel="'.$show.'">'.$link['name'].'</a>';
            }
        }
        ?>
    </div>
</nav>
