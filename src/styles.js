import { Input } from "antd";
import styled from "styled-components";

export const ListMembers = styled.div`
    display: grid;
    gap: 1rem;
    grid-auto-rows: 4rem;
    grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
    margin: 2rem 0;
`

export const CardMembers = styled.div`
    border: 1px solid ${props => props.selectedPlayer ? "red" : "white" };
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
    grid-auto-rows: auto;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    margin: 2rem 0;
`

export const CardsTeams = styled.div`
    border: 1px solid white;
    border-radius: 10px;
    text-align: center;
    padding: 2rem;
`

export const InputStyled = styled(Input)`
    border-color: white;
    background-color: #242424;
    color: white;

    &:focus {
    border-color: #242424; 
    box-shadow: 0 0 0 2px rgba(82, 196, 26, 0.2);
    background-color: #242424;
  }

  &:hover{
    background-color: #242424;
  }

`

export const ContainerButtons = styled.div`
    display: grid;
    gap: 1rem;
    grid-auto-rows: auto;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    margin: 2rem 0;

`