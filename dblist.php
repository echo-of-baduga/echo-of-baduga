<?php
$c = new mysqli('127.0.0.1', 'root', '');
$res = $c->query("SHOW DATABASES");
if ($res) {
    while($r = $res->fetch_assoc()){ echo $r['Database'] . " | "; }
} else {
    echo "Error: ". $c->error;
}
?>
