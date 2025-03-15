import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { del, get, postAuth } from "../http/services";
import { getUserId, getUserToken } from "../http/localStorage";

export default function Details() {
    const { id } = useParams()
    const [details, setDetails] = useState({});
    const [isGuest, setIsGueast] = useState(true);
    const [isOwner, setIsOwner] = useState(false)
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetched = async () => {
            try {
                const user = getUserId();
                const data = await get(`http://localhost:3030/data/games/${id}`);
                if (data._ownerId == user) {
                    setIsOwner(true);
                };
                setDetails(data);
            } catch (error) {
                alert(error.message);
            }
        }
        fetched();
    }, [id]);

    useEffect(() => {
        const user = getUserToken();
        if (user) {
            setIsGueast(false);
        }

    }, [isGuest]);

    useEffect(() => {
        if (!details._id) {
            return;
        }
        const gameId = details._id;
        const fetched = async () => {
            try {
                const requesrUrl = `http://localhost:3030/data/comments?where=gameId%3D%22${gameId}%22`
                const data = await get(requesrUrl);
                setComments(data);
            } catch (error) {
                alert(error.message);
            }
        }
        fetched();
    }, [details]);

    if (!details) return <p>Loading...</p>;

    const onDelete = async (e) => {
        e.preventDefault();

        try {
            await del(`http://localhost:3030/data/games/${id}`, 'DELETE');
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    }

    const onPostComments = async (e) => {
        e.preventDefault();
        const userId = getUserId();
        if (userId === details._ownerId) {
            return;
        };
        const gameId = details._id;
        const theComment = document.getElementsByName('comment')[0].value;
        const body = {
            gameId,
            comment: theComment
        }
        try {
            const newComment = await postAuth('http://localhost:3030/data/comments', 'POST', body);
            const form = document.querySelector('.form');
            setComments((prevComments) => [...prevComments, newComment])
            form.reset();
        } catch (error) {
            alert(error.message);
        }

    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={details.imageUrl} />
                    <h1>{details.title}</h1>
                    <span className="levels">MaxLevel: {details.maxLevel}</span>
                    <p className="type">{details.category}</p>
                </div>

                <p className="text">{details.summary}</p>

                {/* <!-- Bonus ( for Guests and Users ) --> */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {/* <!-- list all comments for current game (If any) --> */}
                        {comments.length > 0 ? (
                            comments.map((comm) => (
                                <li key={comm._id} className="comment">
                                    <p>{comm.comment}</p>
                                </li>
                            ))
                        ) : (
                        <p className="no-comment">No comments.</p>
                        )}
                    </ul>
                    {/* <!-- Display paragraph: If there are no games in the database --> */}

                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {isOwner ? (
                    <div className="buttons">
                    <Link to={`/edit/${details._id}`} className="button">Edit</Link>
                    <Link to="#" onClick={onDelete} className="button">Delete</Link>
                </div>
                ): ''}
                
            </div>

            {/* <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}

            {!isGuest ? (
                <article className="create-comment">
                    <label>Add new comment:</label>
                    <form className="form" onSubmit={onPostComments}>
                        <textarea name="comment" placeholder="Comment......"></textarea>
                        <input className="btn submit" type="submit" value="Add Comment" />
                    </form>
                </article>
            ) : ''}


        </section>
    )

};