console.log('Hello from content script');

function getCookies(){
    console.log('Getting cookies...');
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i=0; i<pairs.length; i++){
      var pair = pairs[i].split("=");
      cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
    }
    const url = document.location.origin
    
    console.log({url, cookies});
}

// getCookies()