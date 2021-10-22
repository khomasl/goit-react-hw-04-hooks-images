import PropTypes from 'prop-types'
import { useState, useEffect, useCallback } from 'react'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import PixabayFetch from '../../services/pixabay'
import Button from '../Button/Button'
import Modal from '../Modal/Modal'
import { notifyError } from '../notify'
import LoaderSpinner from '../Loader/Loader'
import s from './ImageGallery.module.css'

const STATUS = {
  INIT: 'init',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
}

const base_url = `https://pixabay.com/api/`
const api_key = `23045990-a26bb8d890e0b5c9b60396550`
const newPixabayFetch = new PixabayFetch(base_url, api_key)

export default function ImageGallery({ searchValue }) {
  const [gallery, setGallery] = useState([])
  const [status, setStatus] = useState(STATUS.INIT)
  const [showModal, setShowModal] = useState(false)
  const [image, setImage] = useState({})

  useEffect(() => {
    if (searchValue === '') return
    setGallery([])
    setStatus(STATUS.PENDING)
    newPixabayFetch.resetPage()
    newPixabayFetch.searchQuery = searchValue
    fetch()
  }, [searchValue])

  const scrolling = () =>
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })

  function fetch() {
    newPixabayFetch
      .searchImages()
      .then((gallery) => {
        setGallery((prevGallery) => [...prevGallery, ...gallery])
        setStatus(STATUS.SUCCESS)
        if (newPixabayFetch.page !== 1) scrolling()
      })
      .catch((err) => {
        setStatus(STATUS.ERROR)
        notifyError(err.message)
      })
  }

  const handleButtonClick = useCallback(() => {
    newPixabayFetch.page = 1
    //setStatus('pending')
    fetch()
  }, [])

  const showImage = (id) => {
    const image = gallery.find((image) => Number(image.id) === Number(id))
    setImage(image)
    toggleModal()
  }

  const handleImageClick = useCallback((e) => showImage(e.target.id), [
    showImage,
  ])

  const toggleModal = useCallback(() => setShowModal(!showModal), [showModal])

  if (status === STATUS.INIT) return <h1> </h1>

  if (status === STATUS.PENDING) return <LoaderSpinner />

  if (status === STATUS.SUCCESS) {
    return (
      gallery.length > 0 && (
        <>
          <ul className={s.ImageGallery}>
            {gallery.map((image) => (
              <ImageGalleryItem image={image} onClickImage={handleImageClick} />
            ))}
          </ul>
          <Button onClick={handleButtonClick} />
          {showModal && <Modal image={image} toggleModal={toggleModal} />}
        </>
      )
    )
  }

  if (status === STATUS.ERROR) return <h1>ALARMA!!!</h1>
}

ImageGallery.propTypes = {
  searchValue: PropTypes.string,
}

ImageGallery.defaultProps = {
  searchValue: '',
}
