import React from "react";
import { fire } from "./../../Firebase/Firebase";
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }

  login = async () => {
    await fire
      .auth()
      .signInAnonymously()
      .then((res) => {
        console.log(res.user.uid);
        localStorage.setItem("userid", JSON.stringify(res.user.uid));
        this.props.history.push("/chat");

        fire
          .database()
          .ref(`User/${res.user.uid}`)
          .set({
            name: this.state.name,
          })
          .then((res) => {
            console.log(res);
          });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });

    // firebaseApp
    //   .firestore()
    //   .collection("users")
    //   .add({
    //     name: this.state.name,
    //   })
    //   .then((res) => {
    //     console.log("===========>", res.id);
    //     localStorage.setItem('userid', JSON.stringify(res.id))
    //  firebaseApp
    //    .auth()
    //    .signInAnonymously()
    //    .then((res) => {
    //      console.log(res);
    //      this.props.history.push("/chat");
    //    })
    //    .catch(function (error) {
    //      // Handle Errors here.
    //      var errorCode = error.code;
    //      var errorMessage = error.message;
    //      console.log(errorMessage);
    //      // ...
    //    });
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
  };
  render() {
    console.log(this.state);
    return (
      <div style={{ textAlign: "center" }}>
        <h1> Welcome to Chat App</h1>

        <input
          type="text"
          placeholder="Enter user Name"
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <br />
        <input type="button" value="Submit" onClick={() => this.login()} />
      </div>
    );
  }
}

export default Home;
