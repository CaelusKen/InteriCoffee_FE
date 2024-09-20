import React from 'react'
import Content from './content'
import Slider from './slider'

export default function EcommerceSection()  {
  return (
    <section className='flex justify-between items-center px-[108px] gap-[64px]'>
      <Content/>
      <Slider/>
    </section>
  )
}
