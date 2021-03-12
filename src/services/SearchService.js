import Api from '@/services/Api'
import axios from 'axios'

export default {
  searchWeb: function (query, page = 1) {
    console.log(process.env)
    if (process.env.VERCEL == 1 || process.env.VERCEL == '1') {
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
