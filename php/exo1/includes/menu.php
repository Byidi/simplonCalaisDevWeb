<nav id="menu">
    <div class="title">
        <div class="txt"><?php echo $title; ?></div>
        <i class="material-icons">menu</i>
    </div>
    <div class="link">
        <?php
        require_once('./includes/config.php');
        foreach ($config['links'] as $link) {
            $logged = (!empty($_SESSION['user'])) ? true : false;

            switch($link['condition']){
                case "log":
                    $show = ($logged)?true:false;
                break;
                case "unlog":
                    $show = (!$logged)?true:false;
                break;
                default:
                    $show = true;
            }
            if($show){
                echo '<a href="'.$link['url'].'">'.$link['name'].'</a>';
            }
        }
        ?>
    </div>
</nav>
