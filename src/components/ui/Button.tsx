interface ButtonProps {
  text: string
  action?: Function
  className?: string
  disabled?: boolean
  icon?: React.ReactNode
  variant?: 'primary' | 'danger'
  imgClass?: string
}
const variantClasses = {
  primary: 'hover:bg-dwhite hover:text-black border border-dwhite',
  // primary: 'hover:bg-violet-50 hover:text-black border border-violet-300',
  danger: 'hover:bg-red-500 hover:text-black border border-red-500'
}

const Button = ({
  text,
  action,
  className,
  disabled,
  variant,
  icon
}: ButtonProps) => {
  const variantStyle = variant ? variantClasses[variant] : ''
  return (
    <button
      className={
            `${className} ${variantStyle}
            text-neutral  font-bold py-2 px-4 rounded 
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            cursor-pointer`
            
        }
        onClick={()=> action && action()}
    >
      <span className='flex items-center justify-center gap-2 font-script'>
        {icon}
        {text}
      </span>
    </button>
  )
}
export default Button

