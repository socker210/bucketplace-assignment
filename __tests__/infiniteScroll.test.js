import React from 'react'
import { mount } from 'enzyme'
import InfiniteScroll from '../src/components/InfiniteScroll'

describe('InfiniteScroll', () => {
  it('Do not call loadMore when hasMore is false', () => {
    const loadMore = jest.fn()
    const wrapper = mount(
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={false}
      />
    )

    wrapper.instance().componentDidMount()

    expect(loadMore).not.toHaveBeenCalled()
  })

  it('Call loadMore when hasMore is true', () => {
    const loadMore = jest.fn()
    const wrapper = mount(
      <InfiniteScroll
        loadMore={loadMore}
        hasMore
      />
    )

    wrapper.instance().componentDidMount()

    expect(loadMore).toHaveBeenCalled()
  })
})