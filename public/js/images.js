let $posts        = document.querySelector('#posts')
let $loadMoreData = document.querySelector('.load-more-data')

let createElements = (tagElemet, elementId, elementClassName) => {

  let $element = document.createElement(tagElemet)
  $element.id = elementId
  $element.className = elementClassName

  return $element
}

let position = 0
let counter = 1

let loadData = async (position, counter) => {
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ position, counter })
  }

  let response = await fetch('/images', options)

  let data = await response.json()

  if(data !== null) {
    for(d of data) {
      let $title = createElements('h3', '', 'title')

      let $post = createElements('div', '', 'post')
      let $imageContainer = createElements('div', '', 'image-container')
      let $image = createElements('img', '', '')
      let $delete = createElements('a', '', 'delete')

      $title.innerHTML = d.title
      $image.src = `/statics/files/${d.file.originalname}`
      $delete.href = `/delete/${d._id}`

      $delete.innerHTML = 'Delete'

      $image.addEventListener('load', () => {
        setTimeout(() => {
          $image.style.opacity = 1
        }, 500)
      })

      $post.append($title)
      $post.append($delete)
      $post.append($imageContainer)
      $imageContainer.append($image)

      $posts.append($post)

      let widthImageContainer = $image.offsetWidth

      $imageContainer.style.height = `${widthImageContainer}px`

      window.onresize = () => {
        let widthImageContainer = $image.offsetWidth

        $imageContainer.style.height = `${widthImageContainer}px`
      }
    }
    position++
    counter++
  }
}

loadData(position, counter)

let calcule = () => {
  let { scrollTop, scrollHeight, clientHeight } = document.documentElement
  
  let x = clientHeight + scrollTop
  let y = scrollHeight - 1

  let z = x > y ? true : false

  return z
}

calcule()

window.onscroll = () => {
  if(calcule()) {
    position++
    counter++
    loadData(position, counter)
  }
}

$loadMoreData.addEventListener('click', e => {
  e.preventDefault()

  position++
  counter++
  loadData(position, counter)

})