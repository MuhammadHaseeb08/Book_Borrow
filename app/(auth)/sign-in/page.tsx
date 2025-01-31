"use client"
import AuthFrom from '@/components/AuthFrom'
import { signUpSchema,signInSchema } from '@/lib/validations'
import React from 'react'
import { signInWithCredentials } from '@/lib/actions/auth'
const SignIn = () => {
  return (
    <AuthFrom type={"SIGN_IN"}
    schema={signInSchema}
    defaultValues={
      {
        email:"",
        password:""
      }
    }
    onSubmit={signInWithCredentials}
    />
  )
}

export default SignIn