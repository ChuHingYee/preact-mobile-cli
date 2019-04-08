import { h, Component } from 'preact';
import { Button } from 'antd-mobile';
import Test from './Test';
import styles from './app.module.less';

const bgPic = require('../assets/imgs/bg.png');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.page}>
        <div className={styles.line3}>
          <img src={bgPic} className={styles.line3Pic} alt="" />
        </div>
        <div className={styles.bg} />
        <Test />
        <Button>11</Button>
      </div>
    );
  }
}
