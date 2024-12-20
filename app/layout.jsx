import '@styles/globals.css'
import { children } from 'react'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata={
  title:"Promptnappia",
  description:'Discover & Share AI Prompts'
}

const ROOTLayout = ({children}) => {
  return (
   <html lang='en'>
    <body>
      <Provider>
      <div className='main'>
        <div className='gradient'/>
      </div>

      <main className='app'>
        <Nav/>
        {children}
      </main>
      </Provider>
    </body>
   </html>
  )
}

export default ROOTLayout;