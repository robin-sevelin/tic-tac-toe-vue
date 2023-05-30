import { Player } from './Player';

export class GameBoard {
  constructor(
    public gameActive: boolean,
    public isDraw: boolean,
    public id: number
  ) {}
}
