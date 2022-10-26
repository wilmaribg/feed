export default function (value) {
    if (value > 1) return
    document.querySelector('#app').style.zoom = value
}
