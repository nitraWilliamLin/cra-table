import './App.css';
import 'react-tabulator/css/tabulator_materialize.min.css';
import { ReactTabulator } from 'react-tabulator'
import campaignData from './fe_test_data_campaigns.json';
import geoData from './fe_test_data_geounits.json';

const columns = [
  {title:"Name", field:"name", width: 150 }, //never hide this column
  {title:"Status", field:"status", width: 150},
  {title:"Id", field:"id", width: 150},
  {title:"Daily budget", field:"dailyBudget", width: 150},
  {title:"Bid", field:"bid", hozAlign:"center", width: 150},
  {title:"Geo source", field:"geoSource", width: 150}, //never hide this column
  {title:"Management Type", field:"managementType", width: 150},
  {title:"Creative Type", field:"creativeType", width: 150},
  {title:"Apps", field:"apps", formatter:"html", width: 150},
  {title:"Creative Count", field:"creativeCount", width: 150},
  {title:"Priority", field:"priority", hozAlign:"center", width: 150},
  {title:"Network Optimized", field:"networkOptimized", width: 150},
  {title:"Currency", field:"currency"},
  {title:"Latest Snapshot", field:"latestSnapshot", hozAlign:"center", sorter:"date", width: 150},
  ];

const data = campaignData.map((campaign) => {
  const relatedGeoData = [];
  geoData.forEach((geo) => {
    if (geo.campaignId === campaign.id) {
      relatedGeoData.push({
        bid: geo.bid,
        creativeType: geo.creativeType,
        dailyBudget: geo.dailyBudget,
        geoSource: geo.geo,
        name: geo.name,
        status: geo.status,
        id: geo.id,
      });
    }
  });

  // apps icons
  const apps = campaign.apps.map((app) => `<img style="width: 30px; height:30px;" src="${app.icon}" alt="${app.name}" />`).join('');
  return {
    ...campaign,
    apps: apps,
    _children: relatedGeoData
  }
})
function App() {
  return (
    <div style={{
      width: '100%',

    }}>
      <ReactTabulator
        data={data}
        columns={columns}
        options={{
          dataTree: true,
          pagination:true,
          paginationSize:10,
          paginationSizeSelector:[10, 25, 50, 100, true], //select list with an "all" option at the end of the list
        }}
      />
    </div>
  );
}

export default App;
