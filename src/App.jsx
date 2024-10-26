import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { members } from "./data/data";
import {
  CardAttendes,
  CardMembers,
  CardsTeams,
  ContainerButtons,
  ListMembers,
  ListTeams,
} from "./styles";
import { ModalCreate } from "./ModalCreate";
import { Form, Input } from "antd";

function App() {
  const [attendes, setAttendes] = useState([]);
  const [teamSize, setTeamSize] = useState(6);
  const [team, setTeam] = useState([]);
  const [restr, setRestr] = useState([]);
  const [selectPlayer, setSelectPlayer] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addAttendes = (item) => {
    if (item.name && !attendes.some((a) => a.name === item.name)) {
      setAttendes([...attendes, item]);
    }
  };

  const removeAttendes = (name) => {
    const remove = attendes.filter((item) => item.name !== name);
    setAttendes(remove);
  };

  const addRestriction = () => {
    if (selectPlayer.length === 2) {
      setRestr([...restr, [selectPlayer[0], selectPlayer[1]]]);
      setSelectPlayer([]);
    }
  };

  const handlePlayer = (player) => {
    if (selectPlayer.includes(player)) {
      selectPlayer(selectPlayer.filter((item) => item !== player));
    } else if (selectPlayer.length < 2) {
      setSelectPlayer([...selectPlayer, player]);
      if (selectPlayer.length === 1) {
        addRestriction();
      }
    }
  };

  const teamGenerator = () => {
    const totalTeams = Math.ceil(attendes.length / teamSize);
    const teams = Array.from({ length: totalTeams }, () => []);

    const playersByLevel = {
        A: attendes.filter((player) => player.level === "A"),
        B: attendes.filter((player) => player.level === "B"),
        C: attendes.filter((player) => player.level === "C")
    };

    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
    playersByLevel.A = shuffleArray(playersByLevel.A);
    playersByLevel.B = shuffleArray(playersByLevel.B);
    playersByLevel.C = shuffleArray(playersByLevel.C);

    const totalPlayers = attendes.length;
    const teamSizeAdjusted = Math.ceil(totalPlayers / totalTeams); 

    const getPlayerToMove = (teams, currentTeam) => {
        for (let i = 0; i < teams.length; i++) {
            if (teams[i] !== currentTeam && teams[i].length > teamSizeAdjusted) {
              
                return teams[i].pop();
            }
        }
        return null; 
    };

    const distributeEqually = (levelPlayers) => {
        let teamIndex = 0;
        while (levelPlayers.length) {
            const player = levelPlayers.pop(); 
            teams[teamIndex].push(player); 
            teamIndex = (teamIndex + 1) % totalTeams; 
        }
    };

    distributeEqually(playersByLevel.A);
    distributeEqually(playersByLevel.B);
    distributeEqually(playersByLevel.C);

    const finalTeams = teams.map((team) => {
        while (team.length < teamSizeAdjusted) {
            const playerToMove = getPlayerToMove(teams, team);
            if (playerToMove) {
                team.push(playerToMove);
            }
        }
        return team;
    });

    setTeam(finalTeams);
};


  const resetTeams = () => {
    setTeam([])
  }

  

  return (
    <>
      <h1>Jugadores</h1>
      <ListMembers>
        {members.map((item, index) => (
          <CardMembers
            onClick={() => addAttendes(item)}
            selectedPlayer={selectPlayer.includes(item.name)}
            key={index}
          >
            {item.name}
          </CardMembers>
        ))}
      </ListMembers>

      {attendes.length > 0 && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Asistentes</h1>

            <button onClick={()=> setShowModal(true)} >Agregar</button>
          </div>

          <ListMembers>
            {attendes.map((item, index) => (
              <CardAttendes onClick={() => removeAttendes(item.name)}>
                {item.name}
              </CardAttendes>
            ))}
          </ListMembers>

          <ContainerButtons>
            <button onClick={() => teamGenerator()}>Generar equipos</button>


            
            <select style={{ padding : "0.5rem", borderRadius : "10px" }} onChange={(e) => setTeamSize(parseInt(e.target.value))}>
              <option value={6}>Seleccionar cantidad de jugadores por equipo</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>

          </ContainerButtons>
        </div>
      )}

      {team.length > 0 && (
        <>
          <h1>Equipos generados</h1>
          <ListTeams>
            {team.map((item, index) => (
              <CardsTeams key={index}>
                <h3>Equipo {index + 1}</h3>

                <ul style={{ listStyle : "none" }}>
                  {item.map((player) => (
                    <li style={{ marginBottom : "0.5rem"  }}>
                      {player.name} ({player.level})
                    </li>
                  ))}
                </ul>
              </CardsTeams>
            ))}
          </ListTeams>
        </>
      )}

      <ModalCreate showModal={showModal} cancel={() => setShowModal(false)} addAttendes={addAttendes} />
    </>
  );
}

export default App;
