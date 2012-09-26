<?php
eval(getPluginConf("login"));
session_start();
$_SERVER['PHP_AUTH_USER']=$_SERVER['REMOTE_USER']=$_SESSION['login'];
$me = getUser();
$jResult .= "plugin.me = '" . $me . "';";

// don't run other plugins for guests
if (!$me) $theSettings->plugins=array();
$theSettings->registerPlugin("login");
?>
