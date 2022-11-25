import React from 'react'

// This component represents the About page - that explains about this project.

const About = () => {
  return (
    <div className='MainDiv'>
      <div >
        <h1>
          So what is this
          <span>&nbsp;</span>
          <span className='h1_FarmerMarketOnline'>Farmer's Market
            <span className='h1_Online '>Online</span
            ></span>
          <span>&nbsp;</span>
          is all about?
        </h1>

        <hr />

        <div class="aboutText">
          <p style={{ width: "96%" }}>
            For the graduation project in the Full-Stack Python Course at John Bryce College, we created
            this web app using Django and React.js.<br />
            We wanted to create something that is a bit different from a conventional e-commerce.
            We were motivated by the challenge of finding the logics of having users being able to
            serve both as costumers and as sellers or "stand owners".
          </p>

          <p style={{ width: "88%" }}><hr />
            The idea of creating the Farmer's Market Online came from the nostalgic memory we both shared
            of travelling overseas and coming across sweet local markets, where locals can open a stand and
            sell their goods whatever they may be - vegetables, fruits, chees, homemade clothes and works of art
            and whatever else one can think of.
          </p>

          <p style={{ width: "80%" }}><hr />
            Working on this project was an amazing learning experience that deepened our passion for programming.
            There are so many things that we have learned, from how to write code better to how we could have
            structured and arranged our program differently in the future projects.

          </p>
        </div>
      </div>
      <div className='facePhotosContainer'>
        <div className='faceAndNameContainer'>
          <div><p className='photoName'>Yanay Kolodny</p></div>
          <div className='faceDivYanay' />
        </div>
        <div className='faceAndNameContainer'>
          <div><p className='photoName'>Michael Stern</p></div>
          <div className='faceDivMichael' />
        </div>
      </div>
    </div>
  )
}

export default About