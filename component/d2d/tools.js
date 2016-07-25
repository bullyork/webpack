const apiKey = 'AIzaSyAbNGnfAzdIBl9lD1JMHyBWqU6LylDt03E'
function initGoogleApi() {
  if (!window.google) {
    let script = document.createElement('script')
    script.src = 'https://maps.googleapis.com/maps/api/js?region=sg&signed_in=false&libraries=places&key=' + apiKey
    document.body.appendChild(script)
  }
}

export {
  initGoogleApi
}