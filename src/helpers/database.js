import {db} from '../config';
import moment from 'moment';

export function getPlayers(callback) {
  db.ref('players').orderByChild('updated_at').on('value', snapshot => {
    callback(snapshot);
  })
}

export function getPlayerGame(playerId, date, callback) {
  db.ref('games/' + playerId + '/' + date).on('value', snapshot => {
    callback(snapshot);
  })
}

export function getPlayerGamesForWeek(playerId, callback) {
  let startAt = moment().startOf('day')
  db.ref('games/' + playerId).orderByKey().limitToLast(7).on('value', snapshot => {
    callback(snapshot);
  })
}

export function updatePlayerGame(playerId, date, data) {
  db.ref('games/' + playerId + '/' + date).update(data);
  db.ref('players/' + playerId).update({updated_at: moment().format()});
}

export function addPlayer(data, callback) {
  db.ref('players').push(data);
  callback();
}
