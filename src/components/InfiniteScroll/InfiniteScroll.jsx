import React from 'react'
import PropTypes from 'prop-types'

class InfiniteScroll extends React.Component {
  constructor (props) {
    super(props)

    this.onScroll = this.onScroll.bind(this)
  }

  componentDidMount () {
    this.attachScrollListener()
  }

  componentDidUpdate () {
    if (this.debounce) {
      this.attachScrollListener()

      this.debounce = false
    }
  }

  componentWillUnmount () {
    this.detachScrollListener()
  }

  attachScrollListener () {
    window.addEventListener('scroll', this.onScroll)

    this.onScroll()
  }

  detachScrollListener () {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll () {
    const {
      offset,
      loadMore,
      hasMore
    } = this.props

    if (!hasMore || this.debounce) return

    const pos = document.documentElement.offsetHeight - window.innerHeight - Math.max(document.documentElement.scrollTop, document.body.scrollTop)

    if (pos < offset) {
      this.debounce = true
      this.detachScrollListener()

      if (typeof loadMore === 'function') {
        this.props.loadMore()
      }
    }
  }

  render () {
    const { loading, hasMore } = this.props
    const children = [this.props.children]

    if (loading && hasMore) {
      children.push(loading)
    }

    return React.createElement('div', undefined, children)
  }
}

InfiniteScroll.propTypes = {
  /**
   * Scroll offset
   */
  offset: PropTypes.number,
  /**
   * Scroll event
   */
  loadMore: PropTypes.func,
  /**
   * Has more data
   */
  hasMore: PropTypes.bool,
  /**
   * Loading component
   */
  loading: PropTypes.any
}

InfiniteScroll.defaultProps = {
  offset: 250,
  hasMore: false
}

export default InfiniteScroll