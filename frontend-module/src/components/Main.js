import React   from "react";

import { BrowserRouter as Router } from 'react-router-dom'
import { Route} from 'react-router';
import MainPage from "./pageAdmin/mainpage";


class MainController extends React.Component{

	render() {
	  return (
          <Router>
              <div>
                  {/*<Route path="/*" component={HeaderElement} />*/}
                  <Route exact path="/index" component={MainPage} />
              </div>
          </Router>
	  );
	}
}

export default MainController;