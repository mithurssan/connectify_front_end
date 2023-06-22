import axios from 'axios';
import { describe, it, expect, vi, test } from 'vitest';
import { getCompanies } from './index';

describe('getCompanies', () => {
	test('fetches and returns companies', async () => {
		const mockResponse = {
			data: [
				{ business_name: 'Company A', business_password: 'passwordA' },
				{ business_name: 'Company B', business_password: 'passwordB' },
			],
		};
		vi.spyOn(axios, 'get').mockResolvedValue(mockResponse);

		// const companyName = 'Company B';
		const result = await getCompanies();
		expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/businesses/');
		expect(result).toEqual({ business_name: 'Company B', business_password: 'passwordB' });
	});

	test('handles error when fetching companies', async () => {
		const mockError = new Error('Failed to fetch companies');
		vi.spyOn(axios, 'get').mockRejectedValue(mockError);

		// const companyName = 'Company B';

		await expect(getCompanies()).rejects.toThrowError('Failed to fetch companies');
	});
});
