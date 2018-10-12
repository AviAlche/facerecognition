import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation.js';
import Logo from './components/logo/Logo.js';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm.js';
import Rank from './components/rank/Rank.js';
import FaceRecognition from './components/facerecognition/FaceRecognition.js';
import Particles from 'react-particles-js';
import Signin from './components/signin/Signin.js';
import Register from './components/register/Register.js';


const particlesOptions = {
  particles: {
      number:{
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
  }

const initialState = {
    input : '',
    imageUrl: '',
    box: {},
    route:'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
  }

class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  componentDidMount(){

  }
  onInputChange = (event) => {
    this.setState({input: event.target.value });
  }

  calculateFaceLocation = (data) =>{
    const faceLocation = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const height = Number(image.height);
    const width = Number(image.width); 
    return {
      leftCol : faceLocation.left_col * width,
      topRow : faceLocation.top_row * height,
      rightCol : width - (faceLocation.right_col * width),
      bottomRow : height - (faceLocation.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box : box});
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch('http://localhost:3000/imageurl',{
          method: 'post',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
              input: this.state.input
            })
        })
    .then(response => response.json())
    .then(response => { 
      if(response){
        fetch('http://localhost:3000/image',{
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
            })
        })
        .then(response => response.json())
        .then(count => {this.setState(Object.assign(this.state.user, {entries: count}))})
        .catch(console.log);
      }
      this.displayFaceBox( this.calculateFaceLocation(response))})
    .catch( err => console.log("Error! ",err) )
  }


  onRouteChange = (page) => {
    if(page === 'signin'){
      this.setState(initialState)
    } else if(page === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: page}); 
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        
        <Particles className='particles'
                params={particlesOptions}
                style={{
                  width: '100%',
                }}
              />
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
          {
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : (route === 'register')
            ? <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> 
            : <div>
                <Logo/>
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
                <FaceRecognition box={box} imageToSearch={imageUrl}/>
              </div>
          }
      </div>
    );
  }
}

export default App;
