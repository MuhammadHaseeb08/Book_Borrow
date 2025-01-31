"use server"

import { signIn } from "@/auth"
import { db } from "@/database/drizzle"
import { usersTable } from "@/database/schema"
import { hash } from "bcryptjs"


import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import ratelimit from "../rateLimit"

export const signInWithCredentials=async(params:Pick<AuthCredentials,'email'|"password">)=>{
    const {email,password}=params;
    const ip= (await headers()).get("x-forwarded-for" )|| "127.0.1.1"
    const {success}=await ratelimit.limit(ip)
    if (!success) redirect("/too-fast")
    try {
        const result= await signIn("credentials",{email,password,redirect:false});
        if (result?.error) {
            return {
                success:false,
                error:result.error
            }
            
        }
        return {success:true}
    } catch (error) {
        console.log(error,"[Signin Error]");
        return {success:false,error:"Signin Error"}
    }
}

export const signUp=async(params:AuthCredentials)=>{
    const {fullName,email,password,universityCard,universityId}=params
    const ip= (await headers()).get("x-forwarded-for" )|| "127.0.1.1"
    const {success}=await ratelimit.limit(ip)
    if (!success) redirect("/too-fast")
        
    
    const existinguser= await db.select().from(usersTable).where(eq(usersTable.email,email)).limit(1)
    if (existinguser.length>0) {
        return {success:false,error:"User already exists"}
        
    }
    const hashedPassword= await hash(password,10);
    try {
        await db.insert(usersTable).values({fullName,email,password:hashedPassword,universityCard,universityId})
        await signInWithCredentials({email,password})
        return {success:true,error:"Sign Up Error"}

        
    } catch (error) {
        console.log(error,"SignUp Error");
        return {success:false,error:"Sign Up Error"}

        
        
    }

}