import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { del, get } from "../http/services";

export default function Details() {
    const { id } = useParams()
    const [details, setDetails] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const fetched = async () => {
            try {
                const data = await get(`http://localhost:3030/data/games/${id}`);
                setDetails(data);
            } catch (error) {
                alert(error.message);
            }
        }
        fetched();
    }, [id])

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
                        <li className="comment">
                            <p>Content: I rate this one quite highly.</p>
                        </li>
                        <li className="comment">
                            <p>Content: The best game.</p>
                        </li>
                    </ul>
                    {/* <!-- Display paragraph: If there are no games in the database --> */}
                    <p className="no-comment">No comments.</p>
                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                <div className="buttons">
                    <Link to={`/edit/${details._id}`} className="button">Edit</Link>
                    <Link to="#" onClick={onDelete} className="button">Delete</Link>
                </div>
            </div>

            {/* <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

        </section>
    )

};