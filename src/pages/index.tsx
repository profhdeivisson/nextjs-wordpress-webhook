import { getPageBySlug } from '@/lib/wordpress-api';
import { WPPage } from '@/types/wordpress';
import { GetStaticProps } from 'next';
import Image from 'next/image';

interface HomeProps {
  page: WPPage | null;
  error: string | null;
}

export default function Home({ page, error }: HomeProps) {
  if (error) return <div>Erro: {error}</div>;
  if (!page) return <div>Página não encontrada</div>;

  return (
    <main>
      <h1>{page.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />

      {/* Featured Image com next/image */}
      {page._embedded && page._embedded['wp:featuredmedia'] && (
        <Image
          src={page._embedded['wp:featuredmedia'][0].source_url}
          alt={page.title.rendered}
          width={800}
          height={400}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
    </main>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const page = await getPageBySlug('home');

    return {
      props: {
        page,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        page: null,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      },
    };
  }
};
