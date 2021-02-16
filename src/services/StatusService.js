import Api from '@/services/Api'

export default {
  getStatus: function () {
    return Api().get('/status').then((data) => {
      return data
    })
  }
}
