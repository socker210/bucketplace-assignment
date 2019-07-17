import axios from 'axios'

const instance = axios.create({ baseURL: 'https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/cards' })

export const fetchPhoto = ({ page, success, error }) => {
  return instance.get(`page_${page}.json`)
    .then(res => success(res))
    .catch(err => {
      const res = {
        status: 500,
        message: '데이터를 불러오는 도중 문제가 발생했습니다'
      }

      if (!err.response) return error(res)

      res.status = err.response.status
      res.message = err.response.statusText

      error(res)
    })
}