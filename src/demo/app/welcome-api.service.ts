import { Api } from 'zetapush-angular';

export class WelcomeApi extends Api {
  async welcome(message: string = '') {
    return this.$publish('welcome', { message })
  }
}
