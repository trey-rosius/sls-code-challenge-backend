import React from 'react';
import './App.css';


import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

import DisplayPosts from '../src/components/DisplayPosts';

const App =() =>{
 
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

  return authState === AuthState.SignedIn && user ? (
      <div className="App">
          <div className="App-header">
          
          <DisplayPosts/>
          
          </div>
         
      </div>
    ) : (
      <AmplifyAuthenticator />
  
  );
}

export default App;
