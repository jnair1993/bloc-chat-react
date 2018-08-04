import React, {Component} from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider ).then((result) => {
      const user_name = result.user;
      this.props.setUserName(user_name);
    });
  }

  signOut() {
    this.props.firebase.auth().signOut().then(() => {
      this.props.setUserName(null);
    });
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUserName(user);
    });
  }

  render(){
    return(
      <section className="auth-buttons">
        <button onClick={this.signIn}>Sign In</button>
        <button onClick={this.signOut}>Sign Out</button>
        <p>Current User: {this.props.activeUser}</p>
      </section>
    );
  }
}

export default User;
