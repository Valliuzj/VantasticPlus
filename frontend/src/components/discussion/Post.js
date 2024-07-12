import { Avatar,AvatarFallback, AvatarImage} from "@radix-ui/react-avatar"
import Link from 'next/link';

export const Post =({post})=>{
    return(
    <Link href={`/post/${post.id}`}>
    <div className='lg:grid lg:grid-cols-3 bg-white h-[250px] rounded-xl shadow-lg relative bg-transparent mb-5'>
        <div className="col-span-1 flex flex-col items-center justify-center lg:items-start">
                <div className="my-5 ml-10 font-extrabold text-2xl">
                    {post.title}
                </div>
                <div className="my-5 ml-10 flex lg:justify-start">
                    <Avatar className="h-10 w-10 shrink-0 mx-2">
                            <AvatarImage src={post.author.photoURL || "https://github.com/shadcn.png"}/>
                            <AvatarFallback>CN</AvatarFallback>
                     </Avatar>
                    <p className="my-auto font-mono">{post.author.name}<span>:</span></p>
                </div>
          
        </div>
        <div className="col-span-full lg:col-span-2 flex">
            <p className="my-auto">{post.content}</p>
           
        </div>
        
    </div>
    </Link>

    )
}