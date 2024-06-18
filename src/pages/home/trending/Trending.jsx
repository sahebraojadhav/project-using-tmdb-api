import React from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'

function Trending() {

    const onTabChange=(tab)=>{

    }

  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitile">
                Trending
            </span>
            <SwitchTabs data={["day","week"]} onTabChange={onTabChange}/>
        </ContentWrapper>
    </div>
  )
}

export default Trending
