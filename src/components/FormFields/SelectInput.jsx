import React from 'react'

function SelectInput (props) {
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
}

export default SelectInput