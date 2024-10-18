import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { members } from "./data/data";
import {
  CardAttendes,
  CardMembers,
  CardsTeams,
  ListMembers,
  ListTeams,
} from "./styles";
import { ModalCreate } from "./ModalCreate";

function App() {
  const [attendes, setAttendes] = useState([]);
  const [teamSize, setTeamSize] = useState(5);
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
    const totalPlayer = attendes.length;
    const numTeams = Math.floor(totalPlayer / teamSize);

    if (numTeams === 0) {
      alert("No hay suficientes asistentes para formar equipos.");
      return;
    }

    const levelA = attendes.filter((a) => a.level === "A");
    const levelB = attendes.filter((a) => a.level === "B");
    const levelC = attendes.filter((a) => a.level === "C");

    let shuffledPlayers = [];

    while (levelA.length > 0 || levelB.length > 0 || levelC.length > 0) {
      if (levelA.length > 0) shuffledPlayers.push(levelA.shift());
      if (levelB.length > 0) shuffledPlayers.push(levelB.shift());
      if (levelC.length > 0) shuffledPlayers.push(levelC.shift());
    }

    let currentTeams = Array.from({ length: numTeams }, () => []);

    for (let i = 0; i < shuffledPlayers.length; i++) {
      currentTeams[i % numTeams].push(shuffledPlayers[i]);
    }

    /*  const distributeEquitably = (players) => {
      while (players.length > 0) {
        currentTeams.forEach((team) => {
          if (players.length > 0) {
            team.push(players.shift());
          }
        });
      }
    }; */

    /* const distributeEquitably = (players) => {
      let teamIndex = 0;
      while (players.length > 0) {
        currentTeams[teamIndex].push(players.shift())
        teamIndex = (teamIndex + 1) % numTeams
      }
    }; */

    /*  for (let i = 0; i < Math.ceil(attendes.length / teamSize); i++) {
      currentTeams.push([]);
    } */

    for (let [player1, player2] of restr) {
      for (let team of currentTeams) {
        if (
          team.some((p) => p.name === player1) &&
          team.some((p) => p.name === player2)
        ) {
          const otherTeam = currentTeams.find(
            (t) =>
              !t.some((p) => p.name === player1) &&
              !t.some((p) => p.name === player2)
          );
          if (otherTeam) {
            const player2obj = team.find((a) => a.name === player2);
            team.splice(team.indexOf(player2obj), 1);
            otherTeam.push(player2obj);
          }
        }
      }
    }

    const remainingPlayers = attendes.length % teamSize;
    if (remainingPlayers > 0) {
      alert(
        "Algunos equipos tienen jugadores adicionales debido al número de asistentes."
      );
    }

    console.log("teams", currentTeams);

    setTeam(currentTeams);
  };

  /* const teamGenerator = () => {

    const totalPlayer = attendes.length
    const numTeams = Math.floor(totalPlayer / teamSize)

    if (numTeams === 0) {
      alert('No hay suficientes asistentes para formar equipos.');
      return;
    }



    const levelA = attendes.filter((a) => a.level === "A");
    const levelB = attendes.filter((a) => a.level === "B");
    const levelC = attendes.filter((a) => a.level === "C");



    let currentTeams = Array.from({ length: numTeams }, () => []);

  /*  const distributeEquitably = (players) => {
      while (players.length > 0) {
        currentTeams.forEach((team) => {
          if (players.length > 0) {
            team.push(players.shift());
          }
        });
      }
    }; 

    const distributeEquitably = (players) => {
      let teamIndex = 0;
      while (players.length > 0) {
        currentTeams[teamIndex].push(players.shift())
        teamIndex = (teamIndex + 1) % numTeams
      }
    }; 


  /*  for (let i = 0; i < Math.ceil(attendes.length / teamSize); i++) {
      currentTeams.push([]);
    } 

    distributeEquitably(levelA);
    distributeEquitably(levelB);
    distributeEquitably(levelC);


    for (let [player1, player2] of restr) {
      for (let team of currentTeams) {
        if (
          team.some((p) => p.name === player1) &&
          team.some((p) => p.name === player2)
        ) {
          const otherTeam = currentTeams.find(
            (t) =>
              !t.some((p) => p.name === player1) &&
              !t.some((p) => p.name === player2)
          );
          if (otherTeam) {
            const player2obj = team.find((a) => a.name === player2);
            team.splice(team.indexOf(player2obj), 1);
            otherTeam.push(player2obj);
          }
        }
      }
    }

    const remainingPlayers = attendes.length % teamSize;
    if (remainingPlayers > 0) {
      alert('Algunos equipos tienen jugadores adicionales debido al número de asistentes.');
    }

    console.log("teams", currentTeams);
    

    setTeam(currentTeams);
  }; */

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

          <button onClick={() => teamGenerator()}>Generar equipos</button>
        </div>
      )}

      {team.length > 0 && (
        <>
          <h1>Equipos generados</h1>
          <ListTeams>
            {team.map((item, index) => (
              <CardsTeams key={index}>
                <h3>Equipo {index + 1}</h3>

                <ul>
                  {item.map((player) => (
                    <li>
                      {player.name} (Nivel {player.level})
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
