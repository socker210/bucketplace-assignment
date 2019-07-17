import React from 'react'
import { concat, clone } from 'lodash'
import Photo from '../components/Photo'
import CheckBox from '../components/CheckBox'
import InfiniteScroll from '../components/InfiniteScroll'
import Message from '../components/Message'
import { fetchPhoto } from '../../api'
import css from './photofeed.scss'

class Photofeed extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      photofeed: [],
      page: 1,
      last: false,
      checked: false,
      error: false,
      errMessage: undefined
    }

    this.onCheckBoxClick = this.onCheckBoxClick.bind(this)
    this.loadMore = this.loadMore.bind(this)
  }

  onCheckBoxClick (checked) {
    this.setState({ checked })
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

  render () {
    const {
      photofeed,
      checked,
      last,
      error,
      errMessage
    } = this.state

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
          <InfiniteScroll
            hasMore={!last}
            loadMore={this.loadMore}
            loading={<Message message='로딩중 입니다 ...' key={0} />}
          >
            <div className={css.photofeed__photo__container}>
              {
                photofeed.map(d => (
                  <Photo
                    key={d.id}
                    imageUrl={d.image_url}
                    nickName={d.nickname}
                    profileImageUrl={d.profile_image_url}
                  />
                ))
              }
            </div>
            { error && <Message message={errMessage} /> }
          </InfiniteScroll>
        </div>
      </section>
    )
  }
}

export default Photofeed