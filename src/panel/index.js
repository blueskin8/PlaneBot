let config, actualPage;

window.onload = () => {
    fetch('http://localhost:3000/configfile').then(res => {
        res.json().then(cfg => {
            config = cfg
        })
    })
}

const modifyContent = (newElement) => {
    //document.getElementById('fl').remove()
    let newText = document.createElement("p")
    newText.setAttribute("id", "fl")
    newText.append(document.createTextNode(newElement))
    document.getElementById('main').insertBefore(newText, document.getElementById('fl'))
}
const createElement = (newElement) => {
    let newText = document.createElement("p")
    newText.setAttribute("id", "l")
    newText.append(document.createTextNode(newElement))
    //document.getElementById('main').insertBefore(newText, document.getElementById('l'))
    document.getElementById('main').insertAdjacentElement('beforeend', newText)
}
const initPage = async () => {
    try { document.getElementById('l').remove() } catch (error) { console.log() }
    try { document.getElementById('fl').remove() } catch (error) { console.log() }
}
const deleteElement = (elementID) => { document.getElementById(elementID).remove() }


// Bouton app/name cliqué
const app_name = () => {
    if (actualPage == "app/name") return
    initPage()

    setTimeout(() => {
        actualPage = "app/name"
        modifyContent("Nom actuel du bot :" + config.application.name)
        createElement("test")
    }, 50)

}

const app_token = () => {
    if (actualPage == "app/token") return
    initPage()
    setTimeout(() => {
        actualPage = "app/token"
        modifyContent("Token actuel du bot :" + config.application.token)
    }, 50)
}