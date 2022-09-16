import { useEffect, useState } from "react"

export const Posts = () => {

    const [posts, setPosts] = useState([])
    const [post, setPost] = useState('')

    const getPosts = async () => {
        let res = await fetch('/api/posts')

        let data = await res.json()
        console.log(data)
        setPosts(data)
    }

    useEffect(()=> {
        getPosts()
    },[])


    const deletePost = async (postID) => {
        let res = await fetch(`/api/posts/${postID}`, {
            method:'DELETE'
        })
        getPosts()
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        let res = await fetch('/api/posts', {
            method:'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({post})
        })

        let data = await res.json()

        console.log(data)
        getPosts()
        setPost('')
    }

    return(
        <div>
            <form onSubmit={onSubmitHandler}>
                <input value={post} onChange={(e) => setPost(e.target.value)}/>
                <button>Submit</button>
            </form>
            <h3>Posts</h3>
            {posts.length > 0 && posts.map(post => {
                return(
                    <div key={post.id}>
                        <p>{post.post}</p>
                        <button onClick={() => deletePost(post.id)}>Delete</button>
                    </div>
                )
                
            })}
        </div>
    )
}