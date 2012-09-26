<?php
eval(getPluginConf("login"));
$me = getUser();
$jResult .= "plugin.me = '" . $me . "';";
// don't run other plugins for guests
if (!$me) $theSettings->plugins=array();
$theSettings->registerPlugin("login");
?>
