const uvform = document.querySelector('form');
const uvbar = document.querySelector('#top-search input.uv-bar');
const uvframe = document.getElementById('uv-frame');
const burners = document.querySelectorAll('input.uv-bar, .subtitle, #title-area');

uvform.addEventListener('submit', async event => {
    event.preventDefault();
    burners.forEach(burner => {
        burner.style.display = 'none';
    });
    uvframe.style.display = 'block';
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = uvbar.value.trim();
        if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;

        const rawurl = url;
        const proxied = __uv$config.prefix + __uv$config.encodeUrl(url);
        uvframe.src = proxied;
        uvbar.value = url;
    });
});

function isUrl(val = ''){
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};
