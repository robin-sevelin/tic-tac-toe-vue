<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { GameBoard } from '../Models/GameBoard';
  import { Div } from '../Models/Div';
  import { Player } from '../Models/Player';

  const gameBoard = ref<GameBoard>(
    new GameBoard([], [], true, false, [], 0) ||
      localStorage.getItem('gameBoard')
  );
  const showScore = ref(false);
  const gameDiv = ref<Div>();
  const emits = defineEmits(['players', 'endGame']);

  const props = defineProps({
    players: {
      type: Array as () => Player[],
      required: true,
    },
  });

  onMounted(() => {
    getGameBoardFromLocalStorage();
    if (localStorage.getItem('gameBoard') === null) {
      addPlayers(props.players);
      addDivsToArray();
    }
  });

  const addDivsToArray = () => {
    for (let i = 0; i < 9; i++) {
      gameDiv.value = new Div('', i, false);
      gameBoard.value.div.push(gameDiv.value);
    }
  };

  const saveGameBoardToLocalStorage = () => {
    const gameData = gameBoard.value;
    const gameDataString = JSON.stringify(gameData);
    localStorage.setItem('gameBoard', gameDataString);
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

  const currentPlayerName = computed(() => {
    const currentPlayerIndex = gameBoard.value.currentPlayerIndex;
    return gameBoard.value.players[currentPlayerIndex]?.name;
  });

  const getWinnerName = () => {
    const currentPlayerIcon = gameBoard.value.currentPlayer[0]?.icon;
    return currentPlayerIcon === '❎'
      ? gameBoard.value.players[0].name
      : gameBoard.value.players[1].name;
  };

  const getScoreList = computed(() => {
    const scoresList = [
      {
        name: gameBoard.value.players[0].name,
        score: gameBoard.value.players[0].score,
        id: 0,
      },
      {
        name: gameBoard.value.players[1].name,
        score: gameBoard.value.players[1].score,
        id: 1,
      },
    ];

    return scoresList;
  });

  const toggleShowScore = () => {
    showScore.value = !showScore.value;
  };

  const endGame = () => {
    localStorage.removeItem('gameBoard');
    gameBoard.value.players = [];
    emits('endGame', gameBoard.value.players);
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

      if (divA.name === '❎' && divB.name === '❎' && divC.name === '❎') {
        gameBoard.value.players[0].score += 1;
        saveGameBoardToLocalStorage();
        return (gameBoard.value.gameActive = false);
      } else if (
        divA.name === '⭕️' &&
        divB.name === '⭕️' &&
        divC.name === '⭕️'
      ) {
        gameBoard.value.players[1].score += 1;
        saveGameBoardToLocalStorage();
        return (gameBoard.value.gameActive = false);
      }
    }
    for (let i = 0; i < gameBoard.value.div.length; i++) {
      if (
        gameBoard.value.div[i].name === '❎' ||
        gameBoard.value.div[i].name === '⭕️'
      ) {
        drawCounter++;
      }
    }
    if (drawCounter === gameBoard.value.div.length) {
      saveGameBoardToLocalStorage();
      gameBoard.value.isDraw = true;
      return (gameBoard.value.gameActive = false);
    }
  };

  const tagDiv = (div: Div) => {
    if (
      gameBoard.value.currentPlayerIndex >= 0 &&
      gameBoard.value.currentPlayerIndex < gameBoard.value.players.length
    ) {
      const currentPlayer =
        gameBoard.value.players[gameBoard.value.currentPlayerIndex];
      div.name = currentPlayer.icon === '❎' ? '❎' : '⭕️';
      gameBoard.value.div[div.id].clicked = true;

      gameBoard.value.currentPlayerIndex =
        (gameBoard.value.currentPlayerIndex + 1) %
        gameBoard.value.players.length;
    }
    saveGameBoardToLocalStorage();
    checkWin();
  };

  const restartGame = () => {
    const users = gameBoard.value.players;
    const currentUser = gameBoard.value.currentPlayerIndex;

    gameBoard.value = new GameBoard(users, [], true, false, users, currentUser);
    addDivsToArray();
  };
</script>

<template>
  <div class="currentPlayer" v-if="!showScore">
    <h3 v-if="gameBoard.gameActive">It's {{ currentPlayerName }}'s turn</h3>
    <h3 v-else-if="gameBoard.isDraw">it's a draw</h3>
    <h3 v-else>{{ getWinnerName() }} won</h3>
  </div>
  <div class="game" v-if="!showScore">
    <div
      class="div"
      v-for="div in gameBoard.div"
      :key="div.id"
      @click="tagDiv(div)"
      :style="{
        pointerEvents:
          div.clicked || gameBoard.isDraw || !gameBoard.gameActive
            ? 'none'
            : 'auto',
      }"
    >
      {{ div.name }}
    </div>
  </div>
  <div class="score" v-if="showScore">
    <h3>Here are the player scores</h3>
    <ul>
      <li v-for="score in getScoreList" :key="score.id">
        {{ score.name }}: {{ score.score }} points
      </li>
    </ul>
  </div>

  <div class="button-container">
    <button @click="toggleShowScore">Toggle score board</button>
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
    list-style: none;
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
