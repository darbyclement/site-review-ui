import React, {Component} from 'react'
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField
} from "@material-ui/core";

export default class Dashboard extends Component{

    render(){
        return(
            <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 20,
          padding: 20
        }}
      >
        <form style={{ width: "50%" }}>
          <h1>My Dashboard</h1>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="Site">Input Site</InputLabel>
            <Input id="site" type="text" />
          </FormControl>

          <Button variant="contained" color="primary" size="medium">
            Search
          </Button>
          <Button variant="contained" color="primary" size="medium">
            Add to Dashboard
          </Button>
        </form>
      </div>

        )
    
    }
}