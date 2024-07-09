"use client"
import { Avatar,AvatarFallback, AvatarImage} from "@radix-ui/react-avatar"
import axios from "axios"
import { useEffect,useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Button } from "../ui/button";

export const CreatePost =()=>{
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const addPost= async ()=>{
       
            try{
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/addPost`);
    
            }catch(error){
                console.error("Error updating posts:", error);
            }finally{
                setLoading(false);
            }
        };
        addPost();
    },[]);

    return(
        <div className="flex min-h-screen w-full flex-col">
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Account Setting</h1>
          </div>
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <div className="grid gap-6">
              <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                  <CardTitle>Email</CardTitle>
                  <CardDescription>
                   Email address is your unique id.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <Input placeholder="Store Name" />
                  </form>
                </CardContent>
  
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <form>
                    <Input placeholder="Change password" />
                  </form>
                </CardContent>
  
                <CardFooter className="border-t px-6 py-4">
                  <Button>Save</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>

    )
}