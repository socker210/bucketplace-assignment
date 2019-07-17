import { fetchPhoto } from '../api'

describe('API', () => {
  it('##PAGE=1, Fetch photo data', async () => {
    let data

    await fetchPhoto({
      page: 1,
      success: res => data = res.data,
      error: err => data = undefined
    })

    expect(data).not.toBeUndefined()
  })

  it('##PAGE=Infinite!, Fetch photo data until data is empty', async () => {
    let page = 1
    let data

    do {
      await fetchPhoto({
        page: page++,
        success: res => data = res.data,
        error: err => { throw new Error(err.message) }
      })
    } while (data.length)

    expect(data.length).toBe(0)
  })

  it('##PAGE=Infinite!, Out of range', async () => {
    let page = 1
    let error

    while (!error) {
      await fetchPhoto({
        page: page++,
        success: res => res.data,
        error: err => error = err
      })
    }

    expect(error.status).toBe(403)
  })
})