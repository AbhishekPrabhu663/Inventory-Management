import React from 'react';
import AssetListing from '../Modules/AssetListing';
// import AssetTracking from './Modules/AssetTracking';
// import StockRegister from './Modules/StockRegister';

const Content = ({ activeModule }) => {
  const renderModule = () => {
    switch (activeModule) {
      case 'assetListing':
        return <AssetListing />;
      // case 'assetTracking':
      //   return <AssetTracking />;
      // case 'stockRegister':
      //   return <StockRegister />;
      default:
        return <h1 className="text-center mt-20">Welcome to Inventory Dashboard</h1>;
    }
  };
  return <div className="p-6">{renderModule()}</div>;
};

export default Content;