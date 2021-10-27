const fetch = require('node-fetch');
var randomize = require('randomatic');
var random = require('random-name');
const cheerio = require('cheerio');
const randomatic = require('randomatic');
const readline = require("readline-sync");

const functionRegistWeb = (email, reff) => new Promise((resolve, reject) => {
    const params = new URLSearchParams;
    params.append('email', email);
    params.append('mu', reff);
    params.append('no-bad-guys', 'mnp2BAQ9kct.dgz8qav')
    params.append('pid', '7HLqiP2e96L8qJyKIm2y24C20YyMx57kX5F2');

    fetch('https://www.benzinga.com/zing', { 
        method: 'POST', 
        body: params,
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9,id;q=0.8,zh;q=0.7,ko;q=0.6,ja;q=0.5,zh-CN;q=0.4',
            'cache-control': 'max-age=0',
            'content-length': 40,
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': '_ga=GA1.2.189318202.1635302146; _gid=GA1.2.1700476397.1635302146; _gat=1',
            'origin': 'https://www.benzinga.com',
            'referer': 'https://www.benzinga.com/zing?mu=588772',
            'sec-ch-ua': `"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"`,
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': "Windows",
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': 1,
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
            'X-Forwarded-For': `${randomatic('0', 2)}.${randomatic('0', 3)}.${randomatic('0', 2)}.${randomatic('0', 2)}`,
            'X-ProxyUser-Ip': `${randomatic('0', 2)}.${randomatic('0', 3)}.${randomatic('0', 2)}.${randomatic('0', 2)}`
        }
    })
    .then( async res => res.text())
    .then(text => {
        const $ = cheerio.load(text);
        const src = $("body > div > div.claim-box > div:nth-child(3)").text()
        resolve(src);
    })
    .catch(err => reject(err));
});

const functionGetLink = (nickname, domen) => new Promise((resolve, reject) => {
    fetch(`https://generator.email/`, {
           method: "get",
           headers: {
               'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
               'accept-encoding': 'gzip, deflate, br',
               'accept-language': 'en-US,en;q=0.9',
               'cookie': `_ga=GA1.2.1434039633.1579610017; _gid=GA1.2.374838364.1579610017; _gat=1; surl=${domen}%2F${nickname}`,
               'sec-fetch-mode': 'navigate',
               'sec-fetch-site': 'same-origin',
               'upgrade-insecure-requests': 1,
               'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36'
           }
       })
    .then(res => res.text())
    .then(text => {
        const $ = cheerio.load(text);
        const src = $("#email-table > div.e7m.row.list-group-item > div.e7m.col-md-12.ma1 > div.e7m.mess_bodiyy > p:nth-child(2) > a").attr("href")
        resolve(src);
    })
    .catch(err => reject(err));
});

const functionGetReal = (veryfLink) => new Promise((resolve, reject) => {
    fetch(veryfLink, {
        redirect: 'manual',
        headers: {
            'X-Forwarded-For': `${randomatic('0', 2)}.${randomatic('0', 3)}.${randomatic('0', 2)}.${randomatic('0', 2)}`,
            'X-ProxyUser-Ip': `${randomatic('0', 2)}.${randomatic('0', 3)}.${randomatic('0', 2)}.${randomatic('0', 2)}`
        }
    })
    .then(async res => {
        const result = res.headers.raw()['location']
        resolve(result)
    })
    .catch(err => reject(err))
});

const functionVeryf = (realUrl) => new Promise((resolve, reject) => {
    fetch(realUrl, {
        method: "GET",
        headers: {
            'X-Forwarded-For': `${randomatic('0', 2)}.${randomatic('0', 3)}.${randomatic('0', 2)}.${randomatic('0', 2)}`,
            'X-ProxyUser-Ip': `${randomatic('0', 2)}.${randomatic('0', 3)}.${randomatic('0', 2)}.${randomatic('0', 2)}`
        }
    })
    .then(res => res.text())
    .then(text => {
        const $ = cheerio.load(text);
        const src = $("body > div > div > div").text()
        resolve(src);
    })
    .catch(err => reject(err));
});

(async () => {

    const reff = readline.question('[?] Kode reff : ')
    const jml = readline.question('[?] Jumlah reff : ')

    console.log("")

    for(var i = 0; i < jml; i++){
        try {

            const email = `${randomize('a0', 8)}@gmailya.com`.toLowerCase()
    
            console.log(`[+] Mencoba regist web dengan ${email}`)

            do {
                var registWeb = await functionRegistWeb(email, reff)
            } while(!registWeb)
            
            console.log(`[+] ${registWeb}`)

            let count = 0;
    
            do {
                count++
                var veryfLink = await functionGetLink(`${email.split('@')[0]}`, `${email.split('@')[1]}`);
            } while (!veryfLink && count != 15);

            if(count != 15){
                console.log(`[+] Berhasil mendapatkan link verif`)
    
                const getReal = await functionGetReal(veryfLink)
                
                const realUrl = getReal[0]
        
                const veryf = await functionVeryf(realUrl)
        
                console.log(`[+] ${veryf}\n`)
            } else {
                console.log(`[!] Gagal mendapatkan link verif\n`)
            }
    
        } catch (e) {
            console.log(`[!] Err : ${e}`)
        }
    }
})();
