const log = (...args) => console.log("[BG]", ...args);

log('Hello from BG', new Date().toISOString());

const getCookieDomains = async () => {
    log("Getting cookie domains...");
    const cookies = await chrome.cookies.getAll({});
    const youtubeCookies = cookies.filter(
        (cookie) =>
            cookie.domain.includes("youtube") ||
            cookie.domain.includes("google")
    );

    // Extract unique domains
    const uniqueDomains = [
        ...new Set(youtubeCookies.map((cookie) => cookie.domain)),
    ];

    log("YouTube-related domains:", uniqueDomains);
    return uniqueDomains;
};

const fetchYouTubeCookies = async (domains) => {
    log('Fetching youtube cookies...');
    const cookies = [];
  
    for (const domain of domains) {
      const domainCookies = await chrome.cookies.getAll({  });
      cookies.push(...domainCookies);
    }
  
    log("YouTube-related cookies:", cookies);
    return cookies;
  };

(async () => {
    return
    const domains = await getCookieDomains();
    log("Unique domains with cookies related to YouTube:", domains);
    await fetchYouTubeCookies(domains)
})();



async function getCookies(){
    log('Getting cookies...');
    const cookies = await chrome.cookies.getAll({  });
    return cookies
}
chrome.runtime.onMessage.addListener( (req, sender, res)=>{
    log("onMessage");
    if(req.type == "GET_COOKIES"){
        (async () => {
            log('here');
            const cookies =  await getCookies(); 
            log('Now here');
            res({success: true, data: {cookies}})
        })()
        return true
    }else{
        log({req, sender, res})
    }
    
})