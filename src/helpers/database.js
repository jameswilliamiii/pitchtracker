import {db} from '../config';
import moment from 'moment';

export function getPlayers(callback) {
  db.ref('/players').on('value', snapshot => {
    callback(snapshot);
  })
}

export function getPlayerGame(playerId, date, callback) {
  db.ref('/games/' + playerId + '/' + date).on('value', snapshot => {
    callback(snapshot);
  })
}

export function getPlayerGamesForWeek(playerId, callback) {
  let startAt = moment().startOf('day')
  db.ref('/games/' + playerId).orderByKey().limitToLast(7).on('value', snapshot => {
    callback(snapshot);
  })
}

export function updatePlayerGame(playerId, date, data) {
  db.ref('/games/' + playerId + '/' + date).update(data);
}

export function addPlayer(data, callback) {
  db.ref('/players').push(data);
  callback();
}
