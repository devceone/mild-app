let showAddModal = document.querySelector('#show-add-modal')

let addModal = document.querySelector('#add-modal')

let close = document.querySelector('.fa-times-circle')

showAddModal.onclick = e => {

  e.preventDefault()

  addModal.style.display = 'flex'
}

close.addEventListener('click', e => {
  addModal.style.display = 'none'
})

