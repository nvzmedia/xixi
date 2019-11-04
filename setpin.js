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
    
const functionSetPin = (pin, otpPin, aksesnya, uuid, uniqid) => new Promise((resolve, reject) => {
	const url = 'https://api.gojekapi.com/wallet/pin';

	const badan = {
		"pin":pin
	};

	fetch (url, {
		method : 'POST',
		headers : {
			'otp': otpPin,
			'X-Session-ID': uuid,
			'X-Platform': 'Android',
			'X-UniqueId': uniqid,
			'X-AppVersion': '3.34.1',
			'X-AppId': 'com.gojek.app',
			'Accept': 'application/json',
			// 'D1': '03:25:1E:AE:CD:AF:35:FE:18:3C:15:B4:1F:94:6C:C2:0E:54:3D:84:3A:49:89:59:D9:90:EB:62:B8:AC:26:9C',
			'X-PhoneModel': 'Android,Custom',
			'X-PushTokenType': 'FCM',
			'X-DeviceOS': 'Android,6.0',
			// 'User-uuid': accountId, 
			'Authorization': `Bearer ${aksesnya}`,
			'Accept-Language': 'en-ID',
			'X-User-Locale': 'en_ID',
			'Content-Type': 'application/json; charset=UTF-8',
			'User-Agent': 'okhttp/3.12.1'
		},
		body: JSON.stringify(badan)
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
        
        console.log(chalk.yellow("SET PIN Go-Jek with Access Token"));
        console.log(chalk.yellow("Powered by Erza Jullian - Easy to Learn"));
        console.log("");
        const uniknya = await bikinunik(16);
        const acakadut = await bikinunik(8);
        const aksesnya = readline.question(chalk.yellow("Input your access token: "))
        const pin = readline.question(chalk.yellow("Input your PIN: "))
        const setOtpPin = await functionSetPin(pin, '', aksesnya, sessionnya, uniknya);
        await delay(2000)
        const otpPin = readline.question("OTP Code: ")
        const setPin = await functionSetPin(pin, otpPin, aksesnya, sessionnya, uniknya);
        console.log(setPin)
        

    }catch(e){
        console.log(e) 
    }

})();
