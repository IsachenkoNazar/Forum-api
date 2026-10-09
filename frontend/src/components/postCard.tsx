import type { Post } from "../types/posts";


interface PostCardProps{
    post: Post
}

export function PostCard(props: PostCardProps){
    const{
        title,
        content,
        author,
        category
    }
 = props.post;

return (
    <div className="post">
        <p>{title}</p>
        <p>{content}</p>
        <p>{author}</p>
        <p>{category}</p>
        <button className="button">see more</button>
    </div>

    )
}