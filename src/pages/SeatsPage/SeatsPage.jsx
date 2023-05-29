import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import selecionar from "../../components/selecionar";
import sessaoObjeto from "../../components/sessaoObjeto";

export default function SeatsPage() {

    const parameter = useParams();
    const navigate = useNavigate();
    const [sessao, setSessao] = useState(sessaoObjeto);
    const [selecionados, setSelecionados] = useState([]);
    const [nameSelecionados, setNameSelecionados] = useState([]);
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const estados = [
        {estado:"Selecionado", border:"#0E7D71", background:"#1AAE9E"},
        {estado:"Disponível", border:"#7B8B99", background:"#C3CFD9"},
        {estado:"Indisponível", border:"#F7C52B", background:"#FBE192"}
        ];

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parameter.idSessao}/seats`);

        promise.then(response => setSessao(response.data));
        promise.catch(response => console.log(response));
    },[])

    function reservarAssentos(e){
        e.preventDefault();
        const promise = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", {
            ids: selecionados,
            name: name,
            cpf: cpf
        })
        promise.then(() => navigate("/sucesso", {
            movie:sessao.movie.title,
            date:sessao.day.date + " - " + sessao.name,
            selecionados: nameSelecionados,
            name: name,
            cpf: cpf
        }))
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {sessao.seats.map(s =>
                    <SeatItem onClick={() => selecionar(s.id, selecionados, setSelecionados, s.isAvailable, nameSelecionados, setNameSelecionados, s.name)}
                    isAvailable={s.isAvailable} 
                    isSelecionado={selecionados.includes(s.id)} 
                    >
                        {s.name}
                    </SeatItem>
                )}
            </SeatsContainer>

            <CaptionContainer>
                {estados.map(e =>
                    <CaptionItem>
                        <CaptionCircle border={e.border} background={e.background} />
                        {e.estado}
                    </CaptionItem>    
                )}
            </CaptionContainer>

            <FormContainer onSubmit={reservarAssentos}>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." value={name} onChange={e => setName(e.target.value)} required />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." value={cpf} onChange={e => setCpf(e.target.value)} required />

                <button type="submit">Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={sessao.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{sessao.movie.title}</p>
                    <p>{sessao.day.weekday} - {sessao.name}</p>
                </div>
            </FooterContainer>

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
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => props.border};         // Essa cor deve mudar
    background-color: ${props => props.background};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${({isAvailable, isSelecionado}) => 
        isAvailable === true && '#7B8B99' ||
        isAvailable === false && '#F7C52B' ||
        isSelecionado === true && '#0E7D71'
    };         // Essa cor deve mudar
    background-color: ${({isAvailable, isSelecionado}) =>
        isAvailable === true && '#C3CFD9' ||
        isAvailable === false && '#FBE192' ||
        isSelecionado === true && '#1AAE9E'
    };    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`