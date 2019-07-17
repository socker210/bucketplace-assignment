import React from 'react'
import Photo from '../components/Photo'
import CheckBox from '../components/CheckBox'
import { fetchPhoto } from '../../api'
import css from './photofeed.scss'

class Photofeed extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: [],
      checked: false
    }

    this.onCheckBoxClick = this.onCheckBoxClick.bind(this)
  }

  componentDidMount () {
    fetchPhoto({
      page: 1,
      success: res => {
        this.setState({ data: res.data })
      },
      error: err => {
        console.log(err)
      }
    })
  }

  onCheckBoxClick (checked) {
    this.setState({ checked })
  }

  render () {
    const { data, checked } = this.state

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
          <div className={css.photofeed__photo__container}>
            {
              data.map(d => (
                <Photo
                  key={d.id}
                  imageUrl={d.image_url}
                  nickName={d.nickname}
                  profileImageUrl={d.profile_image_url}
                />
              ))
            }
          </div>
        </div>
      </section>
    )
  }
}

export default Photofeed