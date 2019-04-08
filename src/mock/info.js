import Mock from 'mockjs';

const picsList = [
  'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2303715267,3688853668&fm=58&bpow=550&bpoh=435',
  'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1028449342,985584268&fm=85&app=52&f=JPEG?w=121&h=75&s=1710ED220B9267F1177C45DF0100D0E3',
  'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2101320337,3872255227&fm=85&app=52&f=JPEG?w=121&h=75&s=E1F233C046F3B3DE18E004BE0300C0C2',
  'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3130979039,3940584674&fm=179&app=42&f=JPEG?w=121&h=161',
];

function getData() {
  const count = Mock.mock({
    'number|1-4': 4,
  }).number;
  const mockList = [];
  for (let i = 0; i < count; i++) {
    const mockItem = Mock.mock({
      _id: '@id',
      timestamp: Mock.Random.datetime('y-M-d H:m:s'),
      name: '@first',
      ava: picsList[i],
      leader: i === 0,
    });
    mockList.push(mockItem);
  }
  const mockTime = new Date().getTime() + 3000;
  const mockProduct = {
    pic: picsList[count],
    name: Mock.mock('@first'),
    now: 16800,
    prev: 26800,
  };
  return {
    list: mockList,
    time: mockTime,
    product: mockProduct,
  };
}
export default {
  detail: () => {
    const flag = Mock.Random.boolean(0.9, 0.4, true);
    if (flag) {
      return {
        success: flag,
        data: getData(),
      };
    } else {
      return {
        success: flag,
        data: {
          message: '获取失败',
        },
      };
    }
  },
};
