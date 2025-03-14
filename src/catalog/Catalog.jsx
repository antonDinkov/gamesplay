import { Link } from "react-router";
import { get } from "../http/services";
import { useEffect, useState } from "react";

export default function Catalog() {
    const [catalog, setCatalog] = useState([])
    useEffect(() => {
        const games = async (params) => {
            try {
                setCatalog(await get('http://localhost:3030/data/games?sortBy=_createdOn%20desc'));
            } catch (error) {
                alert(error.message);
            }
        }
        games()
    }, []);
    
    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {catalog.length > 0 ? (
                catalog.map((game) => (
                    <div className="allGames" key={game._id}>
                        <div className="allGames-info">
                            <img src={game.imageUrl} />
                            <h6>{game.category}</h6>
                            <h2>{game.title}</h2>
                            <Link to={`/catalog/details/${game._id}`} className="details-button">Details</Link>
                        </div>

                    </div>
                ))

            ) : (
                <h3 className="no-articles">No articles yet</h3>
            )}

        </section>
    )
}