import { expectStatus, expectBodyJSON, expectEquality } from './jest-tuwien';
import { testApp, sendRequest } from './util';

describe('/mats', () => {

  testApp(501, 'Mat colors', async (steps) => {
    const res = await sendRequest(steps, { path: '/mats' } );
    expectStatus(steps, res, 200);
    const body = expectBodyJSON(steps, res);
    steps.push('expect response to contain the correct mat colors');
    expectEquality(body, [
      { color: 'arctic', label: 'Arctic', hex: '#f4f3ef' },
      { color: 'ivory', label: 'Ivory', hex: '#fffff0' },
      { color: 'mint', label: 'Mint', hex: '#e3efe2' },
      { color: 'indigo', label: 'Indigo', hex: '#264348' },
      { color: 'mauve', label: 'Mauve', hex: '#673147' }
    ]);
  });

});
