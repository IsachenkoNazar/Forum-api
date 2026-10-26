import "./App.css"
import { useGetPostsQuery } from "./api/baseApi"
import { Header } from "./components/Header"
import { PostList } from "./components/PostList"




function App(){
  const {data, isError, isLoading} = useGetPostsQuery()

  if(!data){
    return(
      <h1>Posts are not found</h1>)}
  
  if(isLoading){
    return(
      <h1>Posts are loding</h1>
    )
  }

  if(isError){
    return(
      <h1>Error</h1>
    )
  }

  return(
    <main className="main">
        <Header title="Forum" content="platform where you can chat with other people"/>

        <PostList posts = {data}/>
    </main>
  )
}

export default App