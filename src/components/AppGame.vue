<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { GameBoard } from '../Models/GameBoard';
  import { Div } from '../Models/Div';
  import { Player } from '../Models/Player';

  const gameBoard = ref<GameBoard>(new GameBoard([], [], false, true, null, 0));
  const showScore = ref(false);
  const gameDiv = ref<Div>();
  const emits = defineEmits(['players', 'gameBoard']);

  const props = defineProps({
    players: {
      type: Array as () => Player[],
      required: true,
    },
  });

  onMounted(() => {
    addDivsToArray();
    getGameBoardFromLocalStorage();
    getUserFromLocalStorage();
    addPlayers(props.players);
  });

  const addDivsToArray = () => {
    gameBoard.value.gameActive = true;
    for (let i = 0; i < 9; i++) {
      gameDiv.value = new Div('', i);
      gameBoard.value.div.push(gameDiv.value);
    }
  };

  const getUserFromLocalStorage = () => {
    const randomNumber = Math.round(Math.random());
    const users = localStorage.getItem('users');
    if (users) {
      gameBoard.value.players = JSON.parse(users);
      const selectedUser = gameBoard.value.players[randomNumber];
      gameBoard.value.currentPlayer = selectedUser;
    }
  };

  const saveGameBoardToLocalStorage = () => {
    const gameBoardString = JSON.stringify(gameBoard.value);
    localStorage.setItem('gameBoard', gameBoardString);
  };

  const getGameBoardFromLocalStorage = () => {
    const gameBoardString = localStorage.getItem('gameBoard');
    if (gameBoardString) {
      gameBoard.value = JSON.parse(gameBoardString);
    }
  };

  const addPlayers = (players: Player[]) => {
    players.forEach((player) => {
      gameBoard.value.players.push(player);
    });
  };

  const toggleShowScore = () => {
    showScore.value = !showScore.value;
  };

  const endGame = () => {
    gameBoard.value.players.splice(0, gameBoard.value.players.length);
    localStorage.removeItem('users');
    localStorage.removeItem('gameBoard');
    emits('players', gameBoard.value.players);
    gameBoard.value.gameActive = false;
    emits('gameBoard', gameBoard.value.gameActive);
  };

  const checkWin = () => {
    let drawCounter = 0;

    const winResult = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winResult.length; i++) {
      const [a, b, c] = winResult[i];
      const divA = gameBoard.value.div[a];
      const divB = gameBoard.value.div[b];
      const divC = gameBoard.value.div[c];

      if (divA.name === 'X' && divB.name === 'X' && divC.name === 'X') {
        console.log(gameBoard.value.currentPlayer?.name);
        gameBoard.value.gameActive = false;
      } else if (divA.name === 'O' && divB.name === 'O' && divC.name === 'O') {
        console.log(gameBoard.value.currentPlayer?.name);
        gameBoard.value.gameActive = false;
      }
    }
    for (let i = 0; i < gameBoard.value.div.length; i++) {
      if (
        gameBoard.value.div[i].name === 'X' ||
        gameBoard.value.div[i].name === 'O'
      ) {
        drawCounter++;
      }
    }
    if (drawCounter === gameBoard.value.div.length) {
      alert('its a draw');
      gameBoard.value.gameActive = false;
    }
  };

  const tagDiv = (div: Div) => {
    console.log('hej');

    if (
      gameBoard.value.currentPlayerIndex >= 0 &&
      gameBoard.value.currentPlayerIndex < gameBoard.value.players.length
    ) {
      const currentPlayer =
        gameBoard.value.players[gameBoard.value.currentPlayerIndex];
      div.name = currentPlayer.icon === 'x' ? 'X' : 'O';
      gameBoard.value.currentPlayerIndex =
        (gameBoard.value.currentPlayerIndex + 1) %
        gameBoard.value.players.length;
    }
    checkWin();
    saveGameBoardToLocalStorage();
  };

  const restartGame = () => {
    const users = gameBoard.value.players;
    const currentUser = gameBoard.value.currentPlayerIndex;

    localStorage.removeItem('gameBoard');
    gameBoard.value = new GameBoard(users, [], false, true, null, currentUser);

    addDivsToArray();
  };
</script>

<template>
  <div class="currentPlayer" v-if="!showScore">
    <h3>It's {{ gameBoard.currentPlayer?.name }}'s turn</h3>
  </div>
  <div class="game" v-if="!showScore">
    <div
      :v-model="gameDiv"
      class="div"
      v-for="div in gameBoard.div"
      :key="div.id"
      @click.once="gameBoard.gameActive ? tagDiv(div) : null"
    >
      {{ div.name }}
    </div>
  </div>
  <div class="score" v-if="showScore">
    <h3>Here are the player scores</h3>
    <ul>
      <li v-for="player in players">
        {{ player.name }}, {{ player.score }} points
      </li>
    </ul>
  </div>

  <div class="button-container">
    <button @click="toggleShowScore">Check score history</button>
    <button @click="restartGame">Restart game</button>
    <button @click="endGame">End game session</button>
  </div>
</template>

<style scoped>
  .currentPlayer {
    height: 50px;
  }
  .score {
    height: 300px;
  }

  ul {
    padding: 1rem;
    gap: 1rem;
  }
  .button-container {
    padding: 2rem;
    display: flex;
    gap: 1rem;
  }

  button {
    width: 100px;
    height: 50px;
    font-size: 1rem;
  }

  button:hover {
    background-color: lightgray;
    transition: 0.3s ease-in-out;
    cursor: pointer;
  }
  .game {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
  .div {
    border: 1px solid black;
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
  }

  .div:hover {
    background-color: lightgray;
    transition: 0.3s ease-in-out;
    cursor: pointer;
  }
</style>
