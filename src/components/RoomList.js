import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      name: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  addRoom(e) {
    e.preventDefault();
    const newRoomName = this.state.name;
    this.roomsRef.push({
      name: newRoomName
    });
    this.setState({name: ''});
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  selectRoom(room) {
    this.props.activeRoom(room);
  }

  render() {
    const newRoom = (
      <form onSubmit={(e) => this.addRoom(e)}>
        <input type="text" value={this.state.name} placeholder="Enter Room Name" onChange={(e) => this.handleChange(e)}/>
        <input type="submit" value="Create Room" />
      </form>
    );

    const roomsList = this.state.rooms.map((room) =>
      <li key={room.key} onClick={(e) => this.selectRoom(room, e)}>{room.name}</li>
    );
    return (
      <aside className="room-list">
        <div>{newRoom}</div>
        <ul>{roomsList}</ul>
      </aside>
    );
  }
}

export default RoomList;
