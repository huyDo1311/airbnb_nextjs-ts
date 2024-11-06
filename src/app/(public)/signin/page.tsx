import React from 'react'
import SigninForm from './SigninForm'

export default function SigninPage() {
  return (
    <div>
      <h1 className="text-4xl font-semibold text-center">Đăng nhập</h1>
      <div className="grid grid-cols-3">
        <div className="col-start-2">
          <SigninForm/>
        </div>
      </div>
    </div>
  )
}
