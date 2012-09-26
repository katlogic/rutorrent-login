<?
require_once("conf.php");
session_start();
$uname = $_POST['login_username'];
$upass = $_POST['login_password'];
if ($uname && $upass && (!preg_match('/[^a-z_\-0-9]/i', $uname)) && auth_ok($uname,$upass)) {
	$_SESSION['login'] = $uname;
};
$ret=$_GET["return"];
header("Location: $ret");
?>
