import PropTypes from 'prop-types'
import s from './ImageGalleryItem.module.css'

export default function ImageGalleryItem({ image, onClickImage }) {
  const { id, webformatURL, tags } = image

  return (
    <li key={id} className={s.ImageGalleryItem} onClick={onClickImage}>
      <img
        src={webformatURL}
        alt={tags}
        id={id}
        className={s.ImageGalleryItem_image}
      />
    </li>
  )
}

ImageGalleryItem.propTypes = {
  id: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,

  onClickImage: PropTypes.func,
}

ImageGalleryItem.defaultProps = {
  webformatURL: '',
  tags: 'Image URL',
}
