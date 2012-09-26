Multiuser login for ruTorrent
=============================

This plugin enchances ruTorrent with cookie-based form-login multi user support.

Setting up
==========

This setup has been tested only with apache, however it should be pretty universal as long
you have working installation of PHP with _SESSION[] support.

RPC
---

First make sure you're NOT using http auth (.htaccess/.htpasswd).
Also remove all SCGI/RPC stuff from your webserver.
Enable the RPC plugin for all users by default by putting the following snippet into `conf/plugins.ini`:

    [plugins]
    rpc = enabled
    login = enabled

Second, we need to direct the SCGI/RPC plugin at proper RPC socket based on who's logged in, in your `conf/config.php`:

    $scgi_port = 0;
    session_start();
    $scgi_host = "unix:////home/".$_SESSION['login']."/.rtorrent.rpc";
    
Naturally, there must be working SCGI socket at /home/user/.rtorrent.rpc, eg.

    scgi_local=/home/user/.rtorrent.rpc

Should be in `/home/user/.rtorrent.rc`.


Authentication
--------------

Finally, you have to configure your authentication scheme in `plugins/login/conf.php`, for example:

    function auth_ok($uname,$upass) {
       if ($uname == "user" && "$upass" == "secret")
        return true;
       if ($uname == "luser" && "$upass" == "secret2")
        return true;
       return false;
    }
    
The `auth_ok()` function provides great deal of flexibility. Not only you can use arbitrary database setup,
but you can also invoke a sudo script which launches rtorrent in screen on successful login,
and fix permissions of `/home/user/.rtorrent.rpc` (because it must be R/W accessible by the webserver).

Security
--------
The plugin tries to disable all other plugins (including RPC) when no valid user credentials are present.
RPC pipe is directed according to HTTP session, so user cannot go around and RPC rtorrent of other users.

Note that all PHP scripts MUST run under different user if your users can upload .php of their own (~/public_html, a common
ie multi-purpose UNIX box). If that is your case, make sure that directory root of rutorrent uses ``suPHP``
and only that user can sudo, chmod/chown ```.rtorrent.rpc``` for users. Also check that php session files
are not readable by your local users).

