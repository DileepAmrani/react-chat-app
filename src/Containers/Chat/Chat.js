import React from "react";
import { fire } from "./../../Firebase/Firebase";
import "./Chat.css";
class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "",
      messages: [],
      uid: "",
    };
  }

  async componentDidMount() {
    let uid = await localStorage.getItem("userid");
    var useruid = JSON.parse(uid);
    console.log("uid from local storage", useruid);
    this.setState({
      uid: useruid,
    });
    // let { messages } = this.state;

    fire
      .database()
      .ref("messages")
      .on("value", (data) => {
        if (data.val() !== null) {
          let obj = data.val();
          console.log("object==============>", obj);
          let messages = Object.keys(obj).map((key) => {
            return {
              id: key,
              messages: obj[key].message,
              uid: obj[key].uid,
            };
          });
          console.log(messages);
          this.setState({ messages: messages });
        }
      });
    // fire
    //   .firestore()
    //   .collection("messages")
    //   .get()
    //   .then((res) => {
    //     res.forEach((doc) => {
    //       console.log(doc.data());
    //       let message = doc.data();
    //       messages.push(message);
    //       this.setState({
    //         messages: messages,
    //       });
    //     });
    //   });

    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        //   var isAnonymous = user.isAnonymous;
        //   var uid = user.uid;
        // this.props.history.push().path("/chat");
        // ...
      } else {
        // User is signed out.
        // ...
        // this.props.history.push().path("/");
      }
      // ...
    });
  }

  send = () => {
    let { uid } = this.state;
    // alert(uid);

    fire
      .database()
      .ref("messages")
      .push({
        message: this.state.message,
        uid,
      })
      .then((res) => {
        this.setState({
          message: "",
        });
        console.log(res);
      });
  };

  logOut = () => {
    fire
      .auth()
      .signOut()
      .then((res) => {
        console.log(res);
        this.props.history.push("/");
        localStorage.removeItem("userid");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  render() {
    console.log(this.state);
    return (
      <div style={{ maxWidth: "500px", border: "3px dashed gray", padding: '5px' }}>
        <div style={{ textAlign: "center" }}>
          Welcome to Chat App &nbsp;
          <input
            type="button"
            value="Close Chat"
            onClick={() => this.logOut()}
          />
        </div>
        <div className="messages">
          <ol>
            {this.state.messages.map((v, i) => {
              return (
                <li
                  key={i}
                  className={
                    this.state.uid == v.uid
                      ? "senderMessage"
                      : "recieverMessage"
                  }
                >
                  {v.messages}
                </li>
              );
            })}
          </ol>
        </div>
        <br />
        <br />
        <br />
        <div style={{ textAlign: "center" }}>
          <input
            type="text"
            placeholder="Enter Message Here"
            value={this.state.message}
            onChange={(e) => this.setState({ message: e.target.value })}
          />
          <input type="button" value="Submit" onClick={() => this.send()} />
        </div>
      </div>
    );
  }
}

export default Chat;
