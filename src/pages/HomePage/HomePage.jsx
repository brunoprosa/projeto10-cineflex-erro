import axios from "axios";
import { useState, useEffect } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom";

export default function HomePage() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies");

        promise.then(response => {setMovies(response.data)})
        promise.catch(response => console.log(response))
    },[])

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>

                {movies.map((movie) =>
                    <Link to={`/sessoes/${movie.id}`}>
                        <MovieContainer>
                            <img src={movie.posterURL}/>
                        </MovieContainer>
                    </Link>
                )}

            </ListContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`