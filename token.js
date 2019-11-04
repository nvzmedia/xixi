const fetch = require('node-fetch');
const readline = require('readline-sync');
const uuid = require('uuid/v4');
const cheerio = require('cheerio');
const chalk = require('chalk');
const delay = require('delay');
const replaceString = require("replace-string")
var sessionnya = uuid();
var requestid = uuid();
const { URLSearchParams } = require('url');


const bikinunik = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyz1234567890";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });

const bikinangka = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "1234567890";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });

const functionGojekSendOtp = (phoneNumber, sessionnya, uniknya, randnumber) => new Promise((resolve, reject) => {
    const url = 'https://api.gojekapi.com/v4/customers/login_with_phone'

    boday = {"phone":`+${phoneNumber}`}

    fetch(url, {
        method: 'POST',
        headers: {
            'X-Session-ID': sessionnya,
            'X-Platform': 'Android',
            'X-UniqueId': uniknya,
            'X-AppVersion': '3.34.1',
            'X-AppId': 'com.gojek.app',
            'Accept': 'application/json',
            'X-PhoneModel': 'Android,Custom',
            'X-PushTokenType': 'FCM',
            'X-DeviceOS': 'Android,6.0',
            'Authorization': 'Bearer',
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'okhttp/3.12.1'
        },
        body: JSON.stringify(boday)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
    })
    .catch(err => {
        resolve(err)
    })
});



const functionGojekVerify = (otpToken, otpLogin, sessionnya, uniknya) => new Promise((resolve, reject) => {
    const url = 'https://api.gojekapi.com/v4/customers/login/verify'

    boday = {
        "client_name":"gojek:cons:android",
        "client_secret":"83415d06-ec4e-11e6-a41b-6c40088ab51e",
        "data": {
            "otp": otpLogin,
            "otp_token": otpToken
        },
        "grant_type":"otp",
        "scopes":"gojek:customer:transaction gojek:customer:readonly"
    };

    fetch(url, {
        method: 'POST',
        headers: {
           'X-Session-ID': sessionnya,
            'X-Platform': 'Android',
            'X-UniqueId': uniknya,
            'X-AppVersion': '3.34.1',
            'X-AppId': 'com.gojek.app',
            'Accept': 'application/json',
            'X-PhoneModel': 'Android,Custom',
            'X-PushTokenType': 'FCM',
            'X-DeviceOS': 'Android,6.0',
            'Authorization': 'Bearer',
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'okhttp/3.12.1'
        },
        body: JSON.stringify(boday)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
    })
    .catch(err => {
        reject(err)
    })
});



(async () => {
    try{

        const uniknya = await bikinunik(16);
        console.log(chalk.yellow("Get Token Go-Jek"));
        console.log(chalk.yellow("Powered by Erza Jullian - Easy to Learn"));
        console.log("");
        const phoneNumber = readline.question(chalk.green("Input your number (EX: 628131986xxxx): +"))
        const sendOTP = await functionGojekSendOtp(phoneNumber, sessionnya, uniknya)
        console.log(sendOTP)
        const otpToken = sendOTP.data.login_token
        const otpLogin = readline.question(chalk.green("Input OTP Code: "))
        const verifyOTP = await functionGojekVerify(otpToken, otpLogin, sessionnya, uniknya)
        // console.log(verifyOTP)
        const aksestoken = verifyOTP.data.access_token
        console.log(chalk.yellow(`This is your access token: ${aksestoken}`))



    }catch(e){
        console.log(e)
    }

})();
