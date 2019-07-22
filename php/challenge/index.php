<?php
$title = "Accueil";
require_once('./includes/header.php');
$error = (is_dir($config['gallery']['folder']) && scandir($config['gallery']['folder'])) ? false : true;

$img = 'byidi.png';
if(!$error){
    $files = scandir($config['gallery']['folder']);
    $rdm = mt_rand(2, sizeof($files)-1);
    $img = $files[$rdm];
}

echo '
<div id="desc">
    <div class="photo" rel="'.$img.'"></div>
    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
</div>
';

require_once('./includes/footer.php');
?>
