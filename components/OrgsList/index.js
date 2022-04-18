import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import { List, message, Avatar, Spin } from 'antd';
import reqwest from 'reqwest';

import InfiniteScroll from 'react-infinite-scroller';

const types = {
  server: {
    id: 1,
    icon: '',
    title: 'SERVER',
    subtypes: [{}],
  },
};
const getType = (id) => {
  const { icon, title, subtupes } = types[id];

  return types[id];
};
const fakeDataUrl =
  'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
let json = {
  results: [
    {
      gender: 'female',
      name: { title: 'Miss', first: 'Margie', last: 'Adams' },
      email: 'margie.adams@example.com',
      nat: 'US',
    },
    {
      gender: 'female',
      name: { title: 'Mrs', first: 'Alex', last: 'Young' },
      email: 'alex.young@example.com',
      nat: 'GB',
    },
    {
      gender: 'male',
      name: { title: 'Mr', first: 'Sebastian', last: 'Thomsen' },
      email: 'sebastian.thomsen@example.com',
      nat: 'DK',
    },
    {
      gender: 'male',
      name: { title: 'Mr', first: 'Jocelino', last: 'Ribeiro' },
      email: 'jocelino.ribeiro@example.com',
      nat: 'BR',
    },
    {
      gender: 'female',
      name: { title: 'Mrs', first: 'Giselda', last: 'Fogaça' },
      email: 'giselda.fogaca@example.com',
      nat: 'BR',
    },
  ],
};
class InfiniteListExample extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
  };

  componentDidMount() {
    this.fetchData((res) => {
      this.setState({
        data: res.results,
      });
    });
  }

  fetchData = (callback) => {
    callback(json);
    // reqwest({
    //   url: fakeDataUrl,
    //   type: 'json',
    //   method: 'get',
    //   contentType: 'application/json',
    //   success: (res) => {
    //     callback(res);
    //   },
    // });
  };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData((res) => {
      data = data.concat(res.results);

      this.setState({
        data,
        loading: false,
      });
    });
  };

  render() {
    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            dataSource={this.state.data}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={'o'}
                  title={<a href="#">{item.name.last}</a>}
                  description={item.email}
                />
                <div>
                  <b>Content</b>
                </div>
              </List.Item>
            )}
          >
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

ReactDOM.render(<InfiniteListExample />, document.getElementById('container'));
