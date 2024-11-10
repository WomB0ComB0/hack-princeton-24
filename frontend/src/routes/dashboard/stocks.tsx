import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';
import { gql } from 'graphql-request';

// GraphQL Query
export const GET_STOCK_ASSETS = gql`
  query GetStockAssets {
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

interface StockAsset {
  id: number;
  bankAccount: BankAccount;
  symbol: string;
  quantity: number;
  securityType: SecurityType;
}

interface StockAssetsResponse {
  securities: StockAsset[];
}

export const Route = createFileRoute('/dashboard/stocks')({
  component: Stocks,
});

function Stocks() {
  const [stockAssets, setStockAssets] = React.useState<StockAsset[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedView, setSelectedView] = React.useState<'list' | 'grid'>('list');

  React.useEffect(() => {
    async function fetchStockAssets() {
      try {
        setLoading(true);
        // Fetch stock assets
        // Example:
        // const response = await request<StockAssetsResponse>(BASE_URL, GET_STOCK_ASSETS);
        // setStockAssets(response.securities.filter(asset => 
        //   asset.securityType.name.toLowerCase().includes('stock')));
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching stock assets');
      } finally {
        setLoading(false);
      }
    }

    fetchStockAssets();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Loading stock portfolio...</div>
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Stocks</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedView('list')}
            className={`px-3 py-2 rounded-lg ${
              selectedView === 'list' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setSelectedView('grid')}
            className={`px-3 py-2 rounded-lg ${
              selectedView === 'grid' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Grid View
          </button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Positions</h3>
          <p className="mt-2 text-2xl font-semibold">{stockAssets.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Unique Stocks</h3>
          <p className="mt-2 text-2xl font-semibold">
            {new Set(stockAssets.map(asset => asset.symbol)).size}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Shares</h3>
          <p className="mt-2 text-2xl font-semibold">
            {stockAssets.reduce((sum, asset) => sum + asset.quantity, 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Connected Banks</h3>
          <p className="mt-2 text-2xl font-semibold">
            {new Set(stockAssets.map(asset => asset.bankAccount.bank.id)).size}
          </p>
        </div>
      </div>

      {selectedView === 'list' ? (
        /* List View */
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shares
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
                {stockAssets.map((asset) => (
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
                {stockAssets.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      No stock assets found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stockAssets.map((asset) => (
            <div key={asset.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{asset.symbol}</h3>
                  <p className="text-sm text-gray-500">{asset.bankAccount.bank.name}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {asset.securityType.name}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Shares</p>
                <p className="text-lg font-medium">{asset.quantity}</p>
              </div>
            </div>
          ))}
          {stockAssets.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-8">
              No stock assets found
            </div>
          )}
        </div>
      )}
    </div>
  );
}