import React from 'react';
import './App.css';
import { Grid, Button, Card, CardContent, Typography } from '@material-ui/core';
import { ImageCard } from './components/ImageCard';

class App extends React.Component {
  state = {
    selectedFile: null
  }

  onChangeHandler = event => {
    const files = event.target.files;
    if (!files) return;

    this.setState({
      selectedFile: files[0],
      loaded: 0,
    })
  }

  onClickHandler = async () => {
    const data = new FormData()
    data.append('image', this.state.selectedFile)

    const rawResponse = await fetch('http://0.0.0.0:3000/image/resize', {
      method: 'POST',
      headers: {
        'Accept': 'multipart/form-data',
      },
      body: data
    });

    const json = await rawResponse.json();

    this.setState({
      original: json.original,
      resized: json.resized,
    })
  }

  imageEncode(arrayBuffer) {
    const b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer), (p, c) => { return p + String.fromCharCode(c) }, ''))
    const mimetype = "image/jpeg"
    return "data:" + mimetype + ";base64," + b64encoded
  }

  render = () => {
    const { original, resized } = this.state;
    let originalImg, resizedImg;

    if (original) {
      originalImg = <ImageCard label={'Original:'} src={this.imageEncode(original.data)} />
    }
    if (resized) {
      resizedImg = <ImageCard label={'Resized:'} src={this.imageEncode(resized.data)} />
    }

    return (
      <div className="App">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >

          <Grid item
            xs={12}
            justify="center"
            alignItems="center"
            spacing={3}
            style={{ paddingBottom: '2%' }}
          >
            <Card>
              <CardContent>
                <input type="file" name="image" onChange={this.onChangeHandler} />
                <Button variant="contained"
                  color="primary"
                  onClick={this.onClickHandler}>
                  Upload
                </Button>
              </CardContent>

            </Card>
          </Grid>

          <div>
            {originalImg}
            {resizedImg}
          </div>
        </Grid>
      </div>
    );
  }
}

export default App;
