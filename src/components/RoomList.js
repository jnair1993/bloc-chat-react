import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
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

    const newRoomName = this.inputEl.value;
    this.roomsRef.push({
      name: newRoomName
    });

    this.inputEl.value = '';
  }

  render() {
    return (
      <aside className="room-list">
        <form onClick={this.addRoom.bind(this)}>
          <input type="text" ref={ el => this.inputEl = el }/>
          <input type="submit" value="New Room"/>
        </form>
        {
          this.state.rooms.map( (room, index) =>
          <div className="room-name" key={index}>{room.name}</div>
        )
        }
      </aside>
    );
  }
}

export default RoomList;
