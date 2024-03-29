import axios from 'axios'

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
});

request.interceptors.request.use((req) => {
    if (req.method == "get") {

        let rawurl = req.url
        let cookies = "&cookie=ariaDefaultTheme=default; ariaFixed=true; ariaReadtype=1; ariaoldFixedStatus=false; ariaStatus=false; _ntes_nuid=7f92ce9ae51875319fd401169064cace; _ntes_nnid=7f92ce9ae51875319fd401169064cace,1655995195178; WNMCID=njdgyj.1655995195288.01.0; WEVNSM=1.0.0; NMTID=00O6S49mvsOpmViQ0jUkwzE2rdCE_EAAAGBkQFfdg; WM_TID=LoC981sYMAxAQBBUQFKQEpdHERZsEW//; __root_domain_v=.163.com; _qddaz=QD.844256263622631; wyy_uid=abec542f-a163-492d-97b0-cd2c0cb078bd; locale=zh_CN; WM_NI=HvGcvnm6YKQTqDiayDy8rQDe5Uo4UJxNUZbZu5bXTxuJKHJa8AyiT8uU7P809Q1e4lnkZhkkPYtLzXoJi2QbZISS1AwIrwcA0JNwhp3QhIVe4AlvbVxf2JA4Zdv/DgxTa2I=; WM_NIKE=9ca17ae2e6ffcda170e2e6eed9ef6682ed89dab543a8ef8eb3c15a938e9badd44d8d9fb6a9d85faceea08cd82af0fea7c3b92a8caa8984f566afea97acd460b39ca782fc50bbe8beb2c76ff78ba1d5d842bc929bbbe152b7ebaeb9d774b79685a9c96bfc9fb78ad734b78bf9b1bb3cfb8fff86b768aeb59689ea619487bcadf954ad96a7d3d46a9a979db4b44bb597be98e24bf4968298eb7cf18fa8aad56ff89fa497e15ebcbafeabc4409abcbad0c76dbc8cafd3cc37e2a3; JSESSIONID-WYYY=KGK+NVf6GKrRTMujsYF83RUkX5ZKc9txAvuth/fHiSNDD1oOIo8najVqCWGTEkv5V\kYuoU6fpTX3RKYFr6wUg8wJxmEKoZmsAlg+5gAKeUy64KG2o16ruHWU7C/776CV4VwcutYs5CCBXlWsEGPNz0aysWUwtAdenbmApBRg4ozjKSO:1661166405778; _iuqxldmzr_=33; __snaker__id=RQWSt5ikOo13k1bE; gdxidpyhxdE=zOoVoGZMnM589z1lYk0h8n0OMXEnqEoE6fhnlWvIuQ36AXO4jOKD5HTUaZC+4oaBV/8uRWXQH0zrhayaJg50ouQCv3PxnOy4TJMexxA\IYtsYfg6QWDH8cEdA8hBnkJmeG7m67u\mkKdpXZtxCB40u1YhQhRh1P1rfGqXWHMeHuW8QiG:1661165508045; _9755xjdesxxd_=32; YD00000558929251:WM_NI=ccBFNB1KCidxibnA1Oy67DvH5l/9YBktPp1xe4AhC1d2MGM+hSs1CZck2CyQI7EJ2jCI3PT5//lqHZqcGVZNdzVDexSxHTFKDGZc0LkkDDohpjL/K3hOipAAXLoANA0tT1Y=; YD00000558929251:WM_NIKE=9ca17ae2e6ffcda170e2e6ee85c65cf8acb7a6ee60aa9e8ea3d54f938f9b83c460898ea7b5d45bf2be8ed0cc2af0fea7c3b92aa1bd8ea7cd4af3958d8ae774abbea2a2b445bbeaf9a5f544f7b4e1dadc4aa9aca091b474a7ec8f89c23ba8ee83a8d021ac8dbdd2c252a1b5fea4fc5b8be98babb1628197fdb1d73fedf1a492cb52b3bd89b7d946a8a69aa5e87491a888b5c54188999684b348a9b58ca5ee64b4b684d0ca39ac91a791c44b9c94a1a2cd4bf4ac9cd2dc37e2a3; YD00000558929251:WM_TID=MK78qgC1LPxBEQAFURLUWeFySBUzKEvN; MUSIC_U=bd1a4c5ac75b8d5d25a71cf4c1188cbd7b5d303dee651d5c15398b2f74b34c70519e07624a9f005391690e8f877dacbb23d873f2977eb28ef78851057c722e3c13eb2cf71930bf86a0d2166338885bd7; __csrf=cf1028bae4cc19ee9c28da63e020c048; playerid=63704585"
        req.params = { cookies }
    }
    return req
})


export default request;