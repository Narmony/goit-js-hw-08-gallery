import galleryItems from "./gallery-items.js"

// Разбей задание на несколько подзадач:

// 1 Создание и рендер разметки по массиву данных и предоставленному шаблону.
// 2 Реализация делегирования на галерее ul.js - gallery и получение url большого
// изображения.
// 3 Открытие модального окна по клику на элементе галереи.
// 4 Подмена значения атрибута src элемента img.lightbox__image.
// 5 Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// 6 Очистка значения атрибута src элемента img.lightbox__image.Это необходимо
// для того, чтобы при следующем открытии модального окна, пока грузится 
// изображение, мы не видели предыдущее.

// 1 Создание и рендер разметки по массиву данных и предоставленному шаблону.

const refs = {
  gallery: document.querySelector('.js-gallery'),
  formModal: document.querySelector('.js-lightbox'),
  eachImage: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('.lightbox__button'),
  backdrop: document.querySelector('.lightbox__overlay'),
};

let index;
let imgIndex;

{/* <li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li> */}

function createMatkupGallery(items) {
    return items.map(item => {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery__item');
        
    const galleryLink = document.createElement('a');
    galleryLink.classList.add('gallery__link');   
    galleryLink.setAttribute('href', item.original)
        
    const galleryImage = document.createElement('img');
    galleryImage.classList.add('gallery__image');
    galleryImage.setAttribute('src', item.preview);
    galleryImage.setAttribute('data-source', item.original);
    galleryImage.setAttribute('alt', item.description);
        
    index = items.indexOf(item)
    galleryImage.setAttribute('data-index', index);


    galleryLink.append(galleryImage);
    galleryItem.append(galleryLink);
    refs.gallery.append(galleryItem);
})
}

createMatkupGallery(galleryItems);

// 2 Реализация делегирования на галерее ul.js - gallery и получение url большого
// изображения.

refs.gallery.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') return;


    openModal(event);
})

function openModal(event){
    refs.formModal.classList.add('is-open');
    refs.eachImage.src = event.target.dataset.source;
    refs.eachImage.alt = event.target.alt;
    imgIndex = Number(event.target.dataset.index);
}

function closeModal(event) {
    refs.formModal.classList.remove('is-open');
    refs.eachImage.src = '';
    refs.eachImage.alt = '';
}

refs.formModal.addEventListener('click', event => {
    event.preventDefault();
    console.log(event);
    if (!event.target.classList.contains('lightbox__button') && !event.target.classList.contains('lightbox__overlay')) return;
    
    closeModal();
})


// const escBtn = event => {
//     if (event.code === 'Escape') {
//         closeModal();
//     }
// }

window.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
        closeModal();
    }
})