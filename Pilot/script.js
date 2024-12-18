let cookies = []

async function getCookies(){
    console.log('Getting cookies');

    // Clear cookies count
    cookies = []
    const cookiesCntEl = document.getElementById("cookies-cnt");
    cookiesCntEl.textContent = "0"
     // Communicate with background file by sending a message

  chrome.runtime.sendMessage({
    type: "GET_COOKIES",
  }, res=>{
    if (res.success){
        cookies = res.data.cookies
        cookiesCntEl.textContent = cookies.length
    }else
    console.log({res});
  })

}
const copyCookies = ()=>{
    console.log('Copying cookies...');
    navigator.clipboard.writeText(JSON.stringify(cookies || []))
    alert(cookies.length , "Cookies copied!")
}

document.getElementById("cookie-btn").onclick = getCookies;
document.getElementById("cpy-cookies-btn").onclick = copyCookies;

async function gs(){
    console.log('Getting screen details');
    const s = await getScreenDetails()
    console.log({s});
}

