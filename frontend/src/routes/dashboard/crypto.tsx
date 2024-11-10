import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';
import { gql } from 'graphql-request';

// GraphQL Query
export const GET_CRYPTO_ASSETS = gql`
  query GetSecurityAssets {
    securities {
      id
      bankAccount {
        id
        bank {
          name
        }
      }
      symbol
      quantity
      securityType {
        id
        name
      }
    }
  }
`;

// Types
interface SecurityType {
  id: number;
  name: string;
}

interface Bank {
  id: string;
  name: string;
}

interface BankAccount {
  id: string;
  bank: Bank;
}

interface CryptoAsset {
  id: number;
  bankAccount: BankAccount;
  symbol: string;
  quantity: number;
  securityType: SecurityType;
}

interface CryptoAssetsResponse {
  securities: CryptoAsset[];
}

export const Route = createFileRoute('/dashboard/crypto')({
  component: Crypto,
});

function Crypto() {
  const [cryptoAssets, setCryptoAssets] = React.useState<CryptoAsset[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchCryptoAssets() {
      try {
        setLoading(true);
        // Fetch crypto assets
        // Example:
        // const response = await request<CryptoAssetsResponse>(BASE_URL, GET_CRYPTO_ASSETS);
        // setCryptoAssets(response.securities.filter(asset => 
        //   asset.securityType.name.toLowerCase().includes('crypto')));
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching crypto assets');
      } finally {
        setLoading(false);
      }
    }

    fetchCryptoAssets();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Loading cryptocurrency data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
        <h3 className="text-red-800 font-medium">Error</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Cryptocurrency</h2>
      
      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Assets</h3>
          <p className="mt-2 text-2xl font-semibold">{cryptoAssets.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Unique Tokens</h3>
          <p className="mt-2 text-2xl font-semibold">
            {new Set(cryptoAssets.map(asset => asset.symbol)).size}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Connected Banks</h3>
          <p className="mt-2 text-2xl font-semibold">
            {new Set(cryptoAssets.map(asset => asset.bankAccount.bank.id)).size}
          </p>
        </div>
      </div>

      {/* Assets List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Your Crypto Assets</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cryptoAssets.map((asset) => (
                <tr key={asset.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{asset.symbol}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{asset.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{asset.bankAccount.bank.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{asset.securityType.name}</div>
                  </td>
                </tr>
              ))}
              {cryptoAssets.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No cryptocurrency assets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}