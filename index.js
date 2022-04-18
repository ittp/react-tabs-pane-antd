import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

import {
  Typography,
  Table,
  Layout,
  Space,
  Button,
  Grid,
  PageHeader,
  Input,
  InputNumber,
  Select,
  Form,
  AutoComplete,
  Upload,
  List,
  Tabs,
} from 'antd';

import FormBuilder from 'antd-form-builder';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
const { Sidebar, Header, Content, Footer } = Layout;
import swr from 'swr';
const {} = List;
// const { Header } = ;

const { Paragraph } = Typography;

const { TabPane } = Tabs;
const initialPanes = [
  { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
  { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
  {
    title: 'Tab 3',
    content: 'Content of Tab 3',
    key: '3',
    closable: false,
  },
];

const TabAddress = (data) => {
  return <div>address</div>;
};
class TabsView extends Component {
  newTabIndex = 0;

  state = {
    activeKey: initialPanes[0].key,
    panes: initialPanes,
  };

  onChange = (activeKey) => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  getTabContent = (tab) => {
    console.log(tab);
    // axios.get("")
    let data = <Table> </Table>;
    return 'Content ${tab}';
  };
  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    const newPanes = [...panes];
    newPanes.push({
      title: 'Новая вкладка',
      content: this.getTabContent(activeKey),
      key: activeKey,
    });
    this.setState({
      panes: newPanes,
      activeKey,
    });
  };

  remove = (targetKey) => {
    const { panes, activeKey } = this.state;
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    this.setState({
      panes: newPanes,
      activeKey: newActiveKey,
    });
  };

  render() {
    const { panes, activeKey } = this.state;
    return (
      <Tabs
        type="editable-card"
        onChange={this.onChange}
        activeKey={activeKey}
        onEdit={this.onEdit}
      >
        {panes.map((pane) => (
          <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
            <TabAddress {...pane.url} />
            <Form ref={pane.key}>
              <textarea>{pane.content}</textarea>
              <Button>Save</Button>
            </Form>
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

class TableTabs extends Component {
  constructor() {
    super();

    this.state = {};
  }
  //  <Tabs name={'ss'}></Tabs>
  Item = (config) => (
    <TabItem {...config.tab}>
      <Table {...config.table} />
    </TabItem>
  );

  // ItemsMap = ( ) Object.map(i => Item(i))
  render() {
    return <Tabs></Tabs>;
  }
}

class SearchForm extends Component {
  constructor() {
    super();
    this.meta = {
      key: 'password',
      widget: 'password',
      placeholder: 'Password',
    };
    this.state = {};
  }
  // handleFinish = useCallback((values) => {
  //   console.log('Submit: ', values);
  //   this.state.setState({ values });
  // });
  render() {
    return (
      <Form layout="inline" size={'medium'}>
        <FormBuilder
          meta={[
            { key: 'key', dataIndex: 'key', placeholder: 'key' },
            { key: 'type', placeholder: 'type', widget: 'input' },
            { key: 'manufacturer', placeholder: 'manufacturer' },
            { key: 'model', placeholder: 'model' },
            { key: 'serial', placeholder: 'serial' },
            { key: 'inventory', placeholder: 'inventory' },
            { key: 'year', placeholder: 'year' },
            { key: 'place', placeholder: 'place' },
          ]}
        />

        <Form.Item>
          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      types: {},
      dbs: [
        {
          key: 1,
          org: 1,
          year: 2021,
          db: 'db.db',
        },
      ],
    };
  }

  fields = {};
  render() {
    return (
      <Layout>
        <Header></Header>
        <Form>
          <PageHeader title={<SearchForm />} extra={<Button>V</Button>} />
        </Form>
        <Content>
          <TabsView />
        </Content>
        <Footer>
          <h3>Config</h3>
          <p>
            <Select
              label={'1'}
              style={{ width: '300px' }}
              options={[{ label: 1, defaultValue: 1 }, { label: 'test' }]}
            />
          </p>
          <div></div>
        </Footer>
      </Layout>
    );
  }
}

render(<App />, document.getElementById('root'));
