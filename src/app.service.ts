import { Injectable } from '@nestjs/common';

const users = [
  {
    id: 1,
    name: 'John',
  },
  {
    id: 2,
    name: 'Peter',
  },
];

@Injectable()
export class AppService {
  getUsers() {
    return users;
  }
}
