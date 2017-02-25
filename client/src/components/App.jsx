import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../redux/store.js';

/*  Components  */
import NavigationBar from './Nav/Nav.jsx';
import MapViewer from './MapViewer/MapViewer.jsx';
import Group from './Group/Group.jsx';
import VenueSchedule from './VenueSchedule/VenueSchedule.jsx';
import PersonalAgenda from './VenueSchedule/PersonalAgenda.jsx';
// import ChooseVenue from './InitConfig/ChooseVenue.jsx';
// import InviteFriends from './InitConfig/InviteFriends.jsx';
// import CreateGroup from './InitConfig/CreateGroup.jsx';
import { signIn, signInSuccess } from '../redux/actions/authenticationActions';
import SignInButton from './Auth/SignInButton';
import firebase from 'firebase'
import firebaseConfig from '../firebase'


class App extends React.Component {

componentWillMount() {
  const { auth, dispatch, location, user } = this.props;
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    auth.isUserSignedIn = true;
    console.log('CWM', auth)
  } else {
    console.log('no user signed in')
    signIn()
  }
});
}
  render() {
    const { auth, dispatch, location, user } = this.props;
    console.log('RENDER', auth)
    if (auth.isUserSignedIn) {
      return (
        <Router>
          <div>
            <NavigationBar />
    				<Route exact path="/" component={() => (
              <Group
                dispatch={dispatch}
                users={location.users}
                userID={user.userId}
              />
            )}/>
  					<Route path="/group" component={() => (
  						<Group
  							dispatch={dispatch}
  							users={location.users}
  							userID={user.userId}
  						/>
  					)}/>
            <Route path="/map" component={MapViewer}/>
  					<Route path="/agenda" component={PersonalAgenda}/>
  					<Route path="/schedule" component={VenueSchedule}/>
  					<Route path="/emergency" component={() => <div>Emergency Emergency Info Holder</div>}/>
  					<Route path="/choosevenue" component={() => <div>Venue Holder</div>}/>
  					<Route path="/create" component={() => <div>Create Holder</div>}/>
  					<Route path="/invite" component={() => <div>Invite Holder</div>}/>
          </div>
  			</Router>
      )
    } else {
      return (
        <SignInButton
          onSignInClick={signIn}
          auth={ auth }/>
      )
    }
  }
}

export default connect((store) => {
  return {
    user: store.user,
    nav: store.nav,
    location: store.location,
    auth: store.auth
  };
})(App);
