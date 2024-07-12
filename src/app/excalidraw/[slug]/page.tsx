import CenterContainer from '../../ui/components/other/CenterContainer';

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <CenterContainer>
      {params.slug}
    </CenterContainer>
  );
};