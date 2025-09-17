// components/HomePage.tsx
import { WPPage } from '@/types/wordpress';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface HomePageProps {
  initialPage?: WPPage;
}

export default function HomePage({ initialPage }: HomePageProps) {
  const [page, setPage] = useState<WPPage | null>(initialPage || null);
  const [loading, setLoading] = useState(!initialPage);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialPage) return;

    const fetchHomePage = async () => {
      try {
        const response = await fetch('/api/wordpress/page/home');

        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }

        const homePage: WPPage = await response.json();
        setPage(homePage);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchHomePage();
  }, [initialPage]);

  if (loading) return <div className="loading">Carregando página Home...</div>;
  if (error) return <div className="error">Erro: {error}</div>;
  if (!page) return <div>Página não encontrada</div>;

  return (
    <div className="home-page">
      <h1>{page.title.rendered}</h1>

      <div
        className="page-content"
        dangerouslySetInnerHTML={{ __html: page.content.rendered }}
      />

      {page._embedded && page._embedded['wp:featuredmedia'] && (
        <div className="featured-image">
          <Image
            src={page._embedded['wp:featuredmedia'][0].source_url}
            alt={page.title.rendered}
            width={800}
            height={400}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )}

      <div className="page-meta">
        <p>
          Última atualização:{' '}
          {new Date(page.modified).toLocaleDateString('pt-BR')}
        </p>
      </div>
    </div>
  );
}
