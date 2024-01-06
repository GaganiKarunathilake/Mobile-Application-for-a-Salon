import React from 'react'
import CustomeInput from '../components/CustomeInput';

const ResetPassword = () => {
  return (
    <div className='appBg'>
    <br />
    <br />
    <br />
    <br />
    <br />

    <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
      <h3 className="text-center">Reset Password</h3>
      <p className="text-center">Please Enter Your New Password</p>
      <form>
      <CustomeInput type="password" lable="New Password" id="pass" />
      <CustomeInput type="password" lable="Confirm Password" id="confirmpass" /><br/>
      <button className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
      style={{"background": "#ed95cc"}}
      type="submit"
      >
        Reset Password
      </button>
      </form>
    </div>
  </div>
  );
};

export default ResetPassword;