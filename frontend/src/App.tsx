import "./App.css"
// import { useGetPostsQuery } from "./api/baseApi"
import { Header } from "./components/Header"
import { RegisterForm } from "./components/RegisterForm"
import { LoginFrom } from "./components/LoginFrom"
import { useGetMeQuery } from "./api/baseApi"




function App(){
  const {data: user} = useGetMeQuery()

  
  // const {data, isError, isLoading} = useGetPostsQuery()

  // if(!data){
  //   return(
  //     <h1>Posts are not found</h1>)}
  
  // if(isLoading){
  //   return(
  //     <h1>Posts are loding</h1>
  //   )
  // }

  // if(isError){
  //   return(
  //     <h1>Error</h1>
  //   )
  // }

  return(
    <main className="main">
        <Header title="Registration & Authorization" content="create and enter your own account"/>

        {user? <p>You authorized as {user.email} </p>

        : <div className="form">
          <RegisterForm/>
          <LoginFrom/>
        </div>
        }

        {/* <PostList posts = {data}/> */}
    </main>
  )
}

export default App