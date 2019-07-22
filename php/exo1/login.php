<?php
$title = "Login";
require_once('./includes/header.php');

if(!empty($_POST)){
    if(!empty($_POST['name']) && !empty($_POST['pwd'])){
        require_once('./includes/config.php');
        foreach($config['users'] as $user){
            if($_POST['name'] == $user['login'] && $_POST['pwd'] == $user['password']){
                $_SESSION['user'] = $user;
                header('Location: ./index.php');
            }else{
                $error = "invalid";
            }
        }
    }else{
        $error = "empty";
    }
}


echo '
<form action="./login.php" method="post">
    <input type="text" name="name" placeholder="Nom" />
    <input type="password" name="pwd" placeholder="Mot de passe" />
    <button>Valider</button>
</form>
';

require_once('./includes/footer.php');
?>
