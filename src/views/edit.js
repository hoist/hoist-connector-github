/* globals UI */

var C = UI.Views.Connector;

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
    if (!props.connector) {
      this.state.mode = 'connect';
    }
  }
  connect() {
    this.props.onConnect();
  }
  render() {
    return (
      <C.Page default="setup" {...this.props}>
        <C.Panel name="Setup" slug="setup">
          <UI.FormElements.Button text={this.props.connectorInstance ? 'Reauthorize' : 'Connect'} type="large" onClick={()=>{
              return this.connect();
            }} />
        </C.Panel>
        {this.props.connectorInstance ? <C.Panel name="Events" slug="events">
          <C.EventsGrid.Header
            title="Check the boxes of the events you want to subscribe to."
            subTitle="Checking a box will automatically subscribe you to that event." />
          <C.EventsGrid
            events={['github:repo:update', 'github:new:commit']}
            subscriptions={['github:new:commit']}
            onSubscribe={this.props.onSubscribe} />
        </C.Panel> : <C.Panel name="Events" slug="events">
          <C.EventsGrid.Header
            title="Events are available once you've connected." />
        </C.Panel>}
      </C.Page>
    );
  }
}

// return modules.connector.loadConnector(options.connectorSettings.key, "default", options.application)
//   .then(function (connector) {
//     if (!connector) {
//       options.repositories = ["No repos found, try authenticating again."];
//       return true;
//     }
//     return connector.get('/user/repos?per_page=100').then(function (repos) {
//         options.repositories = [];
//         _.each(repos, function (r) {
//           options.repositories.push(r.full_name);
//         });
//       })
//       .catch(function (err) {
//         logger.alert(err);
//         logger.error(err);
//         console.log(err);
//       });
//   });

// options.application.settings.live.endpoints["/" + request.params.key + "-incoming"] = {
//   "methods": ["POST"],
//   "event": request.params.key + ":new:event"
// };


export default EditForm;
global.EditForm = EditForm;
