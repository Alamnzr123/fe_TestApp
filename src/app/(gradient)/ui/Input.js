const style = {
  borderRadius: '9px',
  background: 'rgba(255, 255, 255, 0.06)',
  height: 51
}

const Input = (props) => {
  return <input className='px-4 text-white flex outline-none placeholder-gray-500 text-sm' style={style} {...props} />
}

export default Input
