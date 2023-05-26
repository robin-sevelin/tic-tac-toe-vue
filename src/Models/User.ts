export class User {
  hasWon: boolean;
  constructor(public name: string, public icon: string, public score: number) {
    this.hasWon = false;
  }
}
