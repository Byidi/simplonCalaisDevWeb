<?php
$title="Accueil";
require_once('./includes/header.php');

if(!empty($_SESSION['user'])){
    echo '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>';
}else{
    echo '<p>Murobal tse di mina tillom tnuresed aiciffo iuq apluc ni tnus ,tnediorp non tatadipuc taceacco tnis ruetpecxE .rutairap allun taiguf ue erolod mullic esse tilev etatpulov ni tiredneherper ni rolod eruri etua siuD .tauqesnoc odommoc ae xe piuqila tu isin sirobal ocmallu noitaticrexe durtson siuq ,mainev minim da mine tU .auqila angam erolod te erobal tu tnudidicni ropmet domsuie od des ,tile gnicisipida rutetcesnoc ,tema tis rolod muspi merol.</p>
    <p>Murobal tse di mina tillom tnuresed aiciffo iuq apluc ni tnus ,tnediorp non tatadipuc taceacco tnis ruetpecxE .rutairap allun taiguf ue erolod mullic esse tilev etatpulov ni tiredneherper ni rolod eruri etua siuD .tauqesnoc odommoc ae xe piuqila tu isin sirobal ocmallu noitaticrexe durtson siuq ,mainev minim da mine tU .auqila angam erolod te erobal tu tnudidicni ropmet domsuie od des ,tile gnicisipida rutetcesnoc ,tema tis rolod muspi merol.</p>';
}

require_once('./includes/footer.php');
?>
