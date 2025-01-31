import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { samplebooks } from "../constants";
import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";

 const  Home= async()=> {
  const result= await db.select().from(usersTable)
  console.log(result,"[RESULT]"
  );
  
  return (
    <div>
      <BookOverview createdAt={null} {...samplebooks[9]}/>
      <BookList title={"Latest Books"} books={samplebooks} containerClassName={"mt-28"}/>
    </div>
  );
}

export default Home
