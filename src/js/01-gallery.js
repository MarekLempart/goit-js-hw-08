import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryList = document.querySelector('.gallery');

const galleryElements = galleryItems.map(item => {
  const galleryListItem = document.createElement('li');
  const link = document.createElement('a');
  const image = document.createElement('img');

  galleryListItem.classList.add('gallery__item');
  link.classList.add('gallery__link');
  image.classList.add('gallery__image');

  link.href = item.original;
  image.src = item.preview;
  image.dataset.source = item.original;
  image.alt = item.description;

  link.appendChild(image);
  galleryListItem.appendChild(link);
  return galleryListItem;
});

galleryList.append(...galleryElements);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(galleryItems);
