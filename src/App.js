import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    selectedFile: null
  }

  onChangeHandler = event => {
    const files = event.target.files;
    if (!files) return;

    console.log(files[0])
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
    console.log(json);

    this.setState({
      original: json.original,
      resized: json.resized,
    })
  }

  imageEncode(arrayBuffer) {
    let u8 = new Uint8Array(arrayBuffer)
    let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer), function (p, c) { return p + String.fromCharCode(c) }, ''))
    let mimetype = "image/jpeg"
    return "data:" + mimetype + ";base64," + b64encoded
  }

  render = () => {
    const { original, resized } = this.state;
    let originalImg, resizedImg;

    if (original) {
      originalImg = <img src={this.imageEncode(original.data)} />
    }
    if (resized) {
      resizedImg = <img src={this.imageEncode(resized.data)} />
    }

    return (
      <div className="App">
        <input type="file" name="image" onChange={this.onChangeHandler} />
        <button onClick={this.onClickHandler}>Upload</button>

        <div>
          {originalImg}
          {resizedImg}
        </div>
      </div>
    );
  }
}

export default App;
