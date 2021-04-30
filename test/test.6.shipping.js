import { expectStatus, expectBodyJSON, expectEquality } from './jest-tuwien';
import { testApp, sendRequest } from './util';

describe('/shipping', () => {

  testApp(601, 'Shipping destinations', async (steps) => {
    const res = await sendRequest(steps, { path: '/shipping' });
    expectStatus(steps, res, 200);
    const body = expectBodyJSON(steps, res);
    steps.push('expect response to contain the correct shipping destinations');
    expectEquality(body, {
      destinations: [
        { country: 'AT', displayName: 'Austria', cost: 1500 },
        { country: 'DE', displayName: 'Germany', cost: 1800 },
        { country: 'CH', displayName: 'Switzerland', cost: 2500 },
        { country: 'UK', displayName: 'United Kingdom', cost: 6000 }
      ]
    });
  });

});
