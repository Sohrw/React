import {json, useParams} from "react-router-dom"
import { useEffect, useState } from "react"

function Detail() {
    const { id } = useParams();
    const [loading, setLoading ] = useState(true);
    const [movieInfo, setMovie] = useState({});
    const getMovie = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        console.log(json.data.movie);
        setMovie(json.data.movie);
        setLoading(false);
        console.log(movieInfo);
        
    };
    
    useEffect(() => {
        getMovie();
        
    }, []);
    return (
        <div>
        {loading ? <h1>Loading...!</h1> : 
            <div>
                <img src={movieInfo.medium_cover_image} />
            
            </div>
        } 
        </div>
    )
}

export default Detail;