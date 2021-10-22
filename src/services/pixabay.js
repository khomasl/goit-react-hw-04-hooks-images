import axios from 'axios'
import { notifyError } from '../components/notify'

export default class PixabayFetch {
  constructor(base_url, api_key) {
    this.base_url = base_url
    this.api_key = api_key
    this._searchQuery = ''
    this._page = 1
    this._perPage = 12
    this.endPoint = ''
  }
  get searchQuery() {
    return this._searchQuery
  }
  set searchQuery(value) {
    return (this._searchQuery = value)
  }
  get page() {
    return this._page
  }
  set page(value) {
    return (this._page += value)
  }
  get perPage() {
    return this._perPage
  }
  set perPage(value) {
    return (this._perPage = value)
  }

  resetPage() {
    return (this._page = 1)
  }

  async searchImages() {
    const type = 'image_type=photo&orientation=horizontal'
    let params = `?q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${this.api_key}&${type}`
    let url = this.base_url + this.endPoint + params

    try {
      const result = await axios.get(url)
      return await result.data.hits
    } catch (err) {
      return notifyError(err.message)
    }
  }
}
