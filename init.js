plugin.loadMainCSS();
plugin.loadLang();

plugin.onLangLoaded = function()
{
    var before = (theWebUI.systemInfo.rTorrent.started ? "add" : "settings");
    this.addButtonToToolbar("logoff", theUILang.loginOut + " (" + plugin.me + ")", "theDialogManager.show('loginDlg')", before);
    this.addSeparatorToToolbar(before);
    loginDlg = ""+
		"<form id=\"loginForm\" method=\"POST\" action=\"plugins/login/auth.php?return="+encodeURIComponent(document.location.href)+"\"><div id=\"loginDlg-content\" class'fxcaret'>"+
            "<div>"+
                "<label for=\"login.username\">" + theUILang.loginUsername + ":</label> "+
		"<input type=\"text\" id=\"login.username\" name=\"login_username\" class=\"Textbox\" /> "+
            "</div>"+
            "<div>"+
                "<label for=\"login.password\">" + theUILang.loginPassword + ":</label> "+
                "<input type=\"password\" id=\"login.password\" name=\"login_password\" class=\"Textbox\" />"+
            "</div>"+
        "</div>"+
        "<div id=\"loginDlg-buttons\" class=\"buttons-list\" style=\"text-align: center;\">"+
            "<input type=\"submit\" class=\"Button\" value=\"" + theUILang.loginButton + "\" id=\"loginComplete\">"+
        "</div></form>";

    theDialogManager.make("loginDlg", theUILang.loginTitle, loginDlg, true, true);
	theDialogManager.setHandler('loginDlg','afterShow',function()                                                                                                              
	{
		// forgetting the PHP session is enough
		document.cookie = "PHPSESSID=";

		// the GUI seems to confuse focus() :(
		setTimeout(function() {
			document.body.focus();
			$$('login.username').focus();
		}, 100);
	});     
    if (!plugin.me)
       theDialogManager.show("loginDlg");
}

plugin.onRemove = function()
{
    theDialogManager.hide("loginDlg");
    this.removeSeparatorFromToolbar(theWebUI.systemInfo.rTorrent.started ? "add" : "settings");
    this.removeButtonFromToolbar("logoff");
}
