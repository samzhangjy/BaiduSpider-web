import Api from '@/services/Api'
import axios from 'axios'

export default {
  searchWeb: function (query, page = 1, url = '') {
    if (url.includes('now.sh') || url.includes('vercel.app')) {
      return Api().get(`/?query=${encodeURIComponent(query)}&page=${page}`).then((data) => {
        return data
      }).catch(() => {
        return 'Error'
      })
    } else {
      return Api().get(`/web?query=${encodeURIComponent(query)}&page=${page}`).then((data) => {
        return data
      }).catch(() => {
        return 'Error'
      })
    }
  },
  getVideoAddress: function (url) {
    const req = axios.create()
    req.get(url).then((data) => {
      console.log(data)
    })
  }
}
