import React, { useState } from 'react'
import RichTextEditor from 'react-rte';
import CustomInput from "../components/CustomeInput";

const Addemployee = () => {
    const[desc, setDesc] = useState();
    const handleDesc =(e) => {
        console.log(e);
    };
  return (
  <div>
    <h3 className='mb-4'>Add Employee</h3>
    <div className=''>
        <form action="">
            <CustomInput type = "text" label ="Enter Product Name"/>
            <select name="" id="">
                <option value="">Select Product Category</option>

            </select>
            <RichTextEditor value={this.state.value} onChange={(evt) => {
               handleDesc(evt.target.value); 
            }}
      />
        </form>
    </div>
  </div>
  );
};

export default Addemployee