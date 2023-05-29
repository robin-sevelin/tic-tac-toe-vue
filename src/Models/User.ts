export class User {
  hasWon: boolean;
  isCreated: boolean;
  constructor(public name: string, public score: number, public id: string) {
    this.hasWon = false;
    this.isCreated = false;
  }
  //   createUser = () => {
  //     if (this.name) {
  //       if (this.isCreated) {
  //         this.icon = 'user o';
  //       } else {
  //         this.icon = 'user x';
  //       }
  //       this.isCreated = true;
  //     }
  //   };
}
