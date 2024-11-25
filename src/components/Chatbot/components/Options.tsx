export const Options = (props: any) => {
  return (
    <div className='options'>
      {/* <h1 className='options-header'>{props.title}</h1> */}
      <div className='options-container'>
        {props.options.map((option: any) => {
          return (
            <div className='option-item' onClick={option.handler} key={option.id}>
              {option.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}
