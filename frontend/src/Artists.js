import React, { Component } from "react";

class Artists extends Component {
  render() {
    return (
      <div>
        <h2>Artists</h2>
        <p>Please provide a comma seperated list of your favouret artists</p>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Artists;