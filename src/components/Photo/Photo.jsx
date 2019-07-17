import React from 'react'
import PropTypes from 'prop-types'
import css from './photo.scss'

class Photo extends React.Component {
  componentDidMount () {
    const url = this.image.getAttribute('data-src')

    this.image.setAttribute('src', url)
    this.image.addEventListener('load', e => this.image.classList.add(css.loaded))
  }

  render () {
    const {
      id,
      imageUrl,
      nickName,
      profileImageUrl,
      isScrapped,
      onScrapClick
    } = this.props

    return (
      <div className={css.photo}>
        <div className={css.photo__container}>
          <div className={css.photo__header}>
            <div className={css.photo__header__container}>
              <img src={profileImageUrl} alt='profile_pic' />
              <span>{nickName}</span>
            </div>
          </div>
          <div className={css.photo__image}>
            <div className={css.photo_image__container}>
              <img
                ref={ref => this.image = ref}
                data-src={imageUrl}
                alt='room_pic'
              />
            </div>
            <div className={css.photo__image__scrap}>
              <img
                src={isScrapped ? 'icon/scrap_on.png' : 'icon/scrap_off.png'}
                alt='scrap'
                onClick={() => onScrapClick(id, isScrapped)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Photo.propTypes = {
  /**
   * ID
   */
  id: PropTypes.number.isRequired,
  /**
   * Image
   */
  imageUrl: PropTypes.string.isRequired,
  /**
   * Nickname
   */
  nickName: PropTypes.string.isRequired,
  /**
   * Profile image
   */
  profileImageUrl: PropTypes.string.isRequired,
  /**
   * Is scrapped?
   */
  isScrapped: PropTypes.bool.isRequired,
  /**
   * Scrap click listener
   */
  onScrapClick: PropTypes.func.isRequired
}

export default Photo