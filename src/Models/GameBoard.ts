import { Div } from './Div';
import { Player } from './Player';

export class GameBoard {
  constructor(
    public players: Player[],
    public div: Div[],
    public gameActive: boolean,
    public isDraw: boolean,
    public currentPlayer: Player | null,
    public currentPlayerIndex: number
  ) {}
}
