const style = {
  background: '#0E191F'
}

const Card = ({ title, children, actionButton, as, action }) => {
  const Tag = as || 'div'

  return (
    <Tag action={action} style={style} className='rounded-xl flex flex-col gap-6 px-4 py-2'>
      <div className='flex justify-between'>
        <p className='font-bold text-white text-sm'>{title}</p>
        {actionButton}
      </div>
      {children}
    </Tag>
  )
}

export default Card
