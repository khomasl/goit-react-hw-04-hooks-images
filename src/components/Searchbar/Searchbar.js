import PropTypes from 'prop-types'
import { useState, useCallback } from 'react'
import s from './Searchbar.module.css'

export default function Searchbar({ getSearchValue }) {
  const [searchValue, setSearchValue] = useState('')

  const handleChange = useCallback((e) => setSearchValue(e.target.value), [])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      getSearchValue(searchValue)
      setSearchValue('')
    },
    [searchValue],
  )

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          name="searchValue"
          value={searchValue}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  )
}

Searchbar.propTypes = {
  getSearchValues: PropTypes.func,
}
