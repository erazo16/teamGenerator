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
  const [participants, setParticipants] = useState([]);
  const [playersPerTeam, setPlayersPerTeam] = useState(6);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [participantLevel, setParticipantLevel] = useState("A");
  const [ validations, setValidations ] = useState("si")

  const addParticipant = () => {
    if (participantName.trim()) {
      setParticipants([
        ...participants,
        { name: participantName, level: participantLevel },
      ]);
      setParticipantName("");
      setError("");
    }
  };

  const selectParticipant = (item) => {
    if (item.name.trim()) {
      setParticipants([...participants, { name: item.name, level: item.level }]);
      setParticipantName('');
      setError('');
    }
  }

  const calculateLevelBalance = (team) => {
    const levels = { A: 0, B: 0, C: 0 };
    team.forEach((player) => levels[player.level]++);
    console.log("calculateLevelBalance", levels);
    
    return levels;
  };

  const isTeamUnbalanced = (team) => {
    const levels = calculateLevelBalance(team);
    const totalPlayers = team.length;
    console.log("isTeamUnbalanced", levels, " " , totalPlayers, " ", Object.values(levels).some((count) => count > totalPlayers * 0.5));
    
    return Object.values(levels).some((count) => count > totalPlayers * 0.5);
  };

  const generateTeams = () => {
    if (participants.length < 10) {
      setError("Se requieren al menos 10 participantes");
      return;
    }

    if (playersPerTeam < 2) {
      setError("Se requieren al menos 2 jugadores por equipo");
      return;
    }

    let shuffledParticipants = [...participants].sort(
      () => Math.random() - 0.5
    );
    console.log("shuffledParticipants", shuffledParticipants);
    
    const numTeams = Math.ceil(participants.length / playersPerTeam);
    console.log("numTeams", numTeams);
    
    let attempts = 0;
    const maxAttempts = 100;
    console.log("attempts < maxAttempts", attempts < maxAttempts);
    

    while (attempts < maxAttempts) {
      const tempTeams = Array.from({ length: numTeams }, () => []);
      console.log("tempTeams", tempTeams);
      
      shuffledParticipants = [...shuffledParticipants].sort(
        () => Math.random() - 0.5
      );

      console.log("shuffledParticipants 2", shuffledParticipants);
      

      ["A", "B", "C"].forEach((level) => {
        const levelPlayers = shuffledParticipants.filter(
          (p) => p.level === level
        );
        console.log("levelPlayers", levelPlayers);
        
        let teamIndex = 0;

        levelPlayers.forEach((player) => {
          tempTeams[teamIndex].push(player);
          teamIndex = (teamIndex + 1) % numTeams;
          console.log("tempTeams 2", tempTeams);
          
        });
      });

      const hasUnbalancedTeam = tempTeams.some(isTeamUnbalanced);

      console.log("hasUnbalancedTeam", hasUnbalancedTeam);
      

      if (validations === "si") {
        if (!hasUnbalancedTeam) {
          setTeams(tempTeams);
          setError("");
          return;
        }
  
        attempts++;
      } else if (validations === "no") {
        if (hasUnbalancedTeam) {
          setTeams(tempTeams);
          setError("");
          return;
        }
  
        attempts++;
      }
    }

    setError(
      "No se pudo generar equipos balanceados después de varios intentos"
    );
  };

  const getLevelColorClass = (level) => {
    switch (level) {
      case "A":
        return "bg-green-500 text-white";
      case "B":
        return "bg-blue-500 text-white";
      case "C":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getPairedParticipants = () => {
    const pairs = [];
    for (let i = 0; i < participants.length; i += 2) {
      pairs.push(participants.slice(i, i + 2));
    }
    return pairs;
  };

  const removeAttendes = (name) => {
    const remove = participants.filter((item) => item.name !== name);
    setParticipants(remove);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className=" rounded-lgp-6">
        <h1 className="text-2xl font-bold mb-6">Generador de Equipos</h1>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Nombre del asistente"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              className="flex-1 min-w-[200px] p-2 border rounded"
            />
            <select
              value={participantLevel}
              onChange={(e) => setParticipantLevel(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="A">Nivel A (Alto)</option>
              <option value="B">Nivel B (Medio)</option>
              <option value="C">Nivel C (Bajo)</option>
            </select>
            <button
              onClick={addParticipant}
              className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Agregar Participante
            </button>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3">Listado jugadores</h2>
            <div className="divide-y divide-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4  gap-4 py-2">
                {members.map((item, index) => (
                  <div
                    key={index}
                    className=" text-center p-3 bg-gray-100 border border-gray-200 cursor-pointer rounded"
                    onClick={()=>  selectParticipant(item)}
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="font-medium"> {item.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              Participantes ({participants.length})
            </h2>
            <div className="divide-y divide-gray-200">
              {getPairedParticipants().map((pair, rowIndex) => (
                <div key={rowIndex} className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 py-2">
                  {pair.map((participant, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="flex justify-between items-center p-3 bg-gray-100 border border-gray-200 rounded"
                    >
                      <span className="font-medium">{participant.name}</span>
                      <span
                        className={`px-2 py-1 rounded font-bold text-black`}
                      >
                        Nivel {participant.level}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-sm bg-black text-white cursor-pointer`}
                        onClick={()=> removeAttendes(participant.name)}
                      >
                        Eliminar
                      </span>
                    </div>
                  ))}
                  {/* Si la última fila tiene solo un participante, agregamos un espacio vacío */}
                  {pair.length === 1 && <div className="invisible"></div>}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span>Jugadores por equipo:</span>
            <select
              value={playersPerTeam}
              onChange={(e) => setPlayersPerTeam(Number(e.target.value))}
              className="p-2 border rounded"
            >
              {[2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span oncha>Con validacion de equidad:</span>
            <select onChange={(e)=> setValidations(e.target.value)}>
              <option value="si">Si</option>
              <option value="no">no</option>
            </select>
          </div>

          <button
            onClick={generateTeams}
            disabled={participants.length < 10}
            className={`px-6 py-3 rounded text-white ${
              participants.length < 10
                ? "bg-gray-400"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Generar Equipos
          </button>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {teams.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Equipos Generados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team, index) => (
                  <div key={index} className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-lg font-bold mb-3">
                      Equipo {index + 1}
                    </h3>
                    <div className="space-y-2">
                      {team.map((player, playerIndex) => (
                        <div
                          key={playerIndex}
                          className="p-2 bg-gray-50 rounded flex justify-between items-center"
                        >
                          <span>{player.name}</span>
                          <span
                            className={`px-2 py-1 rounded text-sm ${getLevelColorClass(
                              player.level
                            )}`}
                          >
                            Nivel {player.level}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex justify-around">
                      <span className="px-2 py-1 rounded text-sm bg-green-500 text-white">
                        A: {team.filter((p) => p.level === "A").length}
                      </span>
                      <span className="px-2 py-1 rounded text-sm bg-blue-500 text-white">
                        B: {team.filter((p) => p.level === "B").length}
                      </span>
                      <span className="px-2 py-1 rounded text-sm bg-orange-500 text-white">
                        C: {team.filter((p) => p.level === "C").length}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
