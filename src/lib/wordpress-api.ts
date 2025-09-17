import { WPPage } from '@/types/wordpress';
import axios from 'axios';

const WORDPRESS_API_URL = 'https://wordpress-pzjqn.wasmer.app/wp-json/wp/v2';

export const wordpressAPI = axios.create({
  baseURL: WORDPRESS_API_URL,
});

// Buscar página pelo slug
export const getPageBySlug = async (slug: string): Promise<WPPage> => {
  try {
    const response = await wordpressAPI.get<WPPage[]>('/pages', {
      params: {
        slug,
        _embed: true,
      },
    });

    if (response.data.length === 0) {
      throw new Error(`Página com slug "${slug}" não encontrada`);
    }

    return response.data[0];
  } catch (error) {
    console.error('Erro ao buscar página:', error);
    throw error;
  }
};

// Buscar todas as páginas (opcional)
export const getPages = async (): Promise<WPPage[]> => {
  const response = await wordpressAPI.get<WPPage[]>('/pages');
  return response.data;
};
