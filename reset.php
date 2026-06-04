<?php
if(function_exists('opcache_reset')) {
    opcache_reset();
    echo "OPcache flushed. ";
} else {
    echo "OPcache not available. ";
}
if(function_exists('apcu_clear_cache')) {
    apcu_clear_cache();
    echo "APCu cleared. ";
}
?>
