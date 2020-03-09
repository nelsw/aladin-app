import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import configureStore, { history } from './store';
import Layout from './Layout/Layout';
import Notfound from './modules/NotFound404/notFound404';
import asyncComponent from './util/asyncComponent';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Offline, Online } from "react-detect-offline";
import { toast } from "react-toastify";
// import './assets/js/custom-file-input';
// IMPORTED ALL JS FILE
import 'bootstrap/dist/js/bootstrap.bundle';
import './assets/js/common-js';
// IMPORTED ALL CSS FILE
import './assets/fonts/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/css/media.css';
import './assets/css/aos.css';
import './assets/css/dev.css';
// import './assets/js/jquery.min.js';

// import './assets/js/masonry.pkgd.min.js';
// IMPORT ALL MODULE OR COMPONENT

export const store = configureStore();
export const ALADIN_STATE_VERSION_KEY = 'ALADIN_STATE_VERSION';

const Home = asyncComponent(() => import('./modules/Information/Home/Home'));
let check = true;

const checkNetwork = () => {
  window.setInterval(() => {
    if (navigator.onLine && check) {
    } else if (check) {
      check = false;
      toast.error("You are offline", {
        //zIndex: 10009,
        toastId: "1",
        preventDuplicated: true,
        autoClose: 6000,
        position: toast.POSITION.BOTTOM_LEFT
      });
    }

    // alert("Browser is offline");
  }, 2000);
};


const App = () => (
  <Provider store={store}>
    <div>{checkNetwork()}</div>
    <ToastContainer autoClose={3000} />
    <ConnectedRouter history={history}>
      {
        history.location.pathname.includes('admin') ? (
          <Switch>
            <Route
              path="/admin"
              component={asyncComponent(() => import('./modules/Admin'))}
            />
          </Switch>
        ) : (
          <Layout>
            <Router />
          </Layout>
        )
      }
    </ConnectedRouter>
  </Provider>
);

const Router = () => (
  <Switch>
    <Route
      path="/"
      exact
      component={
        asyncComponent(() => import('./modules/Information/Home/Home'))
      }
    />
    <Route
      path="/auth"
      component={asyncComponent(() => import('./auth/index'))}
    />

    <Route
      path="/tokenPage"
      component={
        asyncComponent(() => import('./modules/Technology/AlaToken/AlaToken'))
      }
    />
    <Route
      path="/dappStore"
      component={
        asyncComponent(() =>
          import('./modules/Information/DappStore/DappStore')
        )
      }
    />
    <Route
      path="/forum"
      component={
        asyncComponent(() => import('./modules/Community/Forum/Forum'))
      }
    />
    <Route
      path="/askQuestion"
      component={
        asyncComponent(() =>
          import('./modules/Community/Forum/AskQuestion/AskQuestion')
        )
      }
    />
    <Route
      path="/document"
      component={
        asyncComponent(() =>
          import('./modules/Technology/Documentation/Documentation')
        )
      }
    />
    <Route
      path="/team"
      component={
        asyncComponent(() => import('./modules/Information/AboutUs/OurTeam'))
      }
    />
    <Route
      path="/sdk"
      component={
        asyncComponent(() => import('./modules/Technology/SDK/SDK'))
      }
    />
    <Route
      path="/audittrail"
      component={
        asyncComponent(() => import('./modules/Technology/AuditTrail/AuditTrail'))
      }
    />
    <Route
      path="/votes"
      component={
        asyncComponent(() => import('./modules/Technology/Votes/Votes'))
      }
    />
    <Route
      path="/events"
      component={
        asyncComponent(() => import('./modules/Community/Events/Events'))
      }
    />
    <Route
      path="/signup"
      component={
        asyncComponent(() => import('./modules/Signup/Signup'))
      }
    />
    <Route
      path="/privacy-policy"
      component={asyncComponent(() =>
        import('./modules/Information/PrivacyPolicy/PrivacyPolicy')
      )}
    />
    <Route
      path="/term-condition"
      component={asyncComponent(() =>
        import('./modules/Information/TermCondition/TermCondition')
      )}
    />
    <Route
      path="/aboutus"
      component={asyncComponent(() =>
        import('./modules/Information/AboutUs/AboutUs')
      )}
    />
    <Route
      path="/events"
      component={asyncComponent(() =>
        import('./modules/Community/Events/Events')
      )}
    />
    <Route
      path="/wallet"
      exact
      component={
        asyncComponent(() => import('./modules/User/Wallet/Wallet'))
      }
    />
    <Route
      path="/wallet/:data"
      component={
        asyncComponent(() => import('./modules/User/Wallet/Wallet'))
      }
    />
    <Route
      path="/profile"
      component={
        asyncComponent(() => import('./modules/User/Profile/Profile'))
      }
    />
    <Route
      path="/settings"
      component={
        asyncComponent(() => import('./modules/User/Settings/Settings'))
      }
    />
    <Route
      path="/storage-provider"
      component={
        asyncComponent(() =>
          import('./modules/User/Settings/StorageProvider/StorageProvider')
        )
      }
    />
    <Route
      path="/change-password"
      component={
        asyncComponent(() =>
          import('./modules/User/Settings/ChangePassword/ChangePassword')
        )
      }
    />
    <Route
      path="/backup-and-restore"
      component={
        asyncComponent(() =>
          import('./modules/User/Settings/BackupRestore/BackupRestore')
        )
      }
    />
    <Route
      path="/reset-browser"
      component={
        asyncComponent(() =>
          import('./modules/User/Settings/ResetBrowser/ResetBrowser')
        )
      }
    />
    <Route
      path="/api-setting"
      component={
        asyncComponent(() =>
          import('./modules/User/Settings/APISettings/APISetttings')
        )
      }
    />
    <Route
      path="/event-detail"
      componen={asyncComponent(() =>
        import('./modules/Community/Events/EventDetail/EventDetail')
      )}
    />
    <Route
      path="/road-map"
      component={asyncComponent(() =>
        import('./modules/Information/AboutUs/RoadMap')
      )}
    />
    <Route
      path="/profile-more"
      component={asyncComponent(() =>
        import('./modules/User/Profile/ProfileMore/ProfileMore')
      )}
    />
    <Route
      path="/manage-resources"
      component={asyncComponent(() =>
        import('./modules/User/Profile/CPUStake')
      )}
    />
    <Route
      path="/register-dapp"
      component={asyncComponent(() =>
        import('./modules/Information/DappStore/RegisterDapp/RegisterDapp')
      )}
    />
    <Route
      path="/file-manager"
      component={asyncComponent(() =>
        import('./modules/User/FileManager/FileManager')
      )}
    />
    <Route
      path="/edit-dapp/:id"
      component={asyncComponent(() =>
        import('./modules/Information/DappStore/EditDapp/EditDapp')
      )}
    />

    {/* THIS FOR 404 PAGE NOTFOUND */}
    <Route
      path="/404"
      component={asyncComponent(() =>
        import('./modules/NotFound404/notFound404')
      )}
    />

    {/* <Redirect to="/404" component={Notfound} /> */}
  </Switch>
);

export default App;
