import React from 'react'
import { concat, clone, findIndex, remove } from 'lodash'
import Photo from '../components/Photo'
import CheckBox from '../components/CheckBox'
import InfiniteScroll from '../components/InfiniteScroll'
import Message from '../components/Message'
import { fetchPhoto } from '../../api'
import * as localStorage from '../utils/localStorage'
import css from './photofeed.scss'

class Photofeed extends React.Component {
  constructor (props) {
    super(props)

    this.SCRAP_ID = 'SCRAP'

    this.state = {
      photofeed: [],
      scrappedFeed: [],
      page: 1,
      last: false,
      checked: false,
      error: false,
      errMessage: undefined
    }

    this.onCheckBoxClick = this.onCheckBoxClick.bind(this)
    this.onScrapClick = this.onScrapClick.bind(this)
    this.loadMore = this.loadMore.bind(this)
  }

  componentDidMount () {
    if (!localStorage.find(this.SCRAP_ID)) {
      localStorage.set(this.SCRAP_ID, [])
    }

    const scrappedFeed = []

    localStorage.find(this.SCRAP_ID)
      .map(feed => scrappedFeed.push(feed.id))

    this.setState({ scrappedFeed })
  }

  onCheckBoxClick (checked) {
    this.setState({ checked })
  }

  onScrapClick (id, isScrapped) {
    const scrap = localStorage.find(this.SCRAP_ID)
    const scrappedFeed = clone(this.state.scrappedFeed)

    if (!isScrapped) {
      const { photofeed } = this.state
      const i = findIndex(photofeed, feed => feed.id === id)

      scrap.push(photofeed[i])
      scrappedFeed.push(photofeed[i].id)
    } else {
      remove(scrap, s => s.id === id)
      remove(scrappedFeed, feed => feed === id)
    }

    localStorage.set(this.SCRAP_ID, scrap)
    this.setState({ scrappedFeed })
  }

  loadMore () {
    let { page } = this.state
    let photofeed = clone(this.state.photofeed)

    fetchPhoto({
      page: page,
      success: res => {
        photofeed = concat(photofeed, res.data)
        page = res.data.length ? page + 1 : page

        this.setState({
          photofeed,
          page,
          last: !res.data.length
        })
      },
      error: err => {
        this.setState({
          last: true,
          error: true,
          errMessage: err.message
        })
      }
    })
  }

  renderInfiniteScrollPhotofeed () {
    const {
      photofeed,
      scrappedFeed,
      last,
      error,
      errMessage
    } = this.state

    return (
      <InfiniteScroll
        hasMore={!last}
        loadMore={this.loadMore}
        loading={<Message message='로딩중 입니다 ...' key={0} />}
      >
        <div className={css.photofeed__photo__container}>
          {
            photofeed.map(feed => (
              <Photo
                key={feed.id}
                id={feed.id}
                imageUrl={feed.image_url}
                nickName={feed.nickname}
                profileImageUrl={feed.profile_image_url}
                isScrapped={scrappedFeed.indexOf(feed.id) !== -1}
                onScrapClick={this.onScrapClick}
              />
            ))
          }
        </div>
        { error && <Message message={errMessage} /> }
      </InfiniteScroll>
    )
  }

  renderScrappedPhotofeed () {
    const scrap = localStorage.find(this.SCRAP_ID)

    if (!scrap.length) {
      return (
        <Message message='스크랩된 것이 없습니다' />
      )
    }

    return (
      <div className={css.photofeed__photo__container}>
        {
          scrap.map(feed => (
            <Photo
              key={feed.id}
              id={feed.id}
              imageUrl={feed.image_url}
              nickName={feed.nickname}
              profileImageUrl={feed.profile_image_url}
              isScrapped
              onScrapClick={this.onScrapClick}
            />
          ))
        }
      </div>
    )
  }

  render () {
    const { checked } = this.state

    return (
      <section className={css.photofeed} role='feed'>
        <div className={css.photofeed__container}>
          <div className={css.photofeed__scrap__container}>
            <CheckBox
              label='스크랩한 것만 보기'
              checked={checked}
              onClick={this.onCheckBoxClick}
            />
          </div>
          {checked ? this.renderScrappedPhotofeed() : this.renderInfiniteScrollPhotofeed() }
        </div>
      </section>
    )
  }
}

export default Photofeed