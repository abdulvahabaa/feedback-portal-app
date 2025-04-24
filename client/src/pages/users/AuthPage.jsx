import React from 'react'
import LoginForm from '../../components/users/LoginForm '

const AuthPage = () => {
  return (
    <div className="bg-gray-300 flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
    <div className="w-full max-w-sm md:max-w-3xl">
      <LoginForm />
    </div>
  </div>
  )
}

export default AuthPage