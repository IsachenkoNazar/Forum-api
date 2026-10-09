import "./App.css"
import { Header } from "./components/Header"
import { PostList } from "./components/PostList"
import { posts } from "./data/posts"




function App(){
  return(
    <main className="main">
        <Header title="Forum" content="platform where you can chat with other people"/>

        <PostList posts = {posts}/>
    </main>
  )
}

export default App