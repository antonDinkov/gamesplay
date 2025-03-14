import { useEffect, useState } from "react";
import { Link } from "react-router";
import { get } from "../http/services";

function Home() {
    const [catalog, setCatalog] = useState([])
    useEffect(() => {
        const games = async (params) => {
            try {
                setCatalog((await get('http://localhost:3030/data/games?sortBy=_createdOn%20desc&distinct=category')).slice(0, 3));
            } catch (error) {
                alert(error.message);
            }
        }
        games()
    }, []);
    return (
        <section id="welcome-world">

            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="/images/four_slider_img01.png" alt="hero" />

            <div id="home-page">
                <h1>Latest Games</h1>

                {/* <!-- Display div: with information about every game (if any) --> */}

                {catalog.length > 0 ? (
                    catalog.map((game) => (
                        <div className="game">
                            <div className="image-wrap">
                                <img src={game.imageUrl} />
                            </div>
                            <h3>{game.title}</h3>
                            <div className="rating">
                                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                            </div>
                            <div className="data-buttons">
                                <Link to={`/catalog/details/${game._id}`} className="btn details-btn">Details</Link>
                            </div>
                        </div>
                    ))) : (
                    <p className="no-articles">No games yet</p>
                )}

                {/* <!-- Display paragraph: If there is no games  --> */}

            </div>
        </section>
    )
}

export default Home;