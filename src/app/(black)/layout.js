import AboutHeader from '@src/ui/AboutHeader'

const style = {
  background: '#09141A',
  width: 375
}

export default function BlackLayout({ children }) {
  return (
    <div style={style} className='mx-auto min-h-screen flex flex-col px-4'>
      <AboutHeader />
      {children}
    </div>
  )
}
