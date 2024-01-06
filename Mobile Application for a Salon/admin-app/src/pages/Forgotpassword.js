import React from 'react'
import CustomeInput from "../components/CustomeInput";

const ForgotPassword = () => {
  return (
    <div className='appBg'>
    <br />
    <br />
    <br />
    <br />
    <br />

    <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
      <h3 className="text-center">Forgot Password</h3>
      <p className="text-center">Please enter your register email to get reset password mail.</p>
      <form>
      <CustomeInput type="text" lable ="Email Address" id="email" />
      <br />
      <button className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
      style={{"background": "#ed95cc"}}
      type="submit"
      >
        Send Link
      </button>
      </form>
    </div>
  </div>
  );
};

export default ForgotPassword;