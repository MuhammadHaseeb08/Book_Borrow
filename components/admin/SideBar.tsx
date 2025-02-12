"use client";
import { adminSideBarLinks } from "@/app/constants";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Session } from "next-auth";

const SideBar = ({ session }: { session: Session }) => {
  const pathName = usePathname();
  return (
    <div className="admin-sidebar">
      <div className="">
        <div className="logo">
          <Image
            src={"/icons/admin/logo.svg"}
            height={37}
            width={37}
            alt="logo"
          />
          <h1>Book Wise</h1>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((item, i) => {
            const isSelected =
              (item.route !== "/admin" &&
                pathName.includes(item.route) &&
                item.route.length > 1) ||
              pathName === item.route;
            return (
              <Link href={item.route} key={item.route}>
                <div
                  className={cn(
                    "link",
                    isSelected && "bg-primary-admin shadow-sm"
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={item.img}
                      alt="icon"
                      fill
                      className={`${
                        isSelected ? "brightness-0 invert" : ""
                      }  object-contain`}
                    />
                  </div>
                  <p
                    className={cn(isSelected ? "text-white" : "text-dark-100")}
                  >
                    {item.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="user">
          <Avatar>
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback className="bg-amber-100 ">
              {getInitials(session?.user?.name || "IN")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col max-md:hidden">
            <p className="font-semibold text-dark-200">{session?.user?.name}</p>
            <p className="text-xs text-light-500">{session?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
