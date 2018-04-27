document.getElementById('isSignIn').innerText = 'Zaloguj';
var isSignIn = false;
// Dane testowe do trybu offline
var testID = 1234567890;
var testPic = "https://lh5.googleusercontent.com/-p-7kqdTngmk/AAAAAAAAAAI/AAAAAAAAAkA/LS9olK6iiME/s96-c/photo.jpg";
var testName = "Aleks S.";
var token;

/**
 * Google SignIn / funkcja wywołana po zalogowaniu
 * */
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    // console.log('Full Name: ' + profile.getName());
    // console.log('Given Name: ' + profile.getGivenName());
    // console.log('Family Name: ' + profile.getFamilyName());
    // console.log("Image URL: " + profile.getImageUrl());
    // console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + token);

    // Wywołanie zmian po zalogowaniu
    userID = profile.getId();
    userPic = profile.getImageUrl();
    let x = profile.getFamilyName();
    userName = profile.getGivenName() + " " + x[0] + ".";
    isSignIn = true;
    closeLoginForm();
    afterlogin();
    loginButton();
};

/**
 * Google wylogowania
 * */
function signOut() {
        window.location.replace('https://accounts.google.com/o/oauth2/revoke?token=' + token);
        //window.location.replace('https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://trashpanda.pwsz.nysa.pl');
}

/**
 * Zmiana w interfejsie po zalogowaniu
 * */
function afterlogin() {
    document.getElementById("userinfo").style.display = "initial";
    document.getElementById("userimg").src = userPic;
    document.getElementById("username").innerHTML = userName;
}

/**
 * Testowe logowanie
 // * */
function loginTest() {
    inDB = runajax(testID);
    userID = testID;
    userPic = testPic;
    userName = testName;
    closeLoginForm();
    afterlogin();
    loginButton();
}

/**
 *Edycja przycisku logowania i wylogowania
 * */
function loginButton() {
        document.getElementById("isSignIn").innerText = "My Trashbox";
        let btn = document.createElement("BUTTON");
        btn.className = "alx-btn";
        btn.innerText = "Wyloguj";
        btn.addEventListener("click", logout);
        document.getElementById("func-btn").appendChild(btn);
        isSignIn = true;
}

/**
 * AJAX
 */
function runajax(uid) {
    console.log(uid);
    // event.preventDefault();
    $.ajax({
        data: {
            uid: uid
        },
        type: 'POST',
        url: '/userCheck'
    })
        .done(function (data) {
            if (data.error) {
                console.log(data);
            } else {
                console.log(data.res);
            }
        })
}



/**
 * Funkcja wylogowania
 * */
function logout() {
    signOut();
    isSignIn = false;
    goTo('/');
}

/**
 * Otwórz okno logowania
 * */
var glogin = document.getElementById("alx-gbtn");

function openLoginForm() {
    if (isSignIn) {
        goTo('mytrashbox')
    } else {
        glogin.style.transition = "all 200ms";
        glogin.style.opacity = "1";
        glogin.style.zIndex = "10";
    }
}

/**
 * Zamknij okno logowania
 * */
function closeLoginForm() {
    glogin.style.opacity = "0";
    glogin.style.zIndex = "-10";
}
