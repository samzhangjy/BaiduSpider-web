import Api from '@/services/Api'

export default {
  searchWeb: function (query, page = 1) {
    return Api().get(`/web?query=${encodeURIComponent(query)}&page=${page}`).then((data) => {
      return data
    })
  }
}
