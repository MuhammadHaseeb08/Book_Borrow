"use client"
import AuthFrom from '@/components/AuthFrom'
import { signUpSchema } from '@/lib/validations'
import React from 'react'
import { signUp } from '@/lib/actions/auth'

const SignUp = () => {
  return (
    <AuthFrom type={"SIGN_UP"}
    schema={signUpSchema}
    defaultValues={
      {
        email:"",
        password:"",
        fullName:"",
        universityCard:"",
        universityId:""
      }
    }
    onSubmit={signUp}
    />
  )
}

export default SignUp