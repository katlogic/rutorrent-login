<?php
eval(getPluginConf("login"));
session_start();
$luser = $_SESSION['login'];
if ($luser) $_SERVER['REMOTE_USER']=$luser;
$me = getUser();
$jResult .= "plugin.me = '" . $me . "';";

// don't run other plugins for guests
if (!$me) $theSettings->plugins=array();
$theSettings->registerPlugin("login");
?>
