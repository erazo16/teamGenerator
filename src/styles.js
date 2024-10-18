import styled from "styled-components";

export const ListMembers = styled.div`
    display: grid;
    gap: 1rem;
    grid-auto-rows: 4rem;
    grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
    margin: 2rem 0;
`

export const CardMembers = styled.div`
    border: 1px solid ${props => props.level === "A" ? "green" : props.level === "B" ? "yellow" : "blue"};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
`

export const CardAttendes = styled.div`
    border: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
`

export const ListTeams = styled.div`
    display: grid;
    gap: 1rem;
    grid-auto-rows: 4rem;
    grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
    margin: 2rem 0;
`

export const CardsTeams = styled.div`
    border: 1px solid white;
    border-radius: 10px;
`