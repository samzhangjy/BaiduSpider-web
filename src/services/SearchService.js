import Api from '@/services/Api'
import StaticApi from '@/services/StaticApi'
import config from '@/config'
import axios from 'axios'

export default {
  searchWeb: function (query, page = 1, url = '') {
    if (url.includes('now.sh') || url.includes('vercel.app')) {
      return StaticApi().get(`/${config.staticWebServerID}?query=${encodeURIComponent(query)}&page=${page}`).then((data) => {
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
  },
  searchNews: function (query, page = 1, url = '') {
    if (url.includes('now.sh') || url.includes('vercel.app')) {
      return StaticApi().get(`/${config.staticNewsServerID}?query=${encodeURIComponent(query)}&page=${page}`).then((data) => {
        return data
      }).catch(() => {
        return 'Error'
      })
    } else {
      return Api().get(`/news?query=${encodeURIComponent(query)}&page=${page}`).then((data) => {
        return data
      }).catch(() => {
        return 'Error'
      })
    }
  }
}
