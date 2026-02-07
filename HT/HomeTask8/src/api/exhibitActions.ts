import axiosInstance from './axiosInstance';

export interface ExhibitData {
    description: string;
    image: File;
}

export const createExhibit = async (exhibitData: FormData): Promise<any> => {
  const response = await axiosInstance.post('api/exhibits', exhibitData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getAllExhibits = async (page: number = 1) => {
  const response = await axiosInstance.get(`api/exhibits?page=${page}&limit=10`);
  return {
    data: response.data.data,
    lastPage: response.data.lastPage,
  };
};

export const getExhibitById = async (id: string): Promise<any> => {
    const response = await axiosInstance.get(`api/exhibits/post/${id}`);
    return response.data;
};

export const getUserExhibits = async (page: number = 1): Promise<any> => {
  const response = await axiosInstance.get(`api/exhibits/my-posts?page=${page}`);
  return response.data;
};

export const deleteExhibitById = async (id: string): Promise<any> => {
    const response = await axiosInstance.delete(`api/exhibits/${id}`);
    return response.data;
};