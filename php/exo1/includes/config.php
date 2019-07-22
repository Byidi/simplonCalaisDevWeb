<?php
$config = [
    "links" => [
        ["name" => "Accueil", "url"=> "./index.php", "condition" => ""],
        ["name" => "Login", "url"=> "./login.php", "condition" => "unlog"],
        ["name" => "Déconnexion", "url"=> "./logout.php", "condition" => "log"]
    ],
    "users" => [
        ["login" => "user1", "password" => "pwd1", "nom" => "Machin", "prenom" => "Truc", "theme" => 1],
        ["login" => "user2", "password" => "pwd2", "nom" => "Machin", "prenom" => "Truc", "theme" => 2],
        ["login" => "user3", "password" => "pwd3", "nom" => "Machin", "prenom" => "Truc", "theme" => 3]
    ]
];
?>
