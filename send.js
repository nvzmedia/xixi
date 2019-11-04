const fetch = require('node-fetch');
const readline = require('readline-sync');
const uuid = require('uuid/v4');
const cheerio = require('cheerio');
const fs = require('async-file');
const chalk = require('chalk');
const delay = require('delay');
const replaceString = require("replace-string")
var sessionnya = uuid();
var requestid = uuid();
const { URLSearchParams } = require('url');
const mytoken = process.env.mytoken;
const mypin = process.env.mytoken;


const bikinunik = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyz1234567890";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });


const getqr = (nomornya, sessionnya, uniknya) => new Promise((resolve, reject) => {
    fetch(`https://api.gojekapi.com/wallet/qr-code?phone_number=%2B${nomornya}`, {
    method: 'GET',
        headers: {
        
            "X-AppVersion": "3.39.1",
            "X-AppId": "com.gojek.apt",
            "X-Session-ID": "16037541-56e6-4222-8832-b1880c0e3101",
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-Platform": "Android",
            "X-UniqueId": "942cfeec6dbae611",
            "X-PhoneModel": "Xiaomi,Redmi Note 4",
            "X-PushTokenType": "FCM",
            "X-DeviceOS": "Android,6.0",
            "User-uuid": "651315742",
            "X-DeviceToken": `fKdqgKSP_UM:APA91bE6VDYBPGA6N8_-CK9fyksdTzKdqMc3wOSGAwtxI5A4HK-6-hLZxptMgsDsZmg5rm2aiVLhL6CNb7jU9NRzMrAP8GdQncM4CikibyOgjbncfSGeDUDJBbVRltPQdzfpo5L0OvI-`,
            "Authorization": `Bearer ${mytoken}`,
            "Accept-Language": "en-ID",
            "X-User-Locale": "en_ID",
            "Host": "api.gojekapi.com",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.12.1"

        },
        
    })
    .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            reject(result)
        })
});


const send = (jumlah, myqr, sessionnya, uniknya) => new Promise((resolve, reject) => {
    const url = 'https://api.gojekapi.com/v2/fund/transfer'
    const badan = {
        "amount": jumlah,
        "description":"💰",
        "qr_id": myqr
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'X-Session-ID': sessionnya,
            "pin": mypin,
            'X-Platform': 'Android',
            'X-UniqueId': uniknya,
            'X-AppVersion': '3.34.1',
            'X-AppId': 'com.gojek.app',
            'Accept': 'application/json',
            // 'D1': '03:25:1E:AE:CD:AF:35:FE:18:3C:15:B4:1F:94:6C:C2:0E:54:3D:84:3A:49:89:59:D9:90:EB:62:B8:AC:26:9C',
            'X-PhoneModel': 'Android,Custom',
            'X-PushTokenType': 'FCM',
            'X-DeviceOS': 'Android,6.0',
            "User-uuid": "651315742",
            'Authorization': `Bearer ${mytoken}`,
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'okhttp/3.12.1'
        },
    body: JSON.stringify(badan)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result) // console.log(result) PENTING
    })
    .catch(err => {
        reject(err) // console.log(err) PENTING
    })

});

const cekwallet = (sessionnya, uniknya) => new Promise((resolve, reject) => {
    fetch('https://api.gojekapi.com/wallet/profile', {
    method: 'GET',
        headers: {
        
            'X-Session-ID': sessionnya,
            'X-Platform': 'Android',
            'X-UniqueId': uniknya,
            'X-AppVersion': '3.34.1',
            'X-AppId': 'com.gojek.app',
            'Accept': 'application/json',
            // 'D1': '03:25:1E:AE:CD:AF:35:FE:18:3C:15:B4:1F:94:6C:C2:0E:54:3D:84:3A:49:89:59:D9:90:EB:62:B8:AC:26:9C',
            'X-PhoneModel': 'Android,Custom',
            'X-PushTokenType': 'FCM',
            'X-DeviceOS': 'Android,6.0', 
            'Authorization': `Bearer ${mytoken}`,
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'okhttp/3.12.1'
        },
        
    })
    .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            reject(result)
        })
});


(async () => {
    try{
        
        const uniknya = await bikinunik(16);
        console.log(chalk.yellow("Send RP Go-Pay"));
        console.log(chalk.yellow("Powered by Erza Jullian - Easy to Learn"));
        console.log("");
        const cekwalletsaya = await cekwallet(sessionnya, uniknya);
        const balancesaya = chalk.green(`${cekwalletsaya.data.balance}`);
        console.log(chalk.yellow(`Send RP Go-Jek`));
        console.log("")
        console.log(chalk.yellow(`Available balance on your account: ${balancesaya}`));
        const nomornya = readline.question(chalk.yellow("Input your number (EX: 628131986xxxx / 1660354xxxx): "))
        const qr = await getqr(nomornya, sessionnya, uniknya);
        const myqr = qr.data.qr_id;
        const jumlah = readline.question(chalk.yellow("Input amount you want to transfer: "))
        // console.log(qr.data.qr_id)
        const sendwallet = await send(jumlah, myqr, sessionnya, uniknya)
        // console.log(sendwallet)
        if(sendwallet.success === true){
            console.log(chalk.green(`Successfully sent Rp. ${jumlah} to +${nomornya}`))
            const savenumber = await fs.appendFile('successtf.txt',`Rp. ${jumlah} => ${nomornya}\n`, function (err) {
                if (err) throw err;
                console.log('Gagal Menyimpan Acces Token!');});
        }else{
            console.log(chalk.red(`Failed to send money`))
        }


        
    }catch(e){
        console.log(e) 
    }

})();
