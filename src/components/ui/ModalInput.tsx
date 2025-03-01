interface ModalInputProps {
  label: string
  placeholder: string
  id: string
  type: string
  register: any
  labelClassName?: string
  inputClassName?: string
  defaultValue?:string;
}

const ModalInput = ({
  label,
  placeholder,
  id,
  type,
  register,
  labelClassName,
  inputClassName,
  defaultValue
}:ModalInputProps) => {
  return (
    <>
      <label className={`${labelClassName} mb-1 font-semibold`} htmlFor={id}>
        {label}
      </label>
      <input
        defaultValue={defaultValue}
        type={type}
        className={`${inputClassName} bg-dmodelInput backdrop-blur-lg rounded px-2 `}
        placeholder={placeholder}
        id={id}
        {...register(id)}
      />
    </>
  )
}

export default ModalInput
