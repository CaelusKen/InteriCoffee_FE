import { Button } from '@/components/ui/button'
import { ArrowRightCircle } from 'lucide-react'
import React from 'react'

const Content = () => {
  return (
    <div>
      <span className='text-white'>
        <h1 className='uppercase text-5xl font-bold'>Shop your products first...</h1>
        <p className='text-2xl'>From old vintage style to modern takes, we offer for you a wide selection for choosing one that suits your taste and style</p>
      </span>
      <Button variant="default">
        <span className='flex items-center text-white gap-4 '>
          <h3>Start shopping now</h3>
          <ArrowRightCircle />
        </span>
      </Button>
    </div>
  )
}

export default Content