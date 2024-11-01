const uvform = document.querySelector('form');
const uvbar = document.querySelector('#top-search input.uv-bar');
const uvframe = document.getElementById('uv-frame');

uvform.addEventListener('submit', async event => {
    event.preventDefault();
    uvform.style.display = 'none';
    uvframe.style.display = 'block';
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = uvbar.value.trim();
        if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;

        const rawurl = url;

        uvframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

function isUrl(val = ''){
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};
