import { observable, action, makeObservable, makeAutoObservable } from "mobx";
import axios from "axios";

class RoomStore {
  rooms = [];

  //   constructor() {
  //     makeObservable(this, {
  //       rooms: observable,
  //       fetchRooms: action,
  //       createRooms: action,
  //       deleteRooms: action,
  //     });
  //   }

  constructor() {
    makeAutoObservable(this);
  }

  fetchRooms = async () => {
    try {
      const response = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );
      this.rooms = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  createRoom = async (newRoom) => {
    try {
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );
      this.rooms.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  deleteRoom = async (id) => {
    try {
      await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${id}`
      );
      this.rooms = this.rooms.filter((room) => room.id !== id);
    } catch (error) {
      console.log(error);
    }
  };
}

const roomStore = new RoomStore();
roomStore.fetchRooms();
//this instead of in app to fetch my rooms as soon as I open the app (runs only once)

export default roomStore;
