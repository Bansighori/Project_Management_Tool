import { useEffect, useState } from "react";
import API from "../services/api";
import "./../css/comment.css";

function CommentBox({ taskId }) {

    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadComments();
    }, []);

    const loadComments = async () => {

        try {

            const res = await API.get(`/comments/${taskId}`);

            setComments(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const addComment = async (e) => {

        e.preventDefault();

        if(message==="") return;

        try{

            await API.post("/comments",{

                taskId,

                message

            });

            setMessage("");

            loadComments();

        }

        catch(err){

            alert(err.response?.data?.message);

        }

    };

    return(

        <div className="comment-box">

            <h3>Comments</h3>

            <form onSubmit={addComment}>

                <textarea

                    rows="3"

                    placeholder="Write a comment..."

                    value={message}

                    onChange={(e)=>setMessage(e.target.value)}

                />

                <button>

                    Post Comment

                </button>

            </form>

            <div className="comment-list">

                {

                    comments.map(comment=>(

                        <div
                            key={comment._id}
                            className="comment-card"
                        >

                            <h4>

                                {comment.userId?.name}

                            </h4>

                            <p>

                                {comment.message}

                            </p>

                            <small>

                                {new Date(comment.createdAt).toLocaleString()}

                            </small>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default CommentBox;