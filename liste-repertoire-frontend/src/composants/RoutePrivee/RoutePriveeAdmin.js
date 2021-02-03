import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UtiliseAUTH } from '../../Context/Auth';

function RoutePriveeAdmin({ component: Component, ...reste }) {

  const { authentificationUtilisateur, authentificationAdmin } = UtiliseAUTH();

  return (
    <Route {...reste} render={props => {

      if (authentificationUtilisateur === false && authentificationAdmin === false) {
        return (
          <Redirect to="pageDemandeConnection" />
        )
      }
      else if (authentificationAdmin === true) {
        return (
          <Component {...props} />
        )
      }
      else {
        return (
          <Redirect to="PageConnection" />
        )
      }
    }
    } />
  );
}

export default RoutePriveeAdmin;