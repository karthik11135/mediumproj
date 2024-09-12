

interface ButtonProps {
    btnClass?: string
    btnName: string
    onClick: () => void
}

export const Button = ({btnClass, btnName, onClick} : ButtonProps) => {
  return (
    <div onClick={onClick} className={`${btnClass} cursor-pointer font-medium p-2 rounded-md text-center bg-black text-white appearance-none`}>
      {btnName}
    </div>
  )
}
