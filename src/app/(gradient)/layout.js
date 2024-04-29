const style = {
  background: 'radial-gradient(124.23% 171.99% at 100% -3.39%, #1F4247 0%, #0D1D23 56.18%, #09141A 100%)',
  width: 375
}

export default function GradientLayout({ children }) {
  return (
    <div style={style} className='mx-auto min-h-screen flex flex-col items-center px-4'>
      {children}
    </div>
  )
}
