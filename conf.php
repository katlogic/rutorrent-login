<?php
// put your own auth scheme in here.
// $uname is guaranteed to be clean, $upass NOT!
function auth_ok($uname,$upass) {
	// on my system smb users=local users
	// AVOID using passwords on commandline, as it will simply leak passwords in 'ps'
	$fd = popen("smbclient -A /dev/stdin -c '' //127.0.0.1/$uname > /dev/null 2> /dev/null", "w");
	fwrite($fd, "username=$uname\npassword=$upass\n");

	// invalid login/pass
	if (pclose($fd)!=0) return false;

	// login ok, run a script to ensure rtorrent is running & rpc pipe has correct permissions
	system("sudo -u $uname /bin/chkrtorrent");
	return true;
}
?>
