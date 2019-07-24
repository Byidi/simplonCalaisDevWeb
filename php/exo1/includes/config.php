<?php
$config = [
    "links" => [
        ["name" => "Accueil", "url"=> "./index.php", "logged" => -1],
        ["name" => "Login", "url"=> "./login.php", "logged" => 0],
        ["name" => "Déconnexion", "url"=> "./logout.php", "logged" => 1]
    ],
    "users" => [
        ["login" => "user1", "password" => "pwd1", "nom" => "Machin", "prenom" => "Truc", "theme" => 1],
        ["login" => "user2", "password" => "pwd2", "nom" => "Machin", "prenom" => "Truc", "theme" => 2],
        ["login" => "user3", "password" => "pwd3", "nom" => "Machin", "prenom" => "Truc", "theme" => 3]
    ]
];
?>
