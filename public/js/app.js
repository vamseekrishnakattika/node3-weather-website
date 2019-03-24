const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const currentLocation = document.querySelector('#current-location')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value    
    renderData('?address=' + location)
})

currentLocation.addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser.')
    }
    currentLocation.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position) => {
        renderData('?latitude='+ position.coords.latitude +'&longitude='+ position.coords.longitude)
        currentLocation.removeAttribute('disabled', 'disabled')
    })
    
})

const renderData = (location) => {
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
               messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })  
}
