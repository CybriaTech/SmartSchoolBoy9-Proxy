const uvframe = document.getElementById('uv-frame');

function backward() {
  uvframe.history.back();
}

function forward() {
  uvframe.history.forward();
}

function refresh() {
  uvframe.src = uvframe.src;
}
