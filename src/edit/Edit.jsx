import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { get, postAuth } from "../http/services";

function Edit() {
    const {id} = useParams();
    const [details, setDetails] = useState({});
    const navigate = useNavigate();
    useEffect (() => {
        const fetched = async () => {
            try {
                const data = await get (`http://localhost:3030/data/games/${id}`);
                setDetails(data);
            } catch (error) {
                alert(error.message);
            }
        }
        fetched();
    })
    if (!details) {
        return <p>Loading...</p>;
    }

    const onEdit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);7
        const data = Object.fromEntries(form);
        try {
            const fetch = await postAuth (`http://localhost:3030/data/games/${id}`, 'PUT', data);
            navigate(`/details/${id}`);
        } catch (error) {
            alert (error.message);
        }
    }

    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={onEdit}>
                <div className="container">

                    <h1>Edit Game</h1>
                    <label htmlFor="title">Legendary title:</label>
                    <input type="text" id="title" name="title" defaultValue={details.title} />

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" defaultValue={details.category} />

                    <label htmlFor="maxLevel">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" defaultValue={details.maxLevel} />

                    <label htmlFor="imageUrl">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" defaultValue={details.imageUrl} />

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" defaultValue={details.summary}></textarea>
                    <input className="btn submit" type="submit" value="Edit Game" />

                </div>
            </form>
        </section>
    )
}
export default Edit;