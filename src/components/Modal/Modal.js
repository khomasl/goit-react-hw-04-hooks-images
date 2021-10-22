import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import s from './Modal.module.css'

export default function Modal({ image, toggleModal }) {
  const handleCloseOrEscape = (e) => {
    if (e.currentTarget === e.target || e.code === 'Escape') {
      toggleModal()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleCloseOrEscape)
    return () => window.removeEventListener('keydown', handleCloseOrEscape)
  })

  const { largeImageURL, tags } = image

  return createPortal(
    <div className={s.Overlay} onClick={handleCloseOrEscape}>
      <div className={s.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    document.getElementById('modalRoot'),
  )
}

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,

  toggleModal: PropTypes.func,
}

Modal.defaultProps = {
  largeImageURL: '',
  tags: 'large Image URL',
}
