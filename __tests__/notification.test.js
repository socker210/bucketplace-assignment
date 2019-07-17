import React from 'react'
import { mount } from 'enzyme'
import Notification, { Toast } from '../src/components/Notification'

describe('Notification', () => {
  it('Should has a show class', () => {
    const wrapper = mount(<Notification />)

    Toast('show')

    wrapper.update()

    expect(wrapper.find('.show').length).toBe(1)
  })

  it('Should be hided message when div is clicked', () => {
    const wrapper = mount(<Notification />)

    Toast('show')

    wrapper.update()

    wrapper.find('.show').simulate('click')

    expect(wrapper.find('.show').length).toBe(0)
  })
})