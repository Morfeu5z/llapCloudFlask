function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    userID = profile.getId();
    userPic = profile.getImageUrl();
    let x = profile.getFamilyName();
    userName = profile.getGivenName() + " " + x[0] + ".";
    afterlogin();
}

function afterlogin() {
    //Zmiana widoczności panelu użytkownika
    document.getElementById("userinfo").style.display = "flex";
    document.getElementById("userimg").src = userPic;
    document.getElementById("username").innerHTML = userName;
}

/**
 * Google wylogowania
 * */
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    window.location.replace('https://accounts.google.com/signin/v2/identifier?hl=pl&continue=https%3A%2F%2Fwww.google.com%2F%3Fpli%3D1&flowName=GlifWebSignIn&flowEntry=AddSession');
}

loginTest();

function loginTest() {
    userID = 123456789;
    userPic = '/static/pic/testpic.jpg';
    let x = 'Kowalski';
    userName = "Jan" + " " + x[0] + ".";
    afterlogin();
}
