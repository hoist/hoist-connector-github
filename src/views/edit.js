/* globals UI */

var C = UI.Views.Connector;

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.getRepos = this.getRepos.bind(this);
    this.renderRepos = this.renderRepos.bind(this);
    this.getEditView = this.getEditView.bind(this);
    this.getConnectView = this.getConnectView.bind(this);
    this.state = {
      events: [],
      repositories: []
    };
    if (!props.connector) {
      this.state.mode = 'connect';
    }
  }
  connect() {
    this.props.onConnect();
  }
  componentDidMount() {
    if (this.props.connectorInstance) {
      this.getRepos();
    }
  }
  onSubscribe(item) {
    this.props.onSubscribe({
      event: item.option,
      subscribed: item.checked
    })
  }
  renderRepos() {
    var repos = (this.props.viewData.repositories || []).map((r, i) => {
      return <option key={i} value={r.full_name}>{r.full_name}</option>;
    });
    console.log(this.props.settings.SubscriptionRepository, 'really??');
    if(!this.props.settings.SubscriptionRepository) {
      repos.unshift(<option key={"empty"}>Select a Repository</option>);
    }
    return (<select defaultValue={this.props.settings.SubscriptionRepository} name={"SubscriptionRepository"}>{repos}</select>);
  }
  getRepos() {
    this.props.connector.proxy('getRepositories', [100], 'repositories');
  }
  getConnectView() {
    return (
      <C.Page default="setup" {...this.props}>
        <C.Panel name="Setup" slug="setup">
          <UI.FormElements.Button text={'Connect'} type="large" onClick={()=>{
              return this.connect();
            }} />
        </C.Panel>
        <C.Panel name="Events" slug="events">
          <C.PageHeader
            title="Events are available once you've connected." />
        </C.Panel>
      </C.Page>
    );
  }
  getEditView() {
    return (
      <C.Page default="setup" {...this.props}>
        <C.Panel name="Setup" slug="setup">
          <form onChange={(evt) => {
            this.props.updateField(evt);
          }} onSubmit={(evt) => {
            this.props.updateSettings(evt);
          }}>
            <div style={{marginBottom:30,paddingBottom:30,borderBottom:'1px solid #F1F1F1',position:'relative'}}>
              <C.PageHeader
                title="Choose the repositories you want to subscribe to."
                subTitle="We'll create the webhook in the background for you." />
                {this.props.viewData.repositories ? this.renderRepos() : <select><option>Loading...</option></select>}
            </div>
            <UI.FormElements.Button text={'Save'} type="large" onClick={this.props.updateSettings} />
          </form>
          <UI.TextElements.Link text="or Reauthorize" onClick={this.connect} />
        </C.Panel>
        <C.Panel name="Events" slug="events">
          <C.PageHeader
            title="Check the boxes of the events you want to subscribe to."
            subTitle="Checking a box will automatically subscribe you to that event." />
          <C.CheckboxGrid
            items={this.props.connectorInstance.events}
            checked={this.props.connectorInstance.subscribedEvents}
            onChange={this.onSubscribe} />
        </C.Panel>
      </C.Page>
    );
  }
  render() {
    return (<div>{this.props.connectorInstance ? this.getEditView() : this.getConnectView()}</div>);
  }
}

export default EditForm;
global.EditForm = EditForm;
