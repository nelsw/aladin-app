import * as actions from '../constants/ActionTypes';

const InitialState = {
  // dapps: [],
  dapps: {
    art: [],
    businessTools: [],
    chat: [],
    developerTools: [],
    documentsAndStorage: [],
    educationAndNews: [],
    financialServices: [],
    gamesAndDigitalAssets: [],
    healthAndFitness: [],
    marketPlaces: [],
    musicPhotoAndVideo: [],
    socialImpact: [],
    socialNetworking: [],
    utilitiesAndProductivity: [],
    wallets: [],
    all: [],
    myDapps: [],
  },
  dappDetail: '',
};

export default (state = InitialState, action) => {
  switch (action.type) {
    case actions.SET_DAPPS:
      const Dapps = action.payload;
      const artApps = [];
      const businessToolsApps = [];
      const chatApps = [];
      const developerToolsApps = [];
      const documentsAndStorageApps = [];
      const educationAndNewsApps = [];
      const financialServicesApps = [];
      const gamesAndDigitalAssetsApps = [];
      const healthAndFitnessApps = [];
      const marketPlacesApps = [];
      const musicPhotoAndVideoApps = [];
      const socialImpactApps = [];
      const socialNetworkingApps = [];
      const utilitiesAndProductivityApps = [];
      const walletsApps = [];
      const mydapps = [];
      // console.log('from dapps reducer', Dapps);
      // Dapps.forEach(element => {
      //   if (element.hasOwnProperty('dappcategory')) {
      //     // console.log('yes', element.dappcategory);
      //     if (!apps.includes(element.dappcategory)) {
      //       apps.push(element.dappcategory);
      //     }
      //   }
      // });
      // console.log('TCL: apps', apps);
      // apps.map(item =>
      //   // console.log(item);
      //   ({
      //     ...state,
      //     test: {
      //       item,
      //     },
      //   })
      // );
      // console.log(state);
      const userData = JSON.parse(localStorage.getItem('userData'));
      // Dapps.forEach(item => {
      //   if (item.ownerId == currentUser) {
      //     mydapps.push(item);
      //   }
      //   if (item.hasOwnProperty('dappcategory')) {
      //     if (/\s/g.test(item.dappcategory)) {
      //       const newStr = item.dappcategory.split(/\s/).join(' ');
      //       const dappArray = newStr;
      //       dappArray.push(item);
      //     }
      //     let dappArray = item.dappcategory;
      //     dappArray = [];
      //     dappArray.push(item);
      //   }
      // });

    // final try
    // return Dapps.reduce((prev, current) => ({
    //   ...prev,
    //   [current.dappcategory]: current,
    // }), state)


      Dapps.map(dapp => {
        if (JSON.parse(localStorage.getItem('userData')) !== null) {
          if (dapp.ownerId === userData.currentUser) {
            mydapps.push(dapp);
          }
        }
        if (dapp.dappcategory === 'Art') {
          artApps.push(dapp);
        }
        if (dapp.dappcategory === 'Business Tools') {
          businessToolsApps.push(dapp);
        }
        if (dapp.dappcategory === 'Chat') {
          chatApps.push(dapp);
        }
        if (dapp.dappcategory === 'Developer Tools') {
          developerToolsApps.push(dapp);
        }
        if (dapp.dappcategory === 'Documents and Storage') {
          documentsAndStorageApps.push(dapp);
        }
        if (dapp.dappcategory === 'Education and News') {
          educationAndNewsApps.push(dapp);
        }
        if (dapp.dappcategory === 'Financial Services') {
          financialServicesApps.push(dapp);
        }
        if (dapp.dappcategory === 'Games and Digital Assets') {
          gamesAndDigitalAssetsApps.push(dapp);
        }
        if (dapp.dappcategory === 'Health and Fitness') {
          healthAndFitnessApps.push(dapp);
        }
        if (dapp.dappcategory === 'Marketplaces') {
          marketPlacesApps.push(dapp);
        }
        if (dapp.dappcategory === 'Music, Photo & Video') {
          musicPhotoAndVideoApps.push(dapp);
        }
        if (dapp.dappcategory === 'Social Impact') {
          socialImpactApps.push(dapp);
        }
        if (dapp.dappcategory === 'Social Networking') {
          socialNetworkingApps.push(dapp);
        }
        if (dapp.dappcategory === 'Utilities and Productivity') {
          utilitiesAndProductivityApps.push(dapp);
        }
        if (dapp.dappcategory === 'Wallets') {
          walletsApps.push(dapp);
        }
      });
      return {
        dapps: {
          art: [...artApps],
          businessTools: [...businessToolsApps],
          chat: [...chatApps],
          developerTools: [...developerToolsApps],
          documentsAndStorage: [...documentsAndStorageApps],
          educationAndNews: [...educationAndNewsApps],
          financialServices: [...financialServicesApps],
          gamesAndDigitalAssets: [...gamesAndDigitalAssetsApps],
          healthAndFitness: [...healthAndFitnessApps],
          marketPlaces: [...marketPlacesApps],
          musicPhotoAndVideo: [...musicPhotoAndVideoApps],
          socialImpact: [...socialImpactApps],
          socialNetworking: [...socialNetworkingApps],
          utilitiesAndProductivity: [...utilitiesAndProductivityApps],
          wallets: [...walletsApps],
          myDapps: [...mydapps],
          all: action.payload,
        },
      };

    case actions.GET_DAPP_DETAIL_SUCCESS:
      return {
        ...state,
        dappDetail: action.payload,
      }
    default:
      return state;
  }
};
