import { gql, request } from 'graphql-request';
const BASE_URL = 'https://backend-purple-dawn-8577.fly.dev/graphql';
(async () => {
  try {
    const query = gql`
    query {
      balances {
        id
        bankAccount {
          id
        }
        currency {
          symbol
        }
        amount
        dateTime
      }
    }
  `;
    const data = await request(BASE_URL, query);
    const deepExpand = (obj) => {
      if (Array.isArray(obj)) {
        return obj.map(item => deepExpand(item))
      } else if (typeof obj === 'object' && obj !== null) {
        const result = {}
        for (const [key, value] of Object.entries(obj)) {
          result[key] = deepExpand(value)
        }
        return result
      }
      return obj
    }
    console.log(deepExpand(data));
  } catch (error) {
    console.error(error);
    throw new Error(`${error instanceof Error ? error.message : error}`);
  }
})();
