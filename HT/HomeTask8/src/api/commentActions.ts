import axiosInstance from './axiosInstance';

export const getComments = async (exhibitId: string) => {
  try {
    const response = await axiosInstance.get(`/api/exhibits/${exhibitId}/comments`);
    
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении комментариев:', error);
    throw error;
  }
};

export const addComment = async (exhibitId: string, text: string) => {
  try {
    const response = await axiosInstance.post(`/api/exhibits/${exhibitId}/comments`, { text });
   
    return response.data;
  } catch (error) {
    console.error('Ошибка при добавлении комментария:', error);
    throw error;
  }
};


export const deleteComment = async (exhibitId: string, commentId: string) => {
  try {
    const response = await axiosInstance.delete(`/api/exhibits/${exhibitId}/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при удалении комментария:', error);
    throw error;
  }
};