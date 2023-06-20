import React from 'react'
import Searchpage from '@/components/Searchpage'
import TagSearch from '@/components/TagSearch'

const page = () => {
  return (
    <div className='min-h-screen'><Searchpage/><TagSearch></TagSearch></div>
  )
}

export default page