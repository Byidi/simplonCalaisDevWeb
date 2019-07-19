<?php
$title = "Contact";
require_once('./includes/header.php');

echo '
<form method="POST" action="./contact.php" id="formContact">
    <input type="text" name="nom" placeholder="Nom" required />
    <input type="text" name="prenom" placeholder="Prénom" required />
    <input type="text" name="mail" placeholder="Email" required />
    <input type="text" name="sujet" placeholder="Sujet" required />
    <textarea required></textarea>
    <div>
        <button id="send">Envoyer</button>
        <button id="cancel">Annuler</button>
    </div>
</form>
';

require_once('./includes/footer.php');
?>
