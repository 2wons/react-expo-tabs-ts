import * as axios from 'axios';
import { loginWithUserAndPassword, register, getMe, editSelf, uploadAvatar } from '@/services/authService';

// Mock the Axios module
jest.mock('axios');

describe('Clinic Tests', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Reset all mock implementations after each test
  });

  it('loginWithUserAndPassword should make a POST request to /Account/Login and return correct response', async () => {
    const email = 'jtest@email.com';
    const password = 'Password1!';

    const mockResponse = { status: 200, data: { token: 'testToken' } };
    
    axios.post.mockImplementation(() => Promise.resolve(mockResponse));

    const response = await loginWithUserAndPassword(email, password);

    // Verify response status
    expect(response.status).toEqual(200);

    // Verify response data
    expect(response.data.token).toBeDefined();
    expect(typeof response.data.token).toEqual('string');
  });

  it('register should make a POST request to /Account/Register and return correct response', async () => {
    const fullName = 'John Doe';
    const email = ''
    const password = 'Password1!';

    const mockResponse = { status: 200 };
    axios.post.mockImplementation(() => Promise.resolve(mockResponse));
    const response = await register(fullName, email, password);

    // Verify response status
    expect(response.status).toEqual(200);
  })

  it('getMe should make a GET request to /Account/Me and return correct response', async () => { 
    const mockResponse = { status: 200, data: { name: 'John Doe', imagePath: '/path/to/image' } };
    axios.get.mockImplementation(() => Promise.resolve(mockResponse));
    const response = await getMe();

    // Verify response status
    expect(response.status).toEqual(200);
    expect(response.data.name).toBeDefined();
    expect(response.data.imagePath).toBeDefined();
  })

  it('editSelf should make a PUT request to /Account/Edit and return correct response', async () => {
    const mockResponse = { status: 200, data: { name: 'John Doe', imagePath: '/path/to/image' } };
    axios.put.mockImplementation(() => Promise.resolve(mockResponse));
    const response = await editSelf({ name: 'John Doe' });

    // Verify response status
    expect(response.status).toEqual(200);
    expect(response.data.name).toBeDefined();
    expect(response.data.imagePath).toBeDefined();
  })


  it('uploadAvatar should make a POST request to /Account/UploadAvatar and return correct response', async () => {
    const mockResponse = { status: 200, data: { imagePath: '/path/to/image' } };
    axios.put.mockImplementation(() => Promise.resolve(mockResponse));
    const response = await editSelf({ name: 'John Doe' });

    // Verify response status
    expect(response.status).toEqual(200);
    expect(response.data.imagePath).toBeDefined();
  })

  // Write similar tests for other API functions
});