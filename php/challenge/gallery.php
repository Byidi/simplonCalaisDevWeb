<?php
$title = "Galerie";
require_once('./includes/header.php');
//
// if(is_dir($config['gallery']['folder'])){
//     $error = true;
// }
//
// if(sizeof($files) <= 2){
//     $error = true;
// }

$error = (is_dir($config['gallery']['folder']) && scandir($config['gallery']['folder'])) ? false : true;


if(!$error){
    $files = scandir($config['gallery']['folder']);
    echo '<div id="gallery">';
    foreach ($files as $f) {
        if(!is_dir($f)){
            list($width, $height, $type, $attr) = getimagesize($config['gallery']['folder'].'/'.$f);
            if($width > $height){
                $style = 'width:150px;';
            }else{
                $style = 'height:150px;';
            }
            echo '<div class="item"><img style="'.$style.'" src='.$config['gallery']['folder'].'/'.$f.' alt="'.$f.'" /></div>';
        }
    }
    echo '</div>';
}

require_once('./includes/footer.php');
?>
