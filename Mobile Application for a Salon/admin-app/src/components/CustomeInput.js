import React from 'react'

const CustomeInput = (props) => {
    const {type, lable, i_id, i_class, name, val, onCh, onBl} = props;
  return (
  <div class="form-floating mt-3">
  <input 
  type={type} 
  className={`form-control ${i_class}`}
  id={i_id} 
  placeholder={lable}
  name= {name}
  value={val}
  onChange={onCh}
  onBlur={onCh}
  />
  <label htmlFor={lable}>{lable}</label>
</div>
  ); 
};

export default CustomeInput;