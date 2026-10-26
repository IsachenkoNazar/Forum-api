import type { PostWithCategory } from "../types/posts";
import { PostCard } from "./postCard";


interface PostListProps{
    posts: PostWithCategory[]
};

export function PostList(props: PostListProps){
    const {posts} = props

    return(
        <div className="posts">
            {posts.map((post) =>  {
                return(
                    <PostCard post={post}/>
                )})}
        </div>
            
    )
}

