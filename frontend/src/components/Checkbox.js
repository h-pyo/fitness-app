const Checkbox = ({id, handleClick}) => {
  return (
    <div className="day-checkbox">
      <label>{id} </label>
      <input
        id={id}
        type="checkbox"
        onClick={handleClick}
      />
    </div>

  )
}

export default Checkbox