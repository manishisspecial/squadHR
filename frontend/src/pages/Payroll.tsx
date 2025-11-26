import { useEffect, useState } from 'react';
import api from '../utils/api';
import { format } from 'date-fns';

const Payroll = () => {
  const [payrolls, setPayrolls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const response = await api.get('/payroll/my-payrolls');
      setPayrolls(response.data.payrolls || []);
    } catch (error) {
      console.error('Failed to fetch payrolls:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Payroll</h1>

      <div className="rounded-lg bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Base Salary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Allowances
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Deductions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Tax
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Net Salary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payrolls.map((payroll) => (
              <tr key={payroll.id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {payroll.month}/{payroll.year}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  ${payroll.baseSalary.toFixed(2)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  ${payroll.allowances.toFixed(2)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  ${payroll.deductions.toFixed(2)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  ${payroll.tax.toFixed(2)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                  ${payroll.netSalary.toFixed(2)}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      payroll.status === 'PAID'
                        ? 'bg-green-100 text-green-800'
                        : payroll.status === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {payroll.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payroll;

