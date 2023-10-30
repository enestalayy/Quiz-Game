export const SelectInput = (props) => {
    const { id, name, options, onChange, value } = props;
  
    return (
      <select id={id} name={name} onChange={onChange} value={value}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
};
export const RadioInput = (props) => {
    
}