"use client";
import React, { ErrorInfo, useRef, useState } from "react";
import {
  IKImage,
  IKVideo,
  ImageKitProvider,
  IKUpload,
  ImageKitContext,
} from "imagekitio-next";
import config from "@/lib/config";
import { Button } from "./ui/button";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils";

const ImageUpload = ({onFileChange}:{
  onFileChange:(filePath:string)=>void
}) => {
  const { toast } = useToast()
  const {
    env: {
      imagekit: { publicKey, urlEndpoint },
    },
  } = config;
  const IKUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const onError = (error:any) => {
    console.log(error);
    toast({
      title: "Image upload failed",
      description: `Your image upload failed,Try again later`,
      variant:"destructive"
    })
    
  };
  const onSuccess = (res:any) => {
    setFile(res);
    onFileChange(res.filePath)
    toast({
      title: "Image uploaded",
      description: `${res.filePath} uploaded successfully`,
    })
  };

  const authenticator = async () => {
    try {
      const response = await fetch(
        `${config.env.apiEndpoint}/api/auth/imagekit`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}:${errorText}`
        );
      }
      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error: any) {
      throw new Error("Authentication request failed:", error.message);
    }
  };
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={IKUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />
         <button
        className={cn("upload-btn",)}
        onClick={(e) => {
          e.preventDefault();

          if (IKUploadRef.current) {
            // @ts-ignore
            IKUploadRef.current?.click();
          }
        }}
      >
        <Image
          src={"/icons/upload.svg"}
          alt="upload"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Ulpad File</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && (
  <IKImage  src={`https://ik.imagekit.io/haseeb07/${file.filePath}`} alt={file.filePath} width={500} height={
    500
  }/>
)}
    </ImageKitProvider>
  );
};

export default ImageUpload;
