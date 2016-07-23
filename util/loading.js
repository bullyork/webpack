export default function loading(action) {
  const node = document.querySelector('#loading')
  if (node) {
    node.style.display = action === 'add' ? 'block' : 'none'
  }
}