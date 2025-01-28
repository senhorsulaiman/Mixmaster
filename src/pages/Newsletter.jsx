import axios from 'axios';
import React from 'react'
import { Form, redirect, useNavigation } from 'react-router-dom'
import { toast } from 'react-toastify';
const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';
export const action = async ({ request }) => {
  const formData = await request.formData()

  const data = Object.fromEntries(formData)

  try {
    const response = await axios.post(newsletterUrl, data);

    toast.success(response.data.msg)

    return redirect('/')
  }
  catch (error) {


    toast.error(error?.response.data.msg)
    return error
  }


}
const Newsletter = () => {
  const navigation=useNavigation()
  const isSubmitting=navigation.state==='submitting';
  return (
    <Form className="form" method='POST'>

      <h4 style={{ marginBottom: '2rem', fontSize: '2rem', textAlign: 'center' }}>our news letter</h4>
      <div className="form-row">
        <label htmlFor="name" className='form-label'>Name</label>
        <input required type="text" className='form-input' name='name' id='name' defaultValue='john' />

      </div>
      <div className="form-row">
        <label htmlFor="lastname" className='form-label'>last name</label>
        <input required  type="text" className='form-input' name='lastname' id='lastname' defaultValue='smith' />

      </div>
      <div className="form-row">
        <label htmlFor="email" className='form-label'>email</label>
        <input required  type="text" className='form-input' name='email' id='email' defaultValue='test@test.com' />

      </div>
      <button type='submit' className='btn btn-block' disabled={isSubmitting}>{isSubmitting?'submitting':'submit'}</button>
    </Form>
  )
}

export default Newsletter
